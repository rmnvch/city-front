import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICitiesResponce, ICity } from "../pages/main/main.component";


export interface IQueryParams {
  page: number;
  size: number;
  search: string;
}


@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private http: HttpClient) {}

  getCities(params: IQueryParams): Observable<ICitiesResponce> {
    const options = { params: new HttpParams().set('page', params.page).set('size', params.size) };
    
    let observable$: Observable<ICitiesResponce>;

    observable$ = params.search ? 
      this.http.get<ICitiesResponce>(`http://localhost:8080/api/v1/cities/${params.search}`, options) :
      this.http.get<ICitiesResponce>(`http://localhost:8080/api/v1/cities`, options);
      
      return observable$;
  }

  editCity(city: ICity): Observable<any> {
    return this.http.put(`http://localhost:8080/api/v1/cities`, city);
  }

}