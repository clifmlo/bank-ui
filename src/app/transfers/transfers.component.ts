import { Observable } from "rxjs";
import { BankAccountService } from "../service/bank-account.service";
import { TransactionService } from "../service/transaction.service";
import { Account } from "../model/account";
import { Transfer } from "../model/transfer";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {
   
   transferType: string;
   ownTransfere = false;
   accounts: Observable<Account[]>;
   authUserId = 1; //TODO fetch from session
   submitted = false;
   transfer: Transfer = new Transfer();
   
    constructor(private accountService: BankAccountService, private transactionService: TransactionService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(){
        this.transferType = this.route.snapshot.params['type']; 
        this.accounts = this.accountService.getAccountsList(this.authUserId);        
    }

    onSubmit(){
        this.submitted = true;
        this.transactionService.transfer(this.transfer).subscribe(data => console.log(data), error => console.log(error));    
    }
    
    reload() {
        this.router.navigate(['/accounts']);
    }
}
