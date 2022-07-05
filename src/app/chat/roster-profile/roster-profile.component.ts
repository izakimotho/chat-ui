import { Component, Input, OnInit } from '@angular/core';
import { Contact, meContact } from 'src/app/Shared/interface/contact';
import { ChatService } from 'src/app/Shared/services/chat-service';

@Component({
  selector: 'app-roster-profile',
  templateUrl: './roster-profile.component.html',
  styleUrls: ['./roster-profile.component.css']
})
export class RosterProfileComponent implements OnInit {
  @Input()
  meContact: meContact;
  nameisEditable: boolean = true;
  textisEditable: boolean = true;
  emailisEditable: boolean = true;

  constructor(private chatservice: ChatService) {

  }


  ngOnInit(): void {
    this.meContact = this.chatservice._meContact;
  }
  //Name Inputbox
  openNameEdit() {
    console.log(this.nameisEditable);
    this.nameisEditable = !this.nameisEditable;
  }
  closeNameEdit() {
    this.nameisEditable = !this.nameisEditable;
  }


  //Text about Inputbox
  openTextEdit() {
    this.textisEditable = !this.textisEditable;
  }
  closeTextEdit() {
    this.textisEditable = !this.textisEditable;
  }

  //Email Inputbox
  openEmailEdit() {
    this.emailisEditable = !this.emailisEditable;
  }
  closeEmailEdit() {
    this.emailisEditable = !this.emailisEditable;
  }
}
