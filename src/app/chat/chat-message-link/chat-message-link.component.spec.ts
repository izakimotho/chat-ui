import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageLinkComponent } from './chat-message-link.component';

describe('ChatMessageLinkComponent', () => {
  let component: ChatMessageLinkComponent;
  let fixture: ComponentFixture<ChatMessageLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMessageLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
