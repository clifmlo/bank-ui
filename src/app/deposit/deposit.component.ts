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
  account: string;
  deposit: Deposit = new Deposit();
  submitted = false;
  
  constructor(private transactionService: TransactionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.account = this.route.snapshot.params['account'];  
  }
 
  onSubmit() {
     this.deposit.accountNumber = this.account; 
     this.transactionService.deposit(this.deposit).subscribe(data => console.log(data), error => console.log(error));    
  }
}
