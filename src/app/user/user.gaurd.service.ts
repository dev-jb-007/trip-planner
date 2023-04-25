import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { exhaustMap, Observable, take,map } from "rxjs";
import { UserService } from "./user.service";
@Injectable({providedIn:'root'})
export class AuthGaurd implements CanActivate{
  constructor(private userService:UserService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.user.pipe(
      take(1),
      map(user => {
        console.log(user);
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/user/login']);
      })
    );
  }
}
