import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loading=false;
  form:FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean=false;
    constructor(private userService:UserService,private snackBar:MatSnackBar,private socialAuthService: SocialAuthService,private router: Router){
  
    }
    ngOnInit(): void {
      this.formInit();
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
        console.log(this.socialUser);
      });
    }
    formInit(){
      this.form=new FormGroup({
        'email':new FormControl('',[Validators.email,Validators.required]),
        'password': new FormControl('',[Validators.required])
      })
    }
    logIn(){
      this.loading=true;
      this.userService.login(this.form.get('email').value,this.form.get('password').value).subscribe(
        data=>{
          this.loading=false;
          console.log(data);
        },
        err=>{
          this.snackBar.open(err.error.error,'Okay',{
            duration:5000
          })
          this.loading=false;
        }
      )
    }
    loginWithGoogle(): void {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    logOut(): void {
      this.socialAuthService.signOut();
    }
}
