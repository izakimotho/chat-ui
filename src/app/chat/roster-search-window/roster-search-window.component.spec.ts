import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterSearchWindowComponent } from './roster-search-window.component';

describe('RosterSearchWindowComponent', () => {
  let component: RosterSearchWindowComponent;
  let fixture: ComponentFixture<RosterSearchWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterSearchWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterSearchWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
