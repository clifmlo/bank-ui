import { BankAccountService } from '../service/bankaccount.service';
import { BankAccount } from '../model/bank-ccount';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-bankAccount',
  templateUrl: './create-bankAccount.component.html',
  styleUrls: ['./create-bankAccount.component.css']
})
export class CreateBankAccountComponent implements OnInit {

  bankAccount: BankAccount = new BankAccount();
  submitted = false;

  constructor(private bankAccountService: BankAccountService) { }

  ngOnInit() {
  }

  newBankAccount(): void {
    this.submitted = false;
    this.bankAccount = new BankAccount();
  }

  save() {
    this.bankAccountService.createBankAccount(this.bankAccount)
      .subscribe(data => console.log(data), error => console.log(error));
    this.bankAccount = new BankAccount();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}