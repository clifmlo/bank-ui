import { Account } from '../model/account';
import { Transaction } from '../model/transaction';
import { Component, OnInit, Input } from '@angular/core';
import { BankAccountService } from '../service/bank-account.service';
import { TransactionService } from '../service/transaction.service';
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
    transactions: Transaction[];
  
    constructor(private bankAccountService: BankAccountService, private transactionService: TransactionService, 
    private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
      this.account = new Account();
      this.accountNumber = this.route.snapshot.params['account'];    
      this.getAccountDetails();
      this.getTransactions();
    }
  
    getAccountDetails() {
        this.bankAccountService.getAccountDetails(this.accountNumber)
        .subscribe((data: Account) => {        
          this.account = data;
        }, error => console.log(error));
    }
  
    getTransactions() {
        this.transactionService.getAccountTransactions(this.accountNumber)
        .subscribe((data: Transaction[]) => {            
          this.transactions = data;       
        }, error => console.log(error));
    } 
}