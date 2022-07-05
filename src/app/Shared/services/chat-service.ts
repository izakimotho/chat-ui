import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';



//import { ChatAction } from '../../core/chat/chat-window/chat-window.component';
import { Contact, meContact } from '../interface/contact';
import { ContactList } from '../interface/contact-list';
import { LogInRequest } from '../interface/log-in-request';
import { Translations } from '../interface/translations';
import { dummyAvatar } from '../interface/contact-avatar';
import { ChatAction } from 'src/app/chat/chat-window/chat-window.component';
import { Direction, Message, MessageType, MessageState } from '../interface/message';
import { FileType } from '../interface/file-type';
import { Event_Type } from '../interface/events';



const CHAT_URL = environment.chatUrl;
const CHAT_PORT = environment.chatPort;
declare const $: any;
declare var socketClusterClient: any;

/**
 * ChatService is your main API for using chat. Can be injected in your services like in the following example:
 *
 * ```
 * constructor(@Inject(ChatServiceToken) chatService: ChatService)
 * ```
 */

@Injectable()
export class ChatService {
  socket: any; socketConRes: any;
  myChannel: any;
  myID: string = '1d830dec-a6e6-4d28-b872-a6648ccf7587';
  strIntoObj: string;
  showprofile: boolean;
  message: Message;
  _meContact: meContact;
  msgUser: Contact;
  private _loggedUser: Contact;
  private _loggedUserObservable: BehaviorSubject<Contact>;
  private _contactListObservable: BehaviorSubject<Contact[]>;
  private _selectedContactObservable: BehaviorSubject<Contact>;
  private _selectedContact: Contact;

  private _contactList: Contact[];
  mstype: Number;
  emoji = '';

  constructor(private _httpClient: HttpClient) {
    this.showprofile = false;

    // this._contactList=null;
    this._contactList = this.getFakeContactList();
    this._meContact = this.getMeContact();
    this._contactListObservable = new BehaviorSubject(this._contactList);
    this._selectedContact = null;
    this._selectedContactObservable = new BehaviorSubject(null);
    this._loggedUser = this.createFakeUser();
    this._loggedUserObservable = new BehaviorSubject(this._loggedUser);

    // this._contactMessageList = new BehaviorSubject(this.historyMessages);
  }
  /**
   * handles to connect event with a SC server 
   * 
   */
  connect() {
    //config socket
    this.socket = socketClusterClient.create({
      hostname: CHAT_URL,//'139.59.70.54',
      port: CHAT_PORT
    });
    console.log(this.socket);
    console.log(this.socket.state);

    //create listeners
    this.createListeners();

  }

  initSubscription(token: string) {
    //subscribe to user to listen for posts
    //this.subscriptionListener('1d830dec-a6e6-4d28-b872-a6648ccf7587').then();
    this.subscriptionListener(token).then();
  }


  /**
     * handles initialise listeners
     *      
     */
  createListeners() {
    this.errorListener().then();
    this.connectListener().then();
    this.getChannelDataProcedureListener().then();
  }
  /**
  * logs any errors that occur for the socket
  * @returns {Promise<void>}
  */
  async errorListener() {
    for await (let { error } of this.socket.listener('error')) {
      console.error(error);
    }
  }

  /**
   * handles to connect event with a SC server and invokes the server's login function to authenticate
   * @returns {Promise<void>}
   */
  async connectListener() {
    for await (let event of this.socket.listener('connect')) {
      //console.log('Event : ' + JSON.stringify(event));


      // if (event.isAuthenticated) {
      //   // goToMainScreen();
      //   console.log('Socket is auth!');
      // } else {
      //   console.log('Socket not auth!');
      //   // goToLoginScreen();
      // }

      try {
        this.socket.transmit('message_sent', 'Initial transmission  (message sent)');
        //Socket is auth!
        // await Promise.all([
        //     this.socket.invoke('login', {username: "kyle", password: "thebestpassword", client_name: 'minions'}),
        //     this.socket.listener('authenticate').once(),
        // ]);
        // console.log('Socket is auth!');
      } catch (e) {
        console.error(e.message);
      }
    }
  }

