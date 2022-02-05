import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorlistComponent } from './investorlist.component';

describe('InvestorlistComponent', () => {
  let component: InvestorlistComponent;
  let fixture: ComponentFixture<InvestorlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
