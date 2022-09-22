import { Observable } from "rxjs";
import { ClientService } from "../service/client.service";
import { Client } from "../model/client";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.css"]
})
export class ClientListComponent implements OnInit {
  clients: Observable<Client[]>;
  deleteSuccess = false;

  constructor(private clientService: ClientService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.clients = this.clientService.getClientsList();
  }

  deleteClient(id: number) {
    if(confirm("Are you sure to delete this user?")) {
        
        this.clientService.deleteClient(id)
        .subscribe(
        data => {
           this.deleteSuccess = true;
            setTimeout(function(){
                window.location.reload();
            },1000);           
        },
        error => console.log(error));
    }
  }
  
  clientDetails(id: number){
    this.router.navigate(['client/details', id]);
  }
}