import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Contact } from 'src/app/Shared/interface/contact';
import { ChatService } from 'src/app/Shared/services/chat-service';

import Giphy from 'giphy-api';
declare const microlink;
@Component({
  selector: 'app-chat-message-input',
  templateUrl: './chat-message-input.component.html',
  styleUrls: ['./chat-message-input.component.css']
})
export class ChatMessageInputComponent implements OnInit {
  toggled: boolean = false;
  @Input()
  public contact: Contact;

  // @Input()
  // public room: Room;

  public message = '';

  @ViewChild('chatInput')
  chatInput: ElementRef;

  constructor(public chatService: ChatService) {
  }

  ngOnInit() {
    //this.chatService.sendMessage(this.message);
  }

  onSendMessage() {
    // console.log( 'chatInput '+ this.chatInput.nativeElement.value);
    this.message = this.chatInput.nativeElement.value;
    if (this.message.trim().length > 0) {
      // console.log( 'Msg Before sending '+this.message);
      this.chatService.sendMessage(this.message);
      this.message = '';
      this.chatInput.nativeElement.value = "";
    }
    return false;
  }

  focus() {
    this.chatInput.nativeElement.focus();
  }
  ngAfterViewChecked() {
    // microlink('.link-preview');
  }
  addEmoji(event) {
    // console.log(this.message)
    const { message } = this;
    // console.log(message);
    // console.log(`${event.char}`)
    const text = `${message}${event.char}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }
  // addEmoji(event) {
  //   console.log(this.message)
  //   const { message } = this;
  //   console.log(message);
  //   console.log(`${event.emoji.native}`)
  //   const text = `${message}${event.emoji.native}`;

  //   this.message = text;
  //   // this.showEmojiPicker = false;
  // }

  onFocus() {
    // console.log('focus');
    // this.showEmojiPicker = false;
  }
  onBlur() {
    // console.log('onblur')
  }
}
