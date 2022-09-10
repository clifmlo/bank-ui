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

  constructor(private bankAccountService: BankAccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];  
    this.route = this.route.snapshot.params['id'];  
  }

  newBankAccount(): void {
    this.submitted = false;
    this.bankAccount = new CreateBankAccount();
  }

  save() {
      console.log(this.bankAccount);
    this.bankAccountService.createBankAccount(this.bankAccount)
      .subscribe(data => console.log(data), error => console.log(error));
    this.bankAccount = new CreateBankAccount();
  }

  onSubmit() {
    this.submitted = true;
    this.setValues();
    this.save();
  }
  
  setValues() {
    this.bankAccount.userId = this.id; 
    this.bankAccount.deposit = this.deposit; 
  }
}