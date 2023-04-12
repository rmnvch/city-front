import { Component, OnDestroy, OnInit } from '@angular/core';
import data from '../../city.json';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription, concatMap, map, tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

const mockData: ICitiesResponce = {
  content: [...data],
  pageable: {
    pageNumber: 0,
    pageSize: 0,
    totalElements: 9,
    totalPages: 1,
  }
}

export interface ICity {
  "id": number;
  "name": string;
  "photo": string;
} 

export interface IPageInfo {
  "pageNumber": number;
  "pageSize": number;
  "totalElements": number;
  "totalPages": number;
}

export interface ICitiesResponce{
  "content": ICity[];
  "pageable": IPageInfo;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public cityList!: ICity[];
  public pageInfo!: IPageInfo;
  public querySubscription!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.querySubscription = this.route.queryParamMap
    .pipe(
      tap(() => console.log("rrr")),
      map((data) => {
        return {
          'page': Number(data?.get('page')) || 0,
          'text': data?.get('text') || '',
          'size': Number(data?.get('size')) || 9,
        };
      }),
      tap(({ page, text, size}) => {
        this.router.navigate([], { queryParams: { page, text, size } });
      }),
      concatMap(params => this.apiService.getCities(params)),
    )
    .subscribe({
      next: (data) => {
        this.cityList = data.content;
        this.pageInfo = data.pageable;
        console.log('next')
      }, 
      error: () => {
        this.cityList = mockData.content;
        this.pageInfo = mockData.pageable;
        console.log('error')
      }
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  onSearchClick(searchString: string): void {
    this.router.navigate([], { queryParams: {'search': searchString}, queryParamsHandling: 'merge'});
  }

  handlePageEvent(data: any): void {
    console.log(data);
  }
 }
