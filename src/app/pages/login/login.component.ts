import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

export interface ILogInFormValue {
  login: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private tokenService: TokenService, private router: Router) {}

  onSubmit() {
    this.tokenService.setToken(this.form.value as ILogInFormValue);
    this.router.navigate(['main']);
  }


}
