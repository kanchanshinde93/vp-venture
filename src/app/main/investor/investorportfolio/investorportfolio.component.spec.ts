import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorportfolioComponent } from './investorportfolio.component';

describe('InvestorportfolioComponent', () => {
  let component: InvestorportfolioComponent;
  let fixture: ComponentFixture<InvestorportfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorportfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorportfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
