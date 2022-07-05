import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { AuthRoutingModule } from './auth-routing.module';

import { QRCodeModule } from 'angularx-qrcode';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChatService } from '../Shared/services/chat-service';
import { MainServiceService } from '../Shared/services/main-service.service';
import { AuthService } from '../Shared/services/auth.service';
import { CacheService } from '../Shared/services/cache.service';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    QRCodeModule,
    FlexLayoutModule

  ],
   providers: [
    MainServiceService,
    AuthService,
    CacheService,ChatService
 ]
})
export class AuthModule { }
