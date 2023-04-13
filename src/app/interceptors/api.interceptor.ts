import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DEV_URL } from "../configs/api.config";


@Injectable({
  providedIn: 'root',
})

export class ApiInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const url = `${DEV_URL}${request.url}`;

    request = request.clone({ url });

    return next.handle(request);
  }
}