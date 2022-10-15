import { ClientService } from '../service/client.service';
import { Client } from '../model/client';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { GeneralValidator } from '../validation/general-validator';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
    client: Client = new Client();
    submitted = false;
    submitError = false;
    public frmSignup: FormGroup;

    constructor(private clientService: ClientService, private router: Router, private fb: FormBuilder) { 
      this.createForm();
    }

    ngOnInit() {
    }

    newClient(): void {
      this.submitted = false;
      this.client = new Client();
    }

    save() {
        this.clientService.createClient(this.client).subscribe(
            data => {
                this.submitted = true; 
                setTimeout(function(){
                    location.href= 'clients'; 
                },1000);   
                          
            }, 
            error => {
                console.log(error),
                this.submitError = true;
            }
        );
        this.client = new Client();
    }

    onSubmit() {   
        this.client.name = this.frmSignup.controls['name'].value;
        this.client.surname = this.frmSignup.controls['surname'].value;
        this.client.idNumber = this.frmSignup.controls['idNumber'].value;
        this.client.email = this.frmSignup.controls['email'].value;
        this.client.contactNumber = this.frmSignup.controls['contactNumber'].value; 
        this.save();    
    }

    createForm() {
        this.frmSignup = this.fb.group({
            name: ['', Validators.required ],
            surname: ['', Validators.required ],
            idNumber: ['', [Validators.required, Validators.pattern("[0-9]{13}")]],
            contactNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
            email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]           
        });
    }

    closeSuccessMessage(){
        this.submitted = false;
    }

    closeErrorMessage(){
        this.submitError = false;  
    }   
}