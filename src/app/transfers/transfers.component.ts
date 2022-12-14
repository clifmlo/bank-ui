import { Observable } from "rxjs";
import { BankAccountService } from "../service/bank-account.service";
import { TransactionService } from "../service/transaction.service";
import { Account } from "../model/account";
import { Transfer } from "../model/transfer";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {   
   transferType: string;
   ownTransfere = false;
   accounts: Observable<Account[]>;
   authUserId: number;
   submitted = false;
   submitError = false;
   successMessage = false;
   errorMessage: string;
   accountSelectionError = false;
   submitButtonActive = false;
   amountEntered = false;
   confirm = false;
   showForm = true;
   transfer: Transfer = new Transfer();
   
    constructor(private accountService: BankAccountService, private transactionService: TransactionService, private loginService: LoginService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(){
        this.authUserId = this.loginService.getLoggedInUser().id;
        this.transferType = this.route.snapshot.params['type']; 
        this.accounts = this.accountService.getAccountsList(this.authUserId);        
    }

    submit(transfer: Transfer){ 
        this.confirm = false;       
        this.transactionService.transfer(transfer).subscribe(
            data => {
                this.submitted = true, 
                this.successMessage = true
            },
            error => {
                if (error.error.message.includes("Account is inactive") || error.error.message.includes("Insufficient")) {
                    this.errorMessage = error.error.message;
                }
                this.submitError = true,                
                console.log(error)                
            }
        );    
    }
    
    reload() {
        this.router.navigate(['/accounts']);
    }
    
    closeSuccessMessage(){
        this.successMessage = false;
    }

    closeErrorMessage(){
        this.submitError = false;  
    }
    
    validateForms() {
        if (this.transfer.creditAccount === this.transfer.debitAccount){
            this.accountSelectionError = true;
            this.submitButtonActive = false;
        } if (this.transfer.creditAccount != null && this.transfer.debitAccount != null && (this.transfer.creditAccount != this.transfer.debitAccount)) {            
            this.accountSelectionError = false;
        } if (this.transfer.transactionAmount > 0 && this.transfer.reference != null && this.transfer.reference != '' && this.transfer.creditAccount != null && this.transfer.debitAccount != null && (this.transfer.creditAccount != this.transfer.debitAccount)) {
            this.submitButtonActive = true; 
        } else {
            this.submitButtonActive = false; 
        }
    }
    
    backToInputForm(){
        this.resetValues();
    }
    
    resetValues() {
        this.submitted = false;
        this.submitError = false;
        this.successMessage = false;
        this.confirm = false;
        this.showForm = true;        
    }
    
    confirmDetails() {
        this.confirm = true;
        this.showForm = false; 
    }
}
