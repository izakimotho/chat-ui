import {Contact} from './contact'
export class ContactList {
    private contact: Contact;  
    constructor(friend: Contact) {
      this.contact = friend; 
    }  
    get friend(): Contact {
      return this.contact;
    }
  
    set friend(value: Contact) {
      this.contact = value;
    }
  
    
  }
  