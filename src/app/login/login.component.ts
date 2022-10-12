import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService) {   }

    ngOnInit() {
        if (this.loginService.isUserLoggedIn()){
            this.loginService.redirectUser();
        }
    }

    handleLogin() {
      this.loginService.authenticate(this.username, this.password).subscribe((user)=> {
          let authString = 'Basic ' + btoa(this.username + ':' + this.password);
          this.loginService.registerSuccessfulLogin(user, authString);
          var userAccount =  this.loginService.getLoggedInUser();
          var role = userAccount.roles[0].name;
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.loginService.redirectUser();                    
      }, () => {
        this.invalidLogin = true;
        this.loginSuccess = false;
      });      
    }
}