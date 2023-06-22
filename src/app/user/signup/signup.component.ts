import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  loading:boolean=false;
  constructor(private snackBar:MatSnackBar,private userService:UserService){}
  signUp(){
    this.loading=true;
    this.userService.SignUp(this.form.get('email').value,this.form.get('password').value,this.form.get('name').value).subscribe(
      data=>{
        this.loading=false;
        this.snackBar.open("Please check your email for verification link",'okay',{
          duration:5000
        });
      },
      err=>{
        this.loading=false;
        this.snackBar.open(err.error.error,'okay',{
          duration:5000
        });
      }
    )
  }
  form:FormGroup;

  ngOnInit(): void {
    this.formInit();
  }
  formInit(){
    this.form=new FormGroup({
      'email':new FormControl('',[Validators.email,Validators.required]),
      'name':new FormControl('',[Validators.required]),
      'password': new FormControl('',[Validators.required])
    })
  }
}
