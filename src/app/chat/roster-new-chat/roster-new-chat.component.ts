import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/Shared/interface/contact';
import { ChatService } from 'src/app/Shared/services/chat-service';

@Component({
  selector: 'app-roster-new-chat',
  templateUrl: './roster-new-chat.component.html',
  styleUrls: ['./roster-new-chat.component.css']
})
export class RosterNewChatComponent implements OnInit {
  public contacts: Contact[];
  groupedContacts: any;
  constructor(private chatservice:ChatService ) {}

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
selected(event){

}
selectContact( contacts : Contact){
  
}
}
