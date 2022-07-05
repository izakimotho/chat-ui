import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message-text',
  templateUrl: './chat-message-text.component.html',
  styleUrls: ['./chat-message-text.component.css']
})
export class ChatMessageTextComponent implements OnInit {

  @Input() text: string;
  lines: string[];

  constructor() { }

  ngOnInit() {
    if (this.text) {
      this.lines = this.text.split('\n');
    }
  }
}
