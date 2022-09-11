import { Account } from '../model/account';
import { Component, OnInit, Input } from '@angular/core';
import { BankAccountService } from '../service/bank-account.service';
import { AccountsComponent } from '../accounts/accounts.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountNumber: string;
  account: Account;
  
  constructor(private bankAccountService: BankAccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.account = new Account();
    this.accountNumber = this.route.snapshot.params['account'];    
    this.bankAccountService.getAccountDetails(this.accountNumber)
      .subscribe((data: Account) => {        
        this.account = data;
      }, error => console.log(error));
  } 
}