  async getChannelDataProcedureListener() {
    for await (let request of this.socket.procedure('getChannelData')) {
      console.log('Get Channel Data' + request);
      request.end({});
      continue;
    }
  }

  /**
   * creates a listener on an sc server's channel
   * @param channel
   * @param logic_function
   * @returns {Promise<void>}
   */
  async subscriptionListener(channel, logic_function = undefined) {
    try {
      for await (let data of this.socket.subscribe(channel)) {
        console.log(data);
        // if(logic_function === undefined) {
        //     console.log(' meso == : '+ JSON.stringify(data));
        // } else{
        //     logic_function(data);
        // }
        this.sortMessage(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  private getMeContact() {
    // return new Contact('1d830dec-a6e6-4d28-b872-a6648ccf7587', dummyAvatar, ' In a good bookroom you feel in some mysterious way that you are absorbing the wisdom contained in all the books through your skin, without even opening them.', '254724346453', 'handle', 'profileUrl', '07724346453', 'kish', 1, 1, 1, 'User Kish', 1,
    //   new Date().valueOf(), 'isVirtual', true, 0, false, true);

    return new meContact(1, 0, "~Kish", 0, '1d830dec-a6e6-4d28-b872-a6648ccf7587', false, false, false, 0, 0, 1, 0, 0, "254724346453", "21a1aa96-0d9f-4c12-8d20-65be40484b82_V2ZB0eVJMk_6May2020162021GMT_1588782021158.jpg", '1d830dec-a6e6-4d28-b872-a6648ccf7587', 0, 1);
    //      return new meContact(1,0,"~Kish",0,'1d830dec-a6e6-4d28-b872-a6648ccf7587',false,false,false,0, 0, 1,0,0,"254724346453""21a1aa96-0d9f-4c12-8d20-65be40484b82_V2ZB0eVJMk_6May2020162021GMT_1588782021158.jpg","I am on Lunna!");


    // contactType,contact_local_id,displayName,hasNameOnPhone,id,isAdmin,isBlurred,isChecked,isGroup,isLunnaUser,isNotInPhone,isVirtual,lastSeen,
    // phoneNumber,profileUrl,status,senderId,senderType


    // "contactType": 1,
    // "contact_local_id": 0,
    // "displayName": "~Kish",
    // "hasNameOnPhone": 0,
    // "id": "1d830dec-a6e6-4d28-b872-a6648ccf7587",
    // "isAdmin": false,
    // "isBlurred": false,
    // "isChecked": false,
    // "isGroup": 0,
    // "isLunnaUser": 0,
    // "isNotInPhone": 1,
    // "isVirtual": 0,
    // "lastSeen": 0,
    // "phoneNumber": "254724346453",
    // "profileUrl": "21a1aa96-0d9f-4c12-8d20-65be40484b82_V2ZB0eVJMk_6May2020162021GMT_1588782021158.jpg",
    // "status": "I am on Lunna!"

  }
  getContacts(): BehaviorSubject<Contact[]> {
    // console.log('contacts list');
    return this._contactListObservable;
  }

  private getFakeContactList() {

    return [
      this.createFakeUser(),
      this.createFakeUser2(),
    ];
  }
  private createFakeUser() {
    return new Contact('21a1aa96-0d9f-4c12-8d20-65be40484b82', dummyAvatar, 'metadata', 'phoneNumberOnPhone', 'handle', 'profileUrl', 'phoneNumber', 'nameOnPhone', 1, 1, 1, 'User Kish', 1,
      new Date().valueOf(), 'isVirtual', true, 0, false, true);


  }
  private createFakeUser2() {
    return new Contact('5ee6eef1-34ed-41a2-80c3-303265bf56ba', dummyAvatar, 'metadata', 'phoneNumberOnPhone', 'handle', 'profileUrl', 'phoneNumber', 'nameOnPhone', 1, 1, 1, 'George O.', 1,
      new Date().valueOf(), 'isVirtual', true, 0, true, true);

  }

  getSelectedContactObservable(): BehaviorSubject<Contact> {
    return this._selectedContactObservable;
  }
  get selectedFriend(): Contact {
    //  console.log( 'User Selected: ' + User.name);
    return this._selectedContact;
  }
  /**
     * handles to binding contact info  function to be used
     * @returns {Promise<void>}
     */
  set selectedFriend(value: Contact) {
    this._selectedContact = value;
    //  console.log( 'Set User Selected: ' + this._selectedFriend);
    this._selectedContactObservable.next(value);
  }

  /**
   * Sends a given message to a given contact.
   * @param id The id of the contact to which the message shall be sent.
   * @param body The message content.
   */
  sendMessage(body: string) {
    if (this._selectedContact.isGroup) {
      this.mstype = MessageType.NORMAL_MESSAGE;
    } else {
      this.mstype = MessageType.GROUP_MESSAGE;
    }



    //21a1aa96-0d9f-4c12-8d20-65be40484b82
    this.message = new Message();
    this.message.animateIt = false;
    this.message.createdAt = new Date();
    this.message.current_play_back_time = 0;
    this.message.deliveredTime = 0;
    this.message.expiryTime = 0;
    this.message.expectedRecipientsNumber = 0;
    this.message.fileDownloadStatus = 0;
    this.message.hasExpiry = false;
    this.message.isDeletedByPeer = false;
    this.message.isDowloaded = false;
    this.message.isForwarded = false;
    this.message.isGroupMessage = 0;
    this.message.isPinned = false;
    this.message.isQuoted = 0;
    this.message.isRead = false;
    this.message.isSelected = false;
    this.message.isStarred = false;
    this.message.media_length = 0;
    this.message.message = body;
    this.message.messageFileType = 0;
    this.message.messageId = (this.myID + "_" + new Date().getUTCMilliseconds());// message.setMessageId(myId + "_" + System.currentTimeMillis());
    this.message.messageType = this.mstype;
    this.message.message_local_id = 40;
    this.message.readDeliveredNumber = 0;
    this.message.readTime = 0;
    this.message.readRecipientsNumber = 0;
    this.message.senderType = 0;
    this.message.status = 1;
    this.message.otherContactId = this._selectedContact.senderId;//other contact id?????
    this.message.recipientId = this._selectedContact.senderId;
    this.message.senderId = this.myID;
    this.message.senderContact = this._meContact;
    this.message.direction = Direction.out;
    this.message.state = MessageState.SENT;



    // console.log('message sent :' + JSON.stringify(this.message));


    this._selectedContact.addMessage(this.message);
    // console.log('Message being sent : ' + this.message);

    //this.message.fileAbs='';//file.getAbsolutePath()
    // messageList.add(message);
    this.socket.invoke('message_sent', JSON.stringify(this.message));

    // (async () => {  
    //   const msg = "{\"animateIt\":false,\"createdAt\":1604387760299,\"current_play_back_time\":0,\"deliveredTime\":0,\"expectedRecipientsNumber\":0,\"expiryTime\":0,\"fileDownloadStatus\":0,\"hasExpiry\":false,\"isDeletedByPeer\":false,\"isDowloaded\":false,\"isForwarded\":false,\"isGroupMessage\":0,\"isPinned\":false,\"isQuoted\":0,\"isRead\":false,\"isSelected\":false,\"isStarred\":false,\"media_length\":0,\"message\":\"Momentum \",\"messageFileType\":0,\"messageId\":\"21a1aa96-0d9f-4c12-8d20-65be40484b82_1604387760277\",\"messageType\":1,\"message_local_id\":40,\"otherContactId\":\"1d830dec-a6e6-4d28-b872-a6648ccf7587\",\"readDeliveredNumber\":0,\"readRecipientsNumber\":0,\"readTime\":0,\"recipientId\":\"1d830dec-a6e6-4d28-b872-a6648ccf7587\",\"senderId\":\"21a1aa96-0d9f-4c12-8d20-65be40484b82\",\"senderType\":0,\"status\":1}";

    //   this.socket.transmit('message_sent', msg);
    //   let result = await this.socket.invoke('message_sent', JSON.stringify(msg));
    //   // result will be 'Success'
    // })();
  }

  sortMessage(data: Object) {
    let cont = '';
    let eventStat: number;
    let payload: any;
    // for (var prop in data) {
    //   if (typeof data[prop] == 'string') {
    //     console.log("string " + data[prop]);
    //   }
    //   else {
    //     console.log("row " + data[prop].recipientId);
    //     cont = data[prop].recipientId;
    //     msg = data[prop];
    //   }
    // }

    for (var prop in data) {
      if (typeof data[prop] == 'number') {
        console.log("Event Status " + data[prop]);
        eventStat = data[prop];
      }
      else {
        console.log("payload " + JSON.stringify(data[prop]));
        payload = data[prop];
      }



      switch (eventStat) {
        case 0://HANDSHAKE
          //statements; 
          this.handShake(payload);

          break;
        case 1://MY_CONTACT
          //statements; 
          this.setMyID(payload);
          break;
        case 2://CONTACTS
          //statements; 
          this.setConatcts(payload);
          break;
        case 3://SETTINGS
          //statements;  
          this.setSettings(payload);
          break;
        case 4://MESSAGE
          //statements; 
          this.setMessage(payload);
          break;
        case 5:// ARCHIVED_MESSAGS
          //statements; 
          this.setArchivedMessages(payload);
          break;
          break;
        case 6://CALLS
          //statements; 
          this.setCalls(payload);
          break;
        case 7://LOCATION
          //statements; 
          break;
        case 8://others
          //statements; 
          break;
        case 9://others
          //statements; 
          break;
        case 10://others
          //statements; 
          break;
        default: {
          //statements; 
          break;
        }
      }

    }

    
  }




    /**
      * handles the confirmation that web is connected to a contact
      * @returns {Promise<void>}
    */
    handShake(payload: any) {

    }



    /**
      * handles to binding contact info  of the account onwer
      * @returns {Promise<void>}
    */
    setMyID(payload: any) {
      //map Conatcts  property.
      this._meContact=payload;
    }


    /**
      * handles to binding contacts/roster list  of the account onwer
      * @returns {Promise<void>}
    */
    setConatcts(Payload: any) {
      this._contactList
    }
    /**
      * handles to binding contact settings  of the account onwer
      * @returns {Promise<void>}
    */
    setSettings(Payload: any) {

    }
    /**
      * handles to binding Recieved 
      * @returns {Promise<void>}
    */
    setMessage(payload: any) {
      let cont = '';
      let eventStat: number;
      let msg = new Message();      

      for (var prop in payload) {
        if (typeof payload[prop] == 'string') {
          console.log("string " + payload[prop]);
        }
        else {
          console.log("row " + payload[prop].recipientId);
          cont = payload[prop].recipientId;
          msg = payload[prop];
        }
      }

    
    //Find index of specific object using findIndex method.    
    const objIndex = this._contactList.findIndex((obj => obj.senderId == '21a1aa96-0d9f-4c12-8d20-65be40484b82'));

    //Update Conatcts's message property.
      msg.direction = Direction.in;
      console.log("Message in : ", JSON.stringify(msg));
      this._contactList[objIndex].addMessage(msg);
    }

    /**
      * handles mapping of archived messages 
      * @returns {Promise<void>}
    */
    setArchivedMessages(Payload: any) {

    }
    /**
      * handles to binding contact settings  of the account onwer
      * @returns {Promise<void>}
    */
    setCalls(Payload: any) {

    };




  /**
    * Lifecycle state machine. Starts in the state "disconnected". When logging in, the state will change to "connecting".
    * Plugins may now initialize, for example load the contact list or request archived messages. When all plugins have completed the
    * initialization, the new state will be 'online'.
    */
  state$: BehaviorSubject<'disconnected' | 'connecting' | 'online'>;
  /**
     * The actions visible to users near to chat inputs, e.g. the send message button. Customize it for branding or to add
     * new actions, e.g. for file uploads.
     */
  chatActions: ChatAction[];

}
