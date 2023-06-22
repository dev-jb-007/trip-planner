import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { SignupComponent } from './signup/signup.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import{ MatDialogModule } from '@angular/material/dialog';
import { EmailVerificationComponent } from './email-verification/email-verification.component';  
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { GoogleSigninButtDirective } from '../directives/google.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    SignupComponent,
    EmailVerificationComponent,
    GoogleSigninButtDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    SocialLoginModule,
    SharedModule
  ],
  exports:[
    LoginComponent,
    UserComponent
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '918468008115-54soefsa7a4vcv5os5vbsgmmjhjvlcl0.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
  ],
})
export class UserModule {
  constructor(){
    console.log("User Module");
  }
 }
