export interface City {
  id: number;
  name: string;
  photo: string;
} 

export interface PageInfo {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface CitiesResponce{
  content: City[];
  pageable: PageInfo;
}