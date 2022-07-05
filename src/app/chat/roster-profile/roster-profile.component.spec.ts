import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterProfileComponent } from './roster-profile.component';

describe('RosterProfileComponent', () => {
  let component: RosterProfileComponent;
  let fixture: ComponentFixture<RosterProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
