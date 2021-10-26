import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestortransactionlistComponent } from './investortransactionlist.component';

describe('InvestortransactionlistComponent', () => {
  let component: InvestortransactionlistComponent;
  let fixture: ComponentFixture<InvestortransactionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestortransactionlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestortransactionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
