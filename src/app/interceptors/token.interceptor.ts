import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable({
  providedIn: 'root',
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.stringify(localStorage.getItem('token'));
    if (token) {
      request = request.clone({
        setHeaders: { 
          Authorization: `Basic ${token}`,
          'Access-Control-Allow-Origin': '*'
        },
        
      });
    }

    return next.handle(request)
      .pipe(
        catchError((err: unknown) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.tokenService.setInvalid();
          }
          return throwError(() => new Error());
        })
      )
  }
}