import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QueryParams } from "../interfaces/query-params.interface";
import { CitiesResponce, City } from "../interfaces/city.interface";

@Injectable({
  providedIn: 'root',
})

export class CityService {
  constructor(private http: HttpClient) {}

  getCities(params: QueryParams): Observable<CitiesResponce> {
    const options = { params: new HttpParams().set('page', params.page).set('size', params.size) };
    
    let observable$: Observable<CitiesResponce>;

    observable$ = params.search ? this.http.get<CitiesResponce>(`api/v1/cities/${params.search}`, options) 
                                : this.http.get<CitiesResponce>(`api/v1/cities`, options);
      
    return observable$;
  }

  editCity(city: City): Observable<any> {
    return this.http.put(`api/v1/cities`, city);
  }

}