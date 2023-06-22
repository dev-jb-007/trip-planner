import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take,map } from "rxjs";
import { UserService } from "../shared/user.service";
import { SignUpResponse } from "./models/signup.interface";
import { User } from "../shared/user.model";
@Injectable({providedIn:'root'})
export class AuthGaurd implements CanActivate{
  constructor(private userService:UserService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.AuthCheck().pipe(
      map((user:SignUpResponse) => {
        const isAuth = !!user;
        if (isAuth) {
          this.userService.user.next(new User(user.name,user.email,user.token));
          return true;
        }
        return this.router.createUrlTree(['/user/login']);
      })
    );
  }
}
