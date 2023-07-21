
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Products } from '../shared/product';
import { Responses } from '../shared/responses';
import { Brands } from '../shared/brands';
import { ProductTypes } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  apiUrl = 'http://localhost:5240/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }


  GetProducts(): Observable<any>{ 
    return this.httpClient.get<Products[]>(`${this.apiUrl}Store/GetProducts`)
  }

  //add
  AddProduct(product:Products){
    return this.httpClient.post<Responses>(`${this.apiUrl}Store/AddProduct`, product, this.httpOptions)
  }

  //brands
  public getBrands()
  {
    return this.httpClient.get<Brands[]>(`${this.apiUrl}Store/GetBrands`);
  }
  //
  public getTypes()
  {
    return this.httpClient.get<ProductTypes[]>(`${this.apiUrl}Store/GetProductTypes`);
  }
}
