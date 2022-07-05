import { ComponentFactoryResolver, Directive, Input, OnChanges, ViewContainerRef } from '@angular/core';
import { ChatMessageLinkComponent } from './../../chat/chat-message-link/chat-message-link.component';
import { ChatMessageTextComponent } from '../../chat/chat-message-text/chat-message-text.component';
import { extractUrls } from '../Pipes/utils-links';

@Directive({
    selector: '[lunnaChatLinks]'
})
export class LinksDirective implements OnChanges {

    // tslint:disable-next-line:no-input-rename
    @Input('lunnaChatLinks') lunnaChatLinks: string;

    constructor(private resolver: ComponentFactoryResolver,
                private viewContainerRef: ViewContainerRef) {
    }

    private transform() {
        const message: string = this.lunnaChatLinks;

        if (message) {
            const links = extractUrls(message);

            const chatMessageTextFactory = this.resolver.resolveComponentFactory(ChatMessageTextComponent);
            const chatMessageLinkFactory = this.resolver.resolveComponentFactory(ChatMessageLinkComponent);

            let lastIndex = 0;
            for (const link of links) {
                const currentIndex = message.indexOf(link, lastIndex);

                const textBeforeLink = this.viewContainerRef.createComponent(chatMessageTextFactory);
                textBeforeLink.instance.text = message.substring(lastIndex, currentIndex);

                const linkRef = this.viewContainerRef.createComponent(chatMessageLinkFactory);
                linkRef.instance.link = link;
                linkRef.instance.text = this.shorten(link);

                lastIndex = currentIndex + link.length;
            }

            const textAfterLastLinkSpan = this.viewContainerRef.createComponent(chatMessageTextFactory);
            textAfterLastLinkSpan.instance.text = message.substring(lastIndex);
        }
    }

    private shorten(url: string) {
        const parser = document.createElement('a');
        parser.href = url;

        let shortenedPathname = parser.pathname;
        if (shortenedPathname.length > 17) {
            shortenedPathname = shortenedPathname.substring(0, 5) + '...' + shortenedPathname.substring(shortenedPathname.length - 10);
        }

        return parser.protocol + '//' + parser.host + shortenedPathname;
    }

    ngOnChanges(): void {
        this.transform();
    }

}
