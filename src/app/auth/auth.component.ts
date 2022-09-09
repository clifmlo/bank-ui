import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    welcomeMessage = '';

    constructor(private route: ActivatedRoute,
        private router: Router, private authService: AuthService) { }

    ngOnInit() {
      this.authService.executeAuthService().subscribe((res) => {
            this.welcomeMessage = res.content;
      });
    }
}