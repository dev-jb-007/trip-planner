import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { take,map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    user:User
    constructor(private userService:UserService){}
    ngOnInit(): void {
      this.userService.user.subscribe(
        (user)=>{
          this.user=user;
          console.log(user);
        }
      )
    }
}
