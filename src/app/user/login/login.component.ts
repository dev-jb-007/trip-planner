import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { take } from 'rxjs';
declare var google: { accounts: { id: { renderButton: (arg0: any, arg1: { type: string; size: string; text: string; theme: string; }) => void; }; }; };
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loading=false;
  form:FormGroup;
  socialUser!: SocialUser;
  @ViewChild('googleButton') el:ElementRef;
  isLoggedin?: boolean=false;
showGoogleLogin: boolean=false;
    constructor(private userService:UserService,private snackBar:MatSnackBar,private socialAuthService: SocialAuthService,private router: Router){
  
    }
    ngOnInit(): void {
      this.formInit();
      this.socialAuthService.initState.pipe(take(1)).subscribe(()=>{
        google.accounts.id.renderButton(this.el.nativeElement, {
          type: 'standard',
          size: 'medium',
          text: 'signin_with',
          theme: 'filled_blue'
      });
      });
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = user != null;
        this.userService.googleAuth(user.idToken).subscribe(
          data=>{
            console.log(data);
          },
          err=>{
            this.snackBar.open(err,'Okay',{
              'duration':5000,
            })
          }
        )
        console.log(this.socialUser);
      });
      
    }
    showGoogleLoginButton(){
     
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
    logOut(): void {
      this.socialAuthService.signOut();
    }
}
