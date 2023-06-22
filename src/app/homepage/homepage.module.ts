import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomePageComponent } from "./homepage.component";
import { HomePageRoutingModule } from "./homepage-routing.module";
import { SharedModule } from "../shared/shared.module";
import { HeaderComponent } from "../shared/header/header.component";

@NgModule({
    declarations:[
      HomePageComponent
    ],
    imports:[
        CommonModule,
        HomePageRoutingModule,
        SharedModule
    ],
    exports:[
      HomePageComponent
    ],
    providers:[
    ]
})
export class HomePageModule{
  constructor(){
    console.log("Home Page Module");
  }
}