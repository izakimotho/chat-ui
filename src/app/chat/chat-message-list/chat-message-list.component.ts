import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { Contact } from 'src/app/Shared/interface/contact';

import { Direction, Message } from 'src/app/Shared/interface/message';
import { ChatService } from 'src/app/Shared/services/chat-service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatMessageListRegistryService } from 'src/app/Shared/services/chat-message-list-registry.service';
import { OrderByPipe } from 'src/app/Shared/Pipes/OrderByPipe';

@Component({
  selector: 'app-chat-message-list',
  templateUrl: './chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.css'],
   
})

 
export class ChatMessageListComponent implements OnInit {
  @Input()
  contact: Contact;


  showAvatars: boolean;

  @ViewChild('messageArea')
  chatMessageAreaElement: ElementRef<HTMLElement>;

  Direction = Direction;

  messages: Message[] = [];
  // tslint:disable-next-line: variable-name


  _thread: Contact;
  imageInit = '../../../assets/img/Web_Image_40.png';
  public selectedContact: Contact;
  private ngDestroy = new Subject<void>();

  constructor(private chatservice: ChatService,
    private chatMessageListRegistry: ChatMessageListRegistryService,) {
    this.selectedContact = null;
  }

  ngOnInit(): void {

    this.contact.messages$
      .pipe(takeUntil(this.ngDestroy))
      .subscribe(() => this.scheduleScrollToLastMessage());

    this.showAvatars = false;
    // this.messages = this.contact.messages$;
    this.chatMessageListRegistry.incrementOpenWindowCount(this.contact);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const contact = changes.contact;

    if (contact && contact.previousValue && contact.currentValue) {
      this.chatMessageListRegistry.decrementOpenWindowCount(contact.previousValue);
      this.chatMessageListRegistry.incrementOpenWindowCount(contact.currentValue);
    }

    if (contact && contact.currentValue) {
      this.scheduleScrollToLastMessage();
    }
  }

  ngOnDestroy(): void {
    this.ngDestroy.next();
    this.chatMessageListRegistry.decrementOpenWindowCount(this.contact);
  }



  private scheduleScrollToLastMessage() {
    setTimeout(() => this.scrollToLastMessage(), 0);
  }

  private scrollToLastMessage() {
    if (this.chatMessageAreaElement) {
      this.chatMessageAreaElement.nativeElement.scrollTop = this.chatMessageAreaElement.nativeElement.scrollHeight;
    }
  }


}
