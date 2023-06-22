import { Component } from "@angular/core";
import { UserService } from "../shared/user.service";

@Component({
    selector:"home-page",
    templateUrl:'./homepage.component.html',
    styleUrls:['./homepage.component.css']
})
export class HomePageComponent{
    constructor(private userService:UserService){}
}