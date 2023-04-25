import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SignupComponent } from './signup/signup.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import{ MatDialogModule } from '@angular/material/dialog';
import { EmailVerificationComponent } from './email-verification/email-verification.component';  
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    SignupComponent,
    EmailVerificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    SocialLoginModule
  ],
  exports:[
    LoginComponent,
    UserComponent
  ],
  providers:[{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('763885809251-p2iru0nrpe5nj6e5gikbmugni649gv0k.apps.googleusercontent.com') // your client id
        }
      ]
    }
  }]
})
export class UserModule { }
