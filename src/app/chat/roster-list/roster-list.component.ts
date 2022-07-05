import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChatService } from '../../Shared/services/chat-service';
import { Contact } from '../../Shared/interface/contact'; 
import { ContactList } from '../../Shared/interface/contact-list'; 
import { Presence } from '../../Shared/interface/presence'; 

@Component({
  selector: 'app-roster-list',
  templateUrl: './roster-list.component.html',
  styleUrls: ['./roster-list.component.css']
})
export class RosterListComponent implements OnInit {
  hasNoContacts: Observable<boolean>;
  @Input() 

  @Output() threadChange = new EventEmitter<Contact>();
  public contacts: Contact[];
  constructor(private chatservice:ChatService ) {

   }

  ngOnInit(): void {   
     
    // console.log('Fake Friend list generation');
    this.chatservice.getContacts().subscribe(contacts => {
          // this.posts=p;
          this.contacts = contacts;
           //console.log(this.contacts);
          });

      if (!this.contacts) {
            //.contacts = this.chatService.contactsSubscribed;
        }
  }

  selectContact(rafiki: Contact) {
    // console.log('name of selected user : ' + rafiki);
    //  console.log('User ID : ' + rafiki.displayName);
    this.chatservice.selectedFriend = rafiki;
    
  }
}