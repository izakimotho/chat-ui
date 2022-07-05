
import { Injectable, InjectionToken } from '@angular/core';

export const ChatServiceToken = new InjectionToken('lunnaChatService');

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor() { }
}
