import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from 'src/app/Shared/interface/contact';
import { Presence } from 'src/app/Shared/interface/presence';
import { ChatService } from 'src/app/Shared/services/chat-service';

@Component({
  selector: 'app-roster-contact',
  templateUrl: './roster-contact.component.html',
  styleUrls: ['./roster-contact.component.css']
})
export class RosterContactComponent implements OnInit {
  @Input()
  contact: Contact;

  presence = Presence;

  unreadCount = 0;

  private ngDestroy = new Subject<void>();
  constructor(private chatservice:ChatService) { }

  ngOnInit(): void {
  }
  selectContact(rafiki: Contact) {
    // console.log('name of selected user : ' + rafiki);
    //  console.log('User ID : ' + rafiki.displayName);
    this.chatservice.selectedFriend = rafiki;
    
  }
}
