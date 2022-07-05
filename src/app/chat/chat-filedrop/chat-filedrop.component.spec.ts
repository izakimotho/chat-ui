import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFiledropComponent } from './chat-filedrop.component';

describe('ChatFiledropComponent', () => {
  let component: ChatFiledropComponent;
  let fixture: ComponentFixture<ChatFiledropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatFiledropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFiledropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
