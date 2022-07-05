import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageTextComponent } from './chat-message-text.component';

describe('ChatMessageTextComponent', () => {
  let component: ChatMessageTextComponent;
  let fixture: ComponentFixture<ChatMessageTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMessageTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
