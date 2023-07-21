import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule  } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../shared/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  constructor(private router: Router, private AuthService: AuthenticationService, 
    private _snackBar: MatSnackBar){ }

   form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
 
  
  submit() {
    if (this.form.valid) {

      let user = new User();
      user.password = this.form.value.password;
      user.emailaddress = this.form.value.username;

      this.AuthService.LoginUser(user).subscribe(result =>{
        console.log(result);
        if(result.Status == "Success"){
          
        }
        else if (result.Status == "Error"){
          this.openSnackBar()
        }    
      });                  
    }
  }
  openSnackBar() 
  {
    this._snackBar.open("Login Failed!", "Close");
  }
}

