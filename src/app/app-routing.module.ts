import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { CreateBankAccountComponent } from './create-bank-account/create-bank-account.component';
import { DepositComponent } from './deposit/deposit.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { TransfersComponent } from './transfers/transfers.component';
import { MenuComponent } from './menu/menu.component';
import { PasswordComponent } from './password/password.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { RouteGaurdService } from './service/route-gaurd.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'logout', component: LoginComponent, canActivate:[AuthGaurdService]},
  { path: 'clients', component: ClientListComponent, canActivate:[AuthGaurdService, RouteGaurdService], data: {role: 'ADMIN'}},
  { path: 'client/add', component: CreateClientComponent, canActivate:[AuthGaurdService, RouteGaurdService], data: {role: 'ADMIN'}},
  { path: 'client/details/:id', component: ClientDetailsComponent, canActivate:[AuthGaurdService, RouteGaurdService], data: {role: 'ADMIN'}},
  { path: 'new-bank-account/:id', component: CreateBankAccountComponent, canActivate:[AuthGaurdService, RouteGaurdService], data: {role: 'ADMIN'}},
  { path: 'deposit/:account/:id', component: DepositComponent, canActivate:[AuthGaurdService, RouteGaurdService], data: {role: 'ADMIN'}},
  { path: 'accounts', component: AccountsComponent, canActivate:[AuthGaurdService, RouteGaurdService], data: {role: 'USER'}},
  { path: 'account-details/:account', component: AccountDetailsComponent, canActivate:[AuthGaurdService, RouteGaurdService], data: {role: 'USER'}},
  { path: 'transfer/:type', component: TransfersComponent, canActivate:[AuthGaurdService, RouteGaurdService], data: {role: 'USER'}},
  { path: 'password/change', component: PasswordComponent, canActivate:[AuthGaurdService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
