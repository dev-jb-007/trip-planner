import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable,catchError,tap } from "rxjs";
import { User } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environment/environment.prod";
import { CookieService } from "ngx-cookie-service";
import { SignUpResponse } from "../user/models/signup.interface";
@Injectable()
export class UserService{
    user:BehaviorSubject<User>=new BehaviorSubject<User>(null);
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
        if(!token) return;
        this.http.get<SignUpResponse>(
            environment.server+"/user/autoLogin",
            {
                headers:new HttpHeaders().set('authentication',token).set('type',localStorage.getItem('type'))
            }
        )
        .subscribe(
            {
                next:(data)=>{
                    if(data.error){
                        this.user.next(null);
                        return;
                    }
                    let user=new User(data.name,data.email,data.token);
                    this.user.next(user);
                    // console.log(user);
                },
                error:(err)=>{
                    // console.log(err);
                }
            }
        )
    }
    AuthCheck(){
        let token=localStorage.getItem('token');
        if(!token)
        { 
            return new Observable(observer=>{
                 observer.next(null);
            })
        }
        return this.http.get<SignUpResponse>(
            environment.server+"/user/autoLogin",
            {
                headers:new HttpHeaders().set('authentication',token).set('type',localStorage.getItem('type'))
            }
        ).pipe(catchError((err:any)=>{
            return null;
        }));
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
    logOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('type');
        this.user.next(null);
    }
}
