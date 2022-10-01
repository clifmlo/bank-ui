import { Observable } from "rxjs";
import { ClientService } from "../service/client.service";
import { Client } from "../model/client";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.css"]
})
export class ClientListComponent implements OnInit {
    clients: Observable<Client[]>;
    deleteSuccess = false;
    closeResult: string;
    clientName: string; 
    submitError = false;

    constructor(private clientService: ClientService, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
      this.reloadData();
    }

    reloadData() {
      this.clients = this.clientService.getClientsList();
    }

    deleteClient(id: number) {
        this.clientService.deleteClient(id)
            .subscribe(
                data => {
                    this.deleteSuccess = true;
                    setTimeout(function(){
                        window.location.reload();
                    },1000);           
                },
                error => {
                    console.log(error)
                    this.submitError = true;
                }
            );
    }
  
    clientDetails(id: number){
      this.router.navigate(['client/details', id]);
    }
  
   open(content, id, name) {  
        this.clientName = name;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
          this.closeResult = `Closed with: ${result}`;  
          if (result === 'yes') {  
              this.deleteClient(id);
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
  
    closeErrorMessage(){
        this.submitError = false;
    }
}