import { NgModule } from '@angular/core';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports:[
    CommonModule
  ],
  declarations:[
    HeaderComponent
  ],
  exports:[
    HeaderComponent
  ],
  providers: [UserService]
})
export class SharedModule {}