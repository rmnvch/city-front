import { Injectable } from "@angular/core";
import { ILogInFormValue } from "../pages/login/login.component";

@Injectable({
  providedIn: 'root',
})

export class TokenService {
  public isLoggedIn = !!localStorage.getItem('tokenCity') || false ;

  setToken(value: ILogInFormValue) {
    const token = btoa(`${value.login?.toLowerCase().trim()}:${value.password?.toLowerCase().trim()}`)
    localStorage.setItem('tokenCity', token);
    console.log(token);
    this.isLoggedIn = true;
  }

  setInvalid() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }
}