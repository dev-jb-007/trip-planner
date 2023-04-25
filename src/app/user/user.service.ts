import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject,tap } from "rxjs";
import { User } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environment/environment.prod";
import { CookieService } from "ngx-cookie-service";

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
            this.user.next(user);
        }))
    }
    AutoLogin(){
        let token=localStorage.getItem('token');
        if(!token) return;
        this.http.get<SignUpResponse>(
            environment.server+"/user/autoLogin",
            {
                headers:new HttpHeaders().set('authentication',token)
            }
        ).subscribe(
            data=>{
                let user=new User(data.name,data.email,data.token);
                this.user.next(user);
            },
            err=>{
                console.log(err);
            }
        )
    }
}

function resData(value: Object): void {
    throw new Error("Function not implemented.");
}
