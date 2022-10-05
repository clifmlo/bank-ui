import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle'; 
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bank-ui';
  
  constructor(private bnIdle: BnNgIdleService, private loginService: LoginService) {
 
  }
 
  ngOnInit(): void { 
    //session timeout/expire after 5minutes of being idle      
    this.bnIdle.startWatching(300).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
            console.log('session expired.');
            this.loginService.logout();
        }
    });
  }
}