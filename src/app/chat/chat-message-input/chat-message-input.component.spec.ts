import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageInputComponent } from './chat-message-input.component';

describe('ChatMessageInputComponent', () => {
  let component: ChatMessageInputComponent;
  let fixture: ComponentFixture<ChatMessageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMessageInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
