import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule  } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../shared/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  constructor(private router: Router, private AuthService: AuthenticationService,
    private _snackBar: MatSnackBar){ }

  form: FormGroup = new FormGroup({
   EmailAdresss: new FormControl([''], Validators.required),
   password: new FormControl([''], Validators.required),
 });

 
 submit() {
  if (this.form.valid) {
    let user = new User();
    user.password = this.form.value.password;
    user.emailaddress = this.form.value.EmailAdresss;

    this.AuthService.RegisterUser(user).subscribe(result =>{
      console.log(result);
         
    });     
  }
 }

 openSnackBar() 
  {
    this._snackBar.open("message", "action");
  }

}
