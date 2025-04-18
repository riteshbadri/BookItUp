import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from './services/services/authentication.service';
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import {CodeInputModule} from "angular-code-input";
import {httpTokenInterceptor} from './services/interceptor/http-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CodeInputModule
    ],
  providers: [
    provideHttpClient(withInterceptors([httpTokenInterceptor])),
    HttpClient
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpTokenInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
