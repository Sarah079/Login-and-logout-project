import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';
import { User } from '../shared/user';
import { Responses } from '../shared/responses';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl = 'http://localhost:5240/api/'
  islogged: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

 

  RegisterUser(user: User){
    return this.httpClient.post<Responses>(`${this.apiUrl}Authentication/Register`, user).pipe(tap(result =>{
      //result.Status == "Success";
      //this.islogged = true;
      this.router.navigateByUrl('/login');
    }))
  }

  LoginUser(user: User){
    return this.httpClient.post<Responses>(`${this.apiUrl}Authentication/Login`, user).pipe(tap(result =>{
      result.Status == "Success";
      this.islogged = true;
      this.router.navigateByUrl('/products');
    }))
  }

  
}
