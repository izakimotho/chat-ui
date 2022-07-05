import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { MessageState, Message } from 'src/app/Shared/interface/message';
import { Contact } from 'src/app/Shared/interface/contact';
import { extractUrls } from 'src/app/Shared/Pipes/utils-links';
import { ChatService } from 'src/app/Shared/services/chat-service';

import { LinksDirective } from 'src/app/Shared/directives/links.directive';

export const MAX_IMAGE_SIZE = 250 * 1024;

import { MessageStatePlugin, StateDate } from 'src/app/Shared/interface/MessageStatePlugin';
@Component({
    selector: 'app-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.css'],
  
})
export class ChatMessageComponent implements OnInit {

    @Input()
    showAvatars: boolean;

    @Input()
    avatar?: string;

    @Input()
    message: Message;

    @Input()
    nick: string;

    @Input()
    contact: Contact;

    imageLink: string;

    MessageState = MessageState;

    private messageStatePlugin: MessageStatePlugin;

    constructor(public chatService: ChatService,
        private httpClient: HttpClient,) { }


    ngOnInit() {
        this.tryFindImageLink();
    }

    private async tryFindImageLink() {
        if (this.chatService) {
            for (const url of extractUrls(this.message.message)) {
                try {
                    const headRequest = await this.httpClient.head(url, { observe: 'response' }).toPromise();
                    const contentType = headRequest.headers.get('Content-Type');
                    const isImage = contentType && contentType.startsWith('image');
                    const contentLength = headRequest.headers.get('Content-Length');
                    if (isImage && parseInt(contentLength, 10) < MAX_IMAGE_SIZE) {
                        this.imageLink = url;
                        break;
                    }
                } catch (e) {

                }
            }
        }
    }
    getMessageState() {
        if (this.message.state) {
            return this.message.state;
        } else if (this.contact) {
            const date = this.message.createdAt;
            const states = this.messageStatePlugin.getContactMessageState(this.contact.senderId.toString());
            return this.getStateForDate(date, states);
        }
    }
    checkifdateistoday(){
        
    }
    private getStateForDate(date: Date, states: StateDate) {
        if (date <= states.lastRecipientSeen) {
            return MessageState.RECIPIENT_SEEN;
        } else if (date <= states.lastRecipientReceived) {
            return MessageState.RECIPIENT_RECEIVED;
        } else if (date <= states.lastSent) {
            return MessageState.SENT;
        }
    }
}
