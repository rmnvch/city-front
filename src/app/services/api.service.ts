import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICitiesResponce } from "../pages/main/main.component";


export interface IQueryParams {
  page: number;
  size: number;
  text: string;
}


@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private http: HttpClient) {}

  getCities(params: IQueryParams): Observable<ICitiesResponce> {
    const options = { params: new HttpParams().set('page', params.page).set('size', params.size) };
     
    return params.text ? 
      this.http.get<ICitiesResponce>(`http://localhost:8080/api/v1/cities/${params.text}`, options) :
      this.http.get<ICitiesResponce>(`http://localhost:8080/api/v1/cities`, options);
  }
}