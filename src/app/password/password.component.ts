import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { PasswordService } from '../service/password.service';
import { LoginService } from '../service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordChange } from '../model/password-change';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
    passwordChange: PasswordChange = new PasswordChange();
    submitError = false;

    constructor(private passwordService: PasswordService, private loginService: LoginService, private router: Router) { }

    ngOnInit(): void {
        this.passwordChange.id = this.loginService.getLoggedInUser().id;
    }

    onSubmit() {
        this.passwordService.updatePassword(this.passwordChange).subscribe(
            data => {
                this.loginService.logout(),
                this.router.navigate(['/login'])
            },
            error => {
            console.log(error),
            this.submitError = true;
        }
        ); 
    }

}
