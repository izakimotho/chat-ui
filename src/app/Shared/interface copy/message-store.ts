import { Subject } from 'rxjs';
import { LogService } from '../services/log.service';
import { Message } from './message';
import { findSortedIndex, findSortedInsertionIndexLast, insertSortedLast } from './utils-array';
import { extractDateStringFromDate } from './utils-date';

export interface DateMessagesGroup {
    /** is equal to the date where one message on that date was received */
    date: Date;
    messages: Message[];
}

export class MessageStore<T extends Message> {

    public messages$: Subject<T>;
    public messages: T[] = [];
    public dateMessageGroups: DateMessagesGroup[] = [];
    public messageIdToMessage: { [key: string]: T } = {};

    constructor(private logService: LogService) {
        this.messages$ = new Subject<T>();
    }

    addMessage(message: T) {
        if (message.messageId && this.messageIdToMessage[message.messageId]) {
            if (this.logService) {
                this.logService.warn(`message with id ${message.messageId} already exists`);
            }
            return false;
        }
        insertSortedLast(message, this.messages, m => m.createdAt);
        this.addToDateMessageGroups(message);
        this.messageIdToMessage[message.messageId] = message;
        this.messages$.next(message);
        return true;
    }

    private addToDateMessageGroups(message: T) {
        const dateString = extractDateStringFromDate(message.createdAt);
        const groupIndex = findSortedIndex(dateString, this.dateMessageGroups, group => extractDateStringFromDate(group.date));
        if (groupIndex !== -1) {
            insertSortedLast(message, this.dateMessageGroups[groupIndex].messages, m => m.createdAt);
        } else {
            const groupToInsert = {
                date: message.createdAt,
                messages: [message]
            };
            const insertIndex = findSortedInsertionIndexLast(dateString, this.dateMessageGroups,
                group => extractDateStringFromDate(group.date));
            this.dateMessageGroups.splice(insertIndex, 0, groupToInsert);
        }
    }

}
