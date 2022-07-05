import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { AlphabetFilterModule } from 'alphabet-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RosterListComponent } from './roster-list/roster-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { RosterProfileComponent } from './roster-profile/roster-profile.component';
import { RosterWindowComponent } from './roster-window/roster-window.component';
import { RosterSearchWindowComponent } from './roster-search-window/roster-search-window.component';
import { RosterOwnerComponent } from './roster-owner/roster-owner.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatMessageListComponent } from './chat-message-list/chat-message-list.component';
import { ChatMessageInputComponent } from './chat-message-input/chat-message-input.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { RosterContactComponent } from './roster-contact/roster-contact.component';
import { RosterNewChatComponent } from './roster-new-chat/roster-new-chat.component';
import { ChatMessageLinkComponent } from './chat-message-link/chat-message-link.component';
import { ChatMessageTextComponent } from './chat-message-text/chat-message-text.component';



import { LinksDirective } from '../Shared/directives/links.directive';

import { ChatService } from '../Shared/services/chat-service';
import { ChatListStateService } from '../Shared/services/chat-list-state.service';
import { AuthService } from '../Shared/services/auth.service';
import { CacheService } from '../Shared/services/cache.service';
import { ChatFiledropComponent } from './chat-filedrop/chat-filedrop.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    ChatComponent,
    RosterListComponent,
    ChatWindowComponent,
    RosterProfileComponent,
    RosterWindowComponent,
    RosterSearchWindowComponent,
    RosterOwnerComponent,
    ChatHeaderComponent,
    ChatMessageListComponent,
    ChatMessageInputComponent,
    ChatMessageComponent,
    RosterContactComponent,
    RosterNewChatComponent,
    ChatMessageLinkComponent,
    ChatMessageTextComponent,

    
    LinksDirective,

    
    ChatFiledropComponent
  ],



  imports: [
    CommonModule,
    CarouselModule,
    NgxEmojiPickerModule,
    PickerModule,
    AlphabetFilterModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    NgbModule,
    ChatRoutingModule
  ],
  exports:[
    LinksDirective
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }, ChatService, ChatListStateService
  ],
})
export class ChatModule { }
