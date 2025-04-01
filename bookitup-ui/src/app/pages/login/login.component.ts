import {Component} from '@angular/core';
import {AuthenticationRequest} from '../../services/models/authentication-request';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {TokenService} from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email: "", password: ""};
  errorMsg: Array<String> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  // login() {
  //   this.errorMsg = [];
  //   this.authService.authenticate({
  //     body: this.authRequest
  //   }).subscribe({
  //     next: (res) => {
  //       console.log("Full response from backend:", res);
  //       console.log("Login successful. Token received:", res.token);
  //       this.tokenService.token = res.token as string;
  //       console.log("Stored token:", this.tokenService.token);
  //       this.router.navigate(['books']);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.errorMsg.push("Login and/or password is incorrect!");
  //     }
  //   });
  // }
  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        console.log("Full response from backend:", res);

        // Handle the Blob response
        if (res instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const jsonResponse = JSON.parse(reader.result as string);
              console.log("Parsed JSON response:", jsonResponse);

              if (jsonResponse && jsonResponse.token) {
                this.tokenService.token = jsonResponse.token;
                console.log("Stored token:", this.tokenService.token);
                this.router.navigate(['books']);
              } else {
                console.error("Parsed response does not contain token:", jsonResponse);
                this.errorMsg.push("Authentication response missing token");
              }
            } catch (e) {
              console.error("Error parsing JSON response:", e);
              this.errorMsg.push("Error processing authentication response");
            }
          };
          reader.readAsText(res);
        } else if (res && res.token) {
          // Handle regular JSON response
          this.tokenService.token = res.token;
          console.log("Stored token:", this.tokenService.token);
          this.router.navigate(['books']);
        } else {
          console.error("Response does not contain token:", res);
          this.errorMsg.push("Authentication response missing token");
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMsg.push("Login and/or password is incorrect!");
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
