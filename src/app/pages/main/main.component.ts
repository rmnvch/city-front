import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription, concatMap, finalize, map, tap } from 'rxjs';
import { CityService } from 'src/app/services/city.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { City } from 'src/app/interfaces/city.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public isEditModalOpen = false;
  public cityToEdit!: City; 
  public cityList: City[] = [];
  public pageInfo = {
    "pageNumber": 0,
    "pageSize": 0,
    "totalElements": 0,
    "totalPages": 0,
  };
  public querySubscription!: Subscription;

  public editForm = this.fb.group({
    name: ['', Validators.required],
    photo: ['', Validators.required],
  })

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private cityService: CityService, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.querySubscription = this.route.queryParamMap
    .pipe(
      tap(() => {
        this.isLoading = true;
      }),
      map((param) => {
        return {
          'page': Number(param?.get('page')) || 0,
          'search': param?.get('search') || '',
          'size': Number(param?.get('size')) || 9,
        };
      }),
      tap(({ page, search, size}) => {
        this.router.navigate([], { queryParams: { page, search, size } });
      }),
      concatMap(params => this.cityService.getCities(params)),
    )
    .subscribe({
      next: (data) => {
        this.isLoading = false;
        this.cityList = data.content;
        this.pageInfo = data.pageable;
      }, 
      error: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  onSearchClick(searchString: string): void {
    this.router.navigate([], { queryParams: {'search': searchString}});
  }

  handlePageEvent(data: PageEvent): void {
    this.router.navigate([], { queryParams: {'page': data.pageIndex}, queryParamsHandling: 'merge'});
  }

  handleEditClick(card: City): void {
    this.cityToEdit = card;
    this.isEditModalOpen = true;
    this.editForm.setValue({name: card.name, photo: card.photo});
    this.editForm.markAsPristine();
  }

  onSubmit() {

    const cityToUpdate = {
      name: this.editForm.value.name!,
      photo: this.editForm.value.photo!,
      id: this.cityToEdit.id,
    }

    this.isLoading = true;

    this.cityService.editCity(cityToUpdate)
      .subscribe((data) => {
        this.isLoading = false;
        this.isEditModalOpen = false;
        this.router.navigate([], { queryParams: {event: 'success'}, queryParamsHandling: 'merge'})
      });
  }
}
