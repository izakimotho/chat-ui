import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';


import { Contact } from './../../Shared/interface/contact';
import { Message, Direction } from './../../Shared/interface/message';


import { ChatService } from '../../Shared/services/chat-service';
import { ChatWindowState, ChatListStateService } from 'src/app/Shared/services/chat-list-state.service';
import { ChatMessageInputComponent } from '../chat-message-input/chat-message-input.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  @Input()
  public selectedContact: Contact;


  imageInit = '../../../assets/img/Web_Image_40.png';

  @ViewChild(ChatMessageInputComponent)
  messageInput: ChatMessageInputComponent;

  //httpFileUploadPlugin: HttpFileUploadPlugin;

  private ngDestroy = new Subject<void>();
  messages: Message[] = [];
  // tslint:disable-next-line: variable-name




  constructor(public chatservice: ChatService,) { }

  ngOnInit() {

    this.chatservice.getSelectedContactObservable().subscribe(contact => {
      if (contact !== null) {
        this.selectedContact = contact;
        // console.log('single thread friend' + JSON.stringify(this.selectedFriend) );
        this.selectedContact.messages$
          .pipe(
            filter(message => message.direction === Direction.in),
            takeUntil(this.ngDestroy)
          )
          .subscribe(() => {
            //this.chatWindowState.isCollapsed = false;
          });
      } else {
        // console.log('Friend is Null==header' );
      }
    });




  }

  ngOnDestroy() {
    this.ngDestroy.next();
    this.ngDestroy.complete();
  }

  sendMessage() {
    this.messageInput.onSendMessage();
  }

  async uploadFile(file: File) {
    // const url = await this.httpFileUploadPlugin.upload(file);
    //this.chatservice.sendMessage(this.contact.senderId.toString(), url);
  }

  onFocus() {
    this.messageInput.focus();
  }

  onActionClick(chatAction: ChatAction) {
    chatAction.onClick({
      contact: this.selectedContact.senderId.toString(),
      chatWindow: this,
    });
  }

}



export interface ChatAction {
  cssClass: { [className: string]: boolean } | string | string[];
  /**
   * to identify actions
   */
  id: string;
  html: string;

  onClick(chatActionContext: ChatActionContext): void;
}

export interface ChatActionContext {
  contact: string;
  chatWindow: ChatWindowComponent;
}
