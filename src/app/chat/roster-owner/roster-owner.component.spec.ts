import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterOwnerComponent } from './roster-owner.component';

describe('RosterOwnerComponent', () => {
  let component: RosterOwnerComponent;
  let fixture: ComponentFixture<RosterOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
