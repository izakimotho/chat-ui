import { LogService } from '../services/log.service';
import { Direction, Message, MessageState } from './message';

export interface StateDate {
    lastRecipientReceived: Date;
    lastRecipientSeen: Date;
    lastSent: Date;
}

export interface ContactToMessageStateDate {
    [jid: string]: StateDate;
}
const NGX_CHAT_MESSAGESENT = 'ngxchat:messagesent';
const STORAGE_NGX_CHAT_CONTACT_MESSAGE_STATES = 'ngxchat:contactmessagestates';
const wrapperNodeName = 'entries';
const nodeName = 'contact-message-state';

/**
 * Plugin using PubSub to persist message read states.
 */
export class MessageStatePlugin   {

    private contactToMessageStateDate: ContactToMessageStateDate = {};

    constructor( 
        private logService: LogService,
    ) {
        

         
    }

  

    onOffline() {
        this.contactToMessageStateDate = {};
    }
  

  

    private updateContactMessageState(contactJid: string, state: MessageState, stateDate: Date) {
        const current = this.getContactMessageState(contactJid);
        let changed = false;
        if (state === MessageState.RECIPIENT_RECEIVED && current.lastRecipientReceived < stateDate) {
            current.lastRecipientReceived = stateDate;
            changed = true;
        } else if (state === MessageState.RECIPIENT_SEEN && current.lastRecipientSeen < stateDate) {
            current.lastRecipientReceived = stateDate;
            current.lastRecipientSeen = stateDate;
            changed = true;
        } else if (state === MessageState.SENT && current.lastSent < stateDate) {
            current.lastSent = stateDate;
            changed = true;
        }
        if (changed) {
           // this.persistContactMessageStates().catch(err => this.logService.error('error persisting contact message states', err));
        }
    }

    public getContactMessageState(contactJid: string) {
        if (!this.contactToMessageStateDate[contactJid]) {
            this.contactToMessageStateDate[contactJid] = {
                lastRecipientReceived: null,
                lastRecipientSeen: null,
                lastSent: null,
            };
        }
        return this.contactToMessageStateDate[contactJid];
    }

    
}
