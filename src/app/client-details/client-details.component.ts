import { Client } from '../model/client';
import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../service/client.service';
import { ClientListComponent } from '../client-list/client-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: number;
  client: Client;
  accounts: any;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.client = new Client();
    this.id = this.route.snapshot.params['id'];    
    this.clientService.getClient(this.id)
      .subscribe((data: Client) => {
        console.log(data.bankAccounts)
        this.client = data;
        this.accounts = data.bankAccounts;
      }, error => console.log(error));
  }


    list(){
        this.router.navigate(['clients']);
    }


    newBankAccount(){
      this.router.navigate(['new-bank-account/', this.id]);
    }
    
    deposit(accountNumber: string){
       this.router.navigate(['deposit/', accountNumber]);
    }
  
}