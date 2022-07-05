import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterNewChatComponent } from './roster-new-chat.component';

describe('RosterNewChatComponent', () => {
  let component: RosterNewChatComponent;
  let fixture: ComponentFixture<RosterNewChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterNewChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterNewChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
