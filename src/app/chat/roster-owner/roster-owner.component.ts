import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Shared/services/chat-service';
import {NgbModal, ModalDismissReasons}  
from '@ng-bootstrap/ng-bootstrap'; 
@Component({
  selector: 'app-roster-owner',
  templateUrl: './roster-owner.component.html',
  styleUrls: ['./roster-owner.component.css']
})
export class RosterOwnerComponent implements OnInit {

  closeResult = ''; 
  
  constructor(
    private modalService: NgbModal,
    private chatservice:ChatService)
     { 


     }
  open(content) { 
    this.modalService.open(content, 
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result)=> { 
      this.closeResult = `Closed with: ${result}`; 
    }, (reason) => { 
      this.closeResult =  
         `Dismissed ${this.getDismissReason(reason)}`; 
    }); 
  } 
  
  private getDismissReason(reason: any): string { 
    if (reason === ModalDismissReasons.ESC) { 
      return 'by pressing ESC'; 
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
      return 'by clicking on a backdrop'; 
    } else { 
      return `with: ${reason}`; 
    } 
  } 
  ngOnInit(): void {

  }
  selectProfile(){
  //console.log('profileContact ' );
    this.chatservice.showprofile=true;     
  }

  select() {
     console.log('n selected button : ' );
    //  console.log('User ID : ' + rafiki.displayName);
   
    
  }
}
