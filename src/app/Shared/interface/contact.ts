
import { BehaviorSubject, Subject } from 'rxjs';
import { LogService } from '../services/log.service';
import { dummyAvatar } from './contact-avatar';
import { Direction, Message } from './message';
import { DateMessagesGroup, MessageStore } from './message-store';
import { Presence } from './presence';
import { ContactSubscription } from './subscription';
import { findLast } from '../Pipes/utils-array';

export interface ContactMetadata {
    [key: string]: any;
}
export interface JidToPresence {
    [jid: string]: Presence;
}


export class Contact {
    public senderId: string;
    public avatar = dummyAvatar;
    public metadata: ContactMetadata = {};
    public phoneNumberOnPhone: string;
    public handle: string;
    public profileUrl: string;
    public phoneNumber: string;
    public nameOnPhone: string;
    public hasNameOnPhone: number;
    public isLunnaUser: number;
    public isGroup: number;
    public displayName: string;
    public isNotInPhone: number;
    public lastSeen: Date;
    public isVirtual: string;
    public isChecked: boolean;
    public unread: number;
    public isTyping: boolean;
    public isOnline: boolean;


    /** use {@link jidBare}, jid resource is only set for chat room contacts */
    public jidFull: string;
    public jidBare:string;


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
    // constructor(jidPlain: string,
    //             public name: string, 
    //             avatar?: string) {
    //     if (avatar) {
    //         this.avatar = avatar;
    //     }

    //     this.messageStore = new MessageStore();
    // }


    constructor(senderId,avatar,metadata,phoneNumberOnPhone,handle,profileUrl,phoneNumber,nameOnPhone,hasNameOnPhone,isLunnaUser,isGroup,displayName,isNotInPhone,
        lastSeen,isVirtual,isChecked,unread,isTyping,isOnline) {
          
        this.senderId = senderId;
        this.avatar = avatar;
        this.metadata = metadata;
        this.phoneNumberOnPhone = phoneNumberOnPhone;
        this.handle = handle;
        this.profileUrl = profileUrl;
        this.phoneNumber = phoneNumber;
        this.nameOnPhone = nameOnPhone;
        this.hasNameOnPhone = hasNameOnPhone;
        this.isLunnaUser = isLunnaUser;
        this.isGroup = isGroup;
        this.displayName = displayName;
        this.isNotInPhone = isNotInPhone;
        this.lastSeen = lastSeen;
        this.isVirtual = isVirtual;
        this.isChecked = isChecked;
        this.unread = unread;
        this.isTyping = isTyping;
        this.isOnline = isOnline;
        this.messageStore = new MessageStore();
        

        const jid = senderId;
        this.jidFull = jid;
        this.jidBare = jid;
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


    // public equalsBareId(other: Contact ) {
    //     const otherJid = other instanceof Contact ? other.senderId : this.senderId;
    //     return this.jidBare.equals(otherJid);
    // }
}

export class meContact {

    public contactType: number;
    public contact_local_id: number;
    public displayName: string;
    public hasNameOnPhone: number;
    public id: string;
    public isAdmin: boolean=false;
    public isBlurred: boolean=false;
    public isChecked: boolean=false;
    public isGroup: number;
    public isLunnaUser: number=0;
    public isNotInPhone: number=1;
    public isVirtual: number=0;
    public lastSeen: number=0;
    public phoneNumber: string='';
    public profileUrl: number=0; 
    public status: string='I am on Lunna!';
    public senderId: string='';
    public senderType: number=0;
    //public status: number=1;
     


  

    constructor(contactType,contact_local_id,displayName,hasNameOnPhone,id,isAdmin,isBlurred,isChecked,isGroup,isLunnaUser,isNotInPhone,isVirtual,lastSeen,phoneNumber,profileUrl,status,senderId,senderType
        
    ) {          
        this.senderId = senderId;
        this.contactType = contactType;
        this.contact_local_id = contact_local_id;
        this.id = id;
        this.isAdmin = isAdmin;
        this.profileUrl = profileUrl;
        this.phoneNumber = phoneNumber;
        this.isBlurred = isBlurred;
        this.hasNameOnPhone = hasNameOnPhone;
        this.isLunnaUser = isLunnaUser;
        this.isGroup = isGroup;
        this.displayName = displayName;
        this.isNotInPhone = isNotInPhone;
        this.lastSeen = lastSeen;
        this.isVirtual = isVirtual;
        this.isChecked = isChecked;
        this.status = status;
        this.senderType = senderType;     
    } 
    

  
}
