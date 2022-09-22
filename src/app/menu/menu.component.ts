import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedIn = false;
  loggedInName : string;
  loggedInRole: string;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);
    this.loggedInName =  this.loginService.getLoggedInUser().name;
    this.loggedInRole =  this.loginService.getLoggedInUser().roles[0].name;
  }

  handleLogout() {
    this.loginService.logout();
  }
  
  home() {
    this.loginService.redirectUser();
  }
}