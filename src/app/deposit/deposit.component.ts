import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Deposit } from '../model/deposit';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
    id: number;
    account: string;
    deposit: Deposit = new Deposit();
    submitted = false;
    submitError = false;
    successMessage = false;
    confirm = false;
    showForm = true;
    submitButtonActive = false;

    constructor(private transactionService: TransactionService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.account = this.route.snapshot.params['account'];  
        this.id = this.route.snapshot.params['id'];  
    }

    submit(deposit: Deposit) {
       this.confirm = false;       
       deposit.accountNumber = this.account; 
       this.transactionService.deposit(deposit).subscribe(
            data => {
                this.submitted = true,
                this.showForm = false;
                this.successMessage = true;
            }, 
            error =>  this.submitError = true
       );    
    }
  
    closeSuccessMessage(){
        this.successMessage = false;
    }

    closeErrorMessage(){
        this.submitError = false;  
    }
    
    accountDetails(){
        this.router.navigate(['/client/details/' + this.id]);
    }
    
    confirmDetails() {
        this.confirm = true;
        this.showForm = false;
    }
    
    validateForms() {
        if (this.deposit.amount > 0 && this.deposit.reference != null && this.deposit.reference != '') { 
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
}
