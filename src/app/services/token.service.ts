import { Injectable } from "@angular/core";
import { ILogInFormValue } from "../pages/login/login.component";

@Injectable({
  providedIn: 'root',
})

export class TokenService {
  public isLoggedIn = false;

  setToken(value: ILogInFormValue) {
    const token = btoa(`${value.login?.toLowerCase()}:${value.password?.toLowerCase()}`)
    localStorage.setItem('token', JSON.stringify(token));
    this.isLoggedIn = true;
  }

  setInvalid() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }
}