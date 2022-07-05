import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterContactComponent } from './roster-contact.component';

describe('RosterContactComponent', () => {
  let component: RosterContactComponent;
  let fixture: ComponentFixture<RosterContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
