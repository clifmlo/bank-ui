import { ClientService } from '../service/client.service';
import { Client } from '../model/client';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  client: Client = new Client();
  submitted = false;
  submitError = false;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
  }

  newClient(): void {
    this.submitted = false;
    this.client = new Client();
  }

  save() {
    this.clientService.createClient(this.client).subscribe(
        data => {
            console.log(data),
            this.submitted = true            
        }, 
        error => {
            console.log(error),
            this.submitError = true;
        }
    );
    this.client = new Client();
  }

    onSubmit() { 
        this.submitError = false;         
        this.save();    
    }
}