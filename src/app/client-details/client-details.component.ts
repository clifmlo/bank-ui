import { Client } from '../model/client';
import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../service/client.service';
import { BankAccountService } from '../service/bank-account.service';
import { ClientListComponent } from '../client-list/client-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
    id: number;
    client: Client;
    accounts: any;
    deleteSuccess = false;
    deleteError = false;
    accountNumber: string;
    closeResult: string;

    constructor(private clientService: ClientService, private bankAccountService: BankAccountService,private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

    ngOnInit() {
    this.client = new Client();
    this.id = this.route.snapshot.params['id'];    
    this.clientService.getClient(this.id)
      .subscribe((data: Client) => {
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
    
    deposit(accountNumber: string, id: number){
        this.router.navigate(['deposit/', accountNumber, id]);
    }
    
    deleteAccount(id: number) {
        this.bankAccountService.deleteAccount(id).subscribe(
            (response) => {
                this.deleteSuccess = true; 
                setTimeout(function(){
                    window.location.reload();
                },1000);         
            }, 
            error => {
                this.deleteError = true;
                console.log(error)
            }
        );
    }
    
    open(content, id, accountNumber) {  
        this.accountNumber = accountNumber;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
          this.closeResult = `Closed with: ${result}`;  
          if (result === 'yes') {  
              this.deleteAccount(id);
          }  
        }, (reason) => {  
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
        });  
    }  
  
    private getDismissReason(reason: any): string {  
        if (reason === ModalDismissReasons.ESC) {  
          return 'by pressing ESC';  
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
          return 'by clicking on a backdrop';  
        } else {  
          return `with: ${reason}`;  
        } 
    }
    
    closeSuccessMessage(){
        this.deleteSuccess = false;
    }

    closeErrorMessage(){
        this.deleteError = false;  
    }
}