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
   transfer: Transfer = new Transfer();
   
    constructor(private accountService: BankAccountService, private transactionService: TransactionService, private loginService: LoginService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(){
        this.authUserId = this.loginService.getLoggedInUser().id;
        this.transferType = this.route.snapshot.params['type']; 
        this.accounts = this.accountService.getAccountsList(this.authUserId);        
    }

    onSubmit(){        
        this.transactionService.transfer(this.transfer).subscribe(
            data => {
                this.submitted = true, 
                this.successMessage = true
            },
            error => {
                if (error.error.message.includes("Credit account is inactive") || error.error.message.includes("Insufficient")) {
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
    
    filterAccounts() {
        if (this.transfer.creditAccount === this.transfer.debitAccount){
            this.accountSelectionError = true;
            this.submitButtonActive = false;
        } else if (this.transfer.creditAccount != null && this.transfer.debitAccount != null && (this.transfer.creditAccount != this.transfer.debitAccount)) {
            this.submitButtonActive = true;
            this.accountSelectionError = false;
        }
    }
}
