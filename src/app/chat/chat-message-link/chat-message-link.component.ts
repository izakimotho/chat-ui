
import { PlatformLocation } from '@angular/common';
import { Component, Inject, InjectionToken, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';

export interface LinkOpener {
  openLink(url: string): void;
}

/**
 * You can provide your own implementation for {@link LinkOpener} to override link opening e.g. when using Cordova.
 */
export const LinkOpenerToken = new InjectionToken<LinkOpener>('LunnaChatLinkOpener');

@Component({
  selector: 'app-chat-message-link',
  templateUrl: './chat-message-link.component.html',
  styleUrls: ['./chat-message-link.component.css']
})
export class ChatMessageLinkComponent implements OnInit {

  link: string;
  text: string;

  constructor(private router: Router,
    private platformLocation: PlatformLocation,
    @Optional() @Inject(LinkOpenerToken) private linkOpener: LinkOpener) { }

  ngOnInit() {
    //this.chatService.sendMessage(this.message);
  }

  onClick($event: Event) {
    if (this.linkOpener) {
      $event.preventDefault();
      this.linkOpener.openLink(this.link);
    } else if (this.isInApp()) {
      $event.preventDefault();
      const linkParser = document.createElement('a');
      linkParser.href = this.link;
      this.router.navigateByUrl(linkParser.pathname);
    }
  }

  private isInApp() {
    return this.link.startsWith(this.appUrl());
  }

  private appUrl() {
    return window.location.protocol + '//' + window.location.host + this.platformLocation.getBaseHrefFromDOM();
  }
}
