import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGaurdService implements CanActivate {

  constructor(private router: Router,
    private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isAuthorised(route))
          return true;

          return false;
    }
    
    isAuthorised(route: ActivatedRouteSnapshot): boolean {
        const role = route.data['role'];
        return (role === this.loginService.getLoggedInRole())? true : false;
    }

}