import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from "rxjs";
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Assignment3_Angular';

  @ViewChild('sidenav', {static:false}) sidenav!: MatSidenav;
  constructor(public AuthService:AuthenticationService,private router:Router){}
  
  logout()
  {
    this.AuthService.islogged = false;
    this.router.navigateByUrl("/login");
  }
  
  islogged: boolean = false 

}
