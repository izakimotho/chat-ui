import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';

import { ChatService } from '../Shared/services/chat-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Output()
  fileDrop = new EventEmitter<File>();

  
  fileDropEnabled = false;   
  fileDropMessageKey = '';


  showProfileComponent; 
  // chatService: ChatService; 
  constructor(private chatservice:ChatService) {
     // @ts-ignore
     window.chatService = this.chatservice;
     this.chatservice.connect();
    //  this.chatservice.subscribe();
    //  this.chatservice.publish();
  }


  ngOnInit(): void {    
    // this.showProfileComponent=this.chatservice.showprofile; 
    // console.log('showProfileComponent : '+this.showProfileComponent);
  }
  
}
