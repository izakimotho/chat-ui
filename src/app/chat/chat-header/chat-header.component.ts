import { Component, OnInit, Input } from '@angular/core';
import { Contact } from './../../Shared/interface/contact';

import { ChatService } from '../../Shared/services/chat-service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.css']
})
export class ChatHeaderComponent implements OnInit {


  @Input()
  contact: Contact;


  public selectedContact: Contact;


  constructor(private chatservice: ChatService) {
    this.selectedContact = this.contact;
  }

  ngOnInit(): void {
    this.selectedContact = null;
    // this.contact=new Contact();
    this.selectedContact = this.contact;
    // console.log('header bar user : '+ this.selectedContact.displayName ); 

  }

}
