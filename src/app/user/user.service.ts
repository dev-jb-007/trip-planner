import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject,tap } from "rxjs";
import { User } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environment/environment.prod";
import { CookieService } from "ngx-cookie-service";
import { HeaderComponent } from "../header/header.component";

//Interfaces
export interface SignUpResponse{
    email:string
    name:string
    token:string
    error:boolean
  }

@Injectable({providedIn:'root'})
export class UserService{
    user=new BehaviorSubject<User>(null);
    constructor(private http:HttpClient,private cookieService:CookieService){}
    login(email:string,password:string){
        return this.http.post<SignUpResponse>(
            environment.server+"/user/login",
            {
                email:email,
                password:password
            }
        ).pipe(tap(resData=>{
            let user=new User(resData.name,resData.email,resData.token)
            localStorage.setItem('token',resData.token);
            localStorage.setItem('type','normal');
            this.user.next(user);
        }))
    }
    SignUp(email:string,password:string,name:string){
        //send to database
        return this.http.post<SignUpResponse>(
            environment.server+"/user/signup",
            {
                name:name,
                email:email,
                password:password
            }
        ).pipe(tap(resData=>{
            let user=new User(resData.name,resData.email,resData.token)
            localStorage.setItem('token',resData.token);
            localStorage.setItem('type','normal');
            this.user.next(user);
        }))
    }
    AutoLogin(){
        let token=localStorage.getItem('token');
        console.log(token);
        console.log(localStorage.getItem('type'));
        if(!token) return;
        this.http.get<SignUpResponse>(
            environment.server+"/user/autoLogin",
            {
                headers:new HttpHeaders().set('authentication',token).set('type',localStorage.getItem('type'))
            }
        ).subscribe(
            data=>{
                let user=new User(data.name,data.email,data.token);
                console.log(user);
                this.user.next(user);
            },
            err=>{
                console.log(err);
            }
        )
    }
    googleAuth(token){
        return this.http.get<SignUpResponse>(
            environment.server+"/user/googleAuth",
            {
                headers: new HttpHeaders().set('authentication',token)
            }
        ).pipe(tap(resData=>{
            let user=new User(resData.name,resData.email,resData.token)
            localStorage.setItem('token',resData.token);
            localStorage.setItem('type','google');
            this.user.next(user);
        }))
    }
}

function resData(value: Object): void {
    throw new Error("Function not implemented.");
}
