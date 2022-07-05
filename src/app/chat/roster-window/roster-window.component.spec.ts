import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterWindowComponent } from './roster-window.component';

describe('RosterWindowComponent', () => {
  let component: RosterWindowComponent;
  let fixture: ComponentFixture<RosterWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
