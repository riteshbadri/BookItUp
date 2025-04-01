// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {
//
//   set token(token: string) {
//     localStorage.setItem("token", token);
//   }
//
//   get token() {
//     return localStorage.getItem('token') as string;
//   }
//
//   // get token(): string {
//   //   const storedToken = localStorage.getItem("token");
//   //   console.log("Retrieved token from localStorage:", storedToken); // ✅ Log retrieved token
//   //   return storedToken || ""; // ✅ Prevent returning null
//   // }
//
// }

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    console.log("Storing token:", token);  // Debugging log
    localStorage.setItem("token", token);
  }

  get token(): string {
    const storedToken = localStorage.getItem("token");
    console.log("Retrieved token from localStorage:", storedToken); // Debugging log
    return storedToken ?? '';  // Return empty string if null
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  private isTokenValid() {
    const token = this.token;
    if(!token) {
      return false;
    }
    // decode token
    const jwtHelper = new JwtHelperService();
    //check expiry
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if(isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }
}
