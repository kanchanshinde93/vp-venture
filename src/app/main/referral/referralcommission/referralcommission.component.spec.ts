import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralcommissionComponent } from './referralcommission.component';

describe('ReferralcommissionComponent', () => {
  let component: ReferralcommissionComponent;
  let fixture: ComponentFixture<ReferralcommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralcommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralcommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
