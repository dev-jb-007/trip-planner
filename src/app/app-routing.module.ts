import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AuthGaurd } from './user/user.gaurd.service';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path:'user',
    loadChildren:()=> import('./user/user.module').then(m=>m.UserModule)
  },
  {
    path:'home',
    canActivate:[AuthGaurd],
    component:TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
