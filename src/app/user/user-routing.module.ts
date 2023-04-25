import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user.component';
import { SignupComponent } from './signup/signup.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
const routes: Routes = [
    {
        path:'',
        component:UserComponent,
        children:[
            {path:"login",component:LoginComponent},
            {path:"signup",component:SignupComponent},
            {path:"verification",component:EmailVerificationComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
