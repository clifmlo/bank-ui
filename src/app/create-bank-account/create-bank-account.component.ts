import { BankAccountService } from '../service/bank-account.service';
import { CreateBankAccount } from '../model/create-bank-account';
import { Deposit } from '../model/deposit';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-bank-account',
  templateUrl: './create-bank-account.component.html',
  styleUrls: ['./create-bank-account.component.css']
})
export class CreateBankAccountComponent implements OnInit {
  id: number;
  bankAccount: CreateBankAccount = new CreateBankAccount();
  deposit: Deposit = new Deposit();
  submitted = false;
  submitError = false;

  constructor(private bankAccountService: BankAccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];  
    this.route = this.route.snapshot.params['id'];  
  }

  newBankAccount(): void {
    this.submitted = false;
    this.bankAccount = new CreateBankAccount();
  }

    save(id) {      
        this.bankAccountService.createBankAccount(this.bankAccount)
        .subscribe(
            data => {
                 console.log(this.id);                 
               this.submitted = true
               setTimeout(function(){
                    window.location.href="client/details/"+ id;
                },1000);
              
            }, 
            error => {
                console.log(error),
                this.submitError = true;
            }
        );
        this.bankAccount = new CreateBankAccount();
    }

    onSubmit() {  
      this.submitError = false;         
      this.setValues();
      this.save(this.bankAccount.userId);     
    }

    setValues() {
      this.bankAccount.userId = this.id; 
      this.bankAccount.deposit = this.deposit; 
    }
    
    accountDetails(){
        this.router.navigate(['/client/details/' + this.id]);
    }
    
    closeSuccessMessage(){
        this.submitted = false;
    }

    closeErrorMessage(){
        this.submitError = false;  
    }
}