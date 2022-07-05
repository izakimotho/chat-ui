import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Message  {    
        animateIt: boolean;
        createdAt: Date;
        current_play_back_time: Number;
        deliveredTime: Number;
        expectedRecipientsNumber: Number;
        expiryTime: Number;
        fileDownloadStatus: Number;
        hasExpiry: boolean;
        isDeletedByPeer: boolean;
        isDowloaded: boolean;
        isForwarded: boolean;
        isGroupMessage: Number;
        isPinned: boolean;
        isQuoted: Number;
        isRead: boolean;
        isSelected: boolean;
        isStarred: boolean;
        media_length: Number;
        message: string ;
        messageFileType: Number;
        messageId: string ;
        messageType: Number;
        message_local_id: Number;
        otherContactId: string ;
        readDeliveredNumber: Number;
        readRecipientsNumber: Number;
        readTime: Number;
        recipientId: string ;
        senderId: string ;
        senderType: Number;
        status: Number;
        direction: Direction;
         /**
     * if no explicit state is set for the message, use implicit contact message states instead.
     */
    state?: MessageState;
    constructor() {
    }
  } 
  export enum MessageState {
    /**
     * Not yet sent
     */
    SENDING = 'sending',
    /**
     * Sent, but neither received nor seen by the recipient
     */
    SENT = 'sent',
    /**
     * The recipient client has received the message but the recipient has not seen it yet
     */
    RECIPIENT_RECEIVED = 'recipientReceived',
    /**
     * The message has been seen by the recipient
     */
    RECIPIENT_SEEN = 'recipientSeen',
}
 

export enum Direction {
    in = 'in',
    out = 'out',
}
