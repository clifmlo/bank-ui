import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorService } from './app.httpInterceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateClientComponent } from './create-client/create-client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientListComponent } from './client-list/client-list.component';
import { CreateBankAccountComponent } from './create-bank-account/create-bank-account.component';
import { DepositComponent } from './deposit/deposit.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { TransfersComponent } from './transfers/transfers.component';
import { PasswordComponent } from './password/password.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    CreateClientComponent,
    ClientDetailsComponent,
    ClientListComponent,
    CreateBankAccountComponent,
    DepositComponent,
    AccountsComponent,
    AccountDetailsComponent,
    TransfersComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }