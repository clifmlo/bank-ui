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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  { path: '', redirectTo: 'client', pathMatch: 'full' },
  { path: 'clients', component: ClientListComponent },
  { path: 'add', component: CreateClientComponent },
  { path: 'details/:id', component: ClientDetailsComponent },
  { path: 'new-bank-account/:id', component: CreateBankAccountComponent },
  { path: 'deposit/:account', component: DepositComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'account-details/:account', component: AccountDetailsComponent },
  { path: 'transfer/:type', component: TransfersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
