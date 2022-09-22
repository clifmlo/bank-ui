import { Observable } from "rxjs";
import { BankAccountService } from "../service/bank-account.service";
import { Account } from "../model/account";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: "app-account-list",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.css"]
})
export class AccountsComponent implements OnInit {
    accounts: Observable<Account[]>;
    authUserId: number;

    constructor(private accountService: BankAccountService, private loginService: LoginService, private router: Router) {
    }

    ngOnInit() {
        this.authUserId = this.loginService.getLoggedInUser().id;
        this.accounts = this.accountService.getAccountsList(this.authUserId);
    }

    accountDetails(accountNumber: string){
      this.router.navigate(['account-details', accountNumber]);
    }

    transferOther() {
      this.router.navigate(['transfer/external']);
    }

    transferOwn() {
      this.router.navigate(['transfer/own']);
    }
}