import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpayoutlistComponent } from './allpayoutlist.component';

describe('AllpayoutlistComponent', () => {
  let component: AllpayoutlistComponent;
  let fixture: ComponentFixture<AllpayoutlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllpayoutlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllpayoutlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
