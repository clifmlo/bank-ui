import { Observable } from "rxjs";
import { BankAccountService } from "../service/bank-account.service";
import { Account } from "../model/account";
import { Transfer } from "../model/transfer";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {
   authUserId = 1; //TODO get from session
   accounts: Observable<Account[]>;
   submitted = false;
   transfer: Transfer = new Transfer();
   
    constructor(private accountService: BankAccountService,
    private router: Router) {}

    ngOnInit(): void {
        this.accounts = this.accountService.getAccountsList(this.authUserId);
    }

    onSubmit(){
    }
}
