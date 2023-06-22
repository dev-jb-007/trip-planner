import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { HomePageComponent } from "./homepage.component";
const routes: Routes = [
    {
        path:'homepage',
        component:HomePageComponent
    }
];
@NgModule({
    
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class HomePageRoutingModule{

}