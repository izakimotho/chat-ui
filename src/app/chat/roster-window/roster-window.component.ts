import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roster-window',
  templateUrl: './roster-window.component.html',
  styleUrls: ['./roster-window.component.css']
})
export class RosterWindowComponent implements OnInit {
  isShowProfile :boolean=false;;
  isNewChat :boolean=false;
  constructor() { }

  ngOnInit(): void {
   
  }
    openShowProfile(){
      this.isShowProfile = true;
      // this.chatservice.showprofile=true;   
      // this.showprofile= this.chatservice.showprofile; 
    }

    closeShowProfile(){
      this.isShowProfile = false;   
    }

    openIsNewChat(){
      this.isNewChat=true;
      //console.log(this.isNewChat);
    }
    closeIsNewChat(){
      this.isNewChat=false
    }
}
