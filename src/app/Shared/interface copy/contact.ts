
import { BehaviorSubject, Subject } from 'rxjs';
import { LogService } from '../services/log.service';
import { dummyAvatar } from './contact-avatar';
import { Direction, Message } from './message';
import { DateMessagesGroup, MessageStore } from './message-store';
import { Presence } from './presence';
import { ContactSubscription } from './subscription';
import { findLast } from './utils-array';

export interface ContactMetadata {
    [key: string]: any;
}



export class Contact {
    senderId: string ; 
    public avatar = dummyAvatar;
    public metadata: ContactMetadata = {};

    public phoneNumberOnPhone: string ;
    public handle: string ;
    public profileUrl: string ;
    public phoneNumber: string ;
    public nameOnPhone: string ;
    public hasNameOnPhone: number ;
    public isLunnaUser:number ;
    public isGroup: number ;
    public displayName: string ;
    public isNotInPhone: number ;
    public lastSeen: Date ; 
    public isVirtual: string ;
    public isChecked: boolean ;


    /** use {@link jidBare}, jid resource is only set for chat room contacts */
   
    public presence$ = new BehaviorSubject<Presence>(Presence.unavailable);
    public subscription$ = new BehaviorSubject<ContactSubscription>(ContactSubscription.none);
    public pendingOut$ = new BehaviorSubject(false);
    public pendingIn$ = new BehaviorSubject(false);

    private messageStore: MessageStore<Message>;

    get messages$(): Subject<Message> {
        return this.messageStore.messages$;
    }

    get messages(): Message[] {
        return this.messageStore.messages;
    }

    get dateMessagesGroups(): DateMessagesGroup[] {
        return this.messageStore.dateMessageGroups;
    }

    get mostRecentMessage() {
        return this.messageStore.messages[this.messageStore.messages.length - 1];
    }

    get mostRecentMessageReceived() {
        return findLast(this.messageStore.messages, msg => msg.direction === Direction.in);
    }

    get mostRecentMessageSent() {
        return findLast(this.messageStore.messages, msg => msg.direction === Direction.out);
    }

    /**
     * Do not call directly, use {@link ContactFactoryService#createContact} instead.
     */
    constructor(jidPlain: string,
                public name: string,
                logService?: LogService,
                avatar?: string) {
        if (avatar) {
            this.avatar = avatar;
        }
       
        this.messageStore = new MessageStore(logService);
    }

    addMessage(message: Message) {
        this.messageStore.addMessage(message);
    }

   

    isSubscribed() {
        const subscription = this.subscription$.getValue();
        return subscription === ContactSubscription.both || subscription === ContactSubscription.to;
    }

    isUnaffiliated() {
        return !this.isSubscribed() && !this.pendingIn$.getValue() && !this.pendingOut$.getValue();
    }



    getMessageById(id: string) {
        return this.messageStore.messageIdToMessage[id];
    }

   

}
