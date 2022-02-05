import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrallistComponent } from './referrallist.component';

describe('ReferrallistComponent', () => {
  let component: ReferrallistComponent;
  let fixture: ComponentFixture<ReferrallistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferrallistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
