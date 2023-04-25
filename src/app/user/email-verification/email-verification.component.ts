import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit{
  token:string;
  constructor(private route:ActivatedRoute,private http:HttpClient,private router:Router,private snackBar:MatSnackBar){}
  ngOnInit(){
    this.route.queryParams.subscribe(params=>{
      this.token=params['token'];
    })
  }
  verify(){
    this.http.post(
      environment.server+'/user/verifyEmail',
      {token:this.token}
    ).subscribe(data=>{
      this.snackBar.open("Email verified successfully",'okay',{
        duration:5000
      })
    })
  }
}
