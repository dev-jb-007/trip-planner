import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { HomePageModule } from './homepage/homepage.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    HomePageModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    console.log("App Module");
  }
 }
