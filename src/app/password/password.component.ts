import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { PasswordService } from '../service/password.service';
import { LoginService } from '../service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordChange } from '../model/password-change';
import { PasswordValidator } from '../validation/password-validator';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
    passwordChange: PasswordChange = new PasswordChange();
    submitError = false;
    submitted = false;
    public frmSignup: FormGroup;

    constructor(private passwordService: PasswordService, private loginService: LoginService, private router: Router, private fb: FormBuilder) {
        this.frmSignup = this.createSignupForm();
    }

    ngOnInit(): void {
        this.passwordChange.id = this.loginService.getLoggedInUser().id;
    }

    onSubmit() {
        this.passwordChange.password = window.btoa(this.frmSignup.value.password);
        this.passwordChange.confirmPassword = window.btoa(this.frmSignup.value.confirmPassword);
        this.passwordService.updatePassword(this.passwordChange).subscribe(
            data => {
                this.submitted = true;
                this.loginService.logout();
                setTimeout(function(){
                    window.location.href ="/login";
                },1000);                 
            },
            error => {
            console.log(error),
            this.submitError = true;
        }
        ); 
    }
    
    createSignupForm(): FormGroup {
    return this.fb.group(
      {
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            PasswordValidator.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            PasswordValidator.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            PasswordValidator.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            PasswordValidator.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: PasswordValidator.passwordMatchValidator
      }
    );
  }

    closeSuccessMessage(){
        this.submitted = false;
    }

    closeErrorMessage(){
        this.submitError = false;  
    }

}

  
