import { Observable } from "rxjs";
import { BankAccountService } from "../service/bank-account.service";
import { Account } from "../model/account";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-account-list",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.css"]
})
export class AccountsComponent implements OnInit {
  accounts: Observable<Account[]>;
  authUserId = 1; //TODO fetch from session

  constructor(private accountService: BankAccountService,
    private router: Router) {}

  ngOnInit() {
    this.accounts = this.accountService.getAccountsList(this.authUserId);
  }
  
  accountDetails(accountNumber: string){
    this.router.navigate(['account-details', accountNumber]);
  }
  
  transferOther() {
    this.router.navigate(['transfer/other']);
  }
  
  transferOwn() {
    this.router.navigate(['transfer/own']);
  }
}