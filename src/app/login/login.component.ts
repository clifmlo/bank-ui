import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

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
    private authenticationService: AuthService) {   }

  ngOnInit() {
  }

  handleLogin() {
    this.authenticationService.authenticate(this.username, this.password).subscribe((user)=> {
      this.authenticationService.registerSuccessfulLogin(user);
      var role = this.authenticationService.getLoggedInUser().roles[0].name;
      console.log(role);
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      
      if (role === "ADMIN") {
        this.router.navigate(['/clients']);
      } else if (role === "USER") {
        this.router.navigate(['/accounts']);
      } else {
        this.router.navigate(['/login']);
      }
      
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }
}