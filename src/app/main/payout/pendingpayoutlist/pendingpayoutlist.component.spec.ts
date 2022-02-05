import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingpayoutlistComponent } from './pendingpayoutlist.component';

describe('PendingpayoutlistComponent', () => {
  let component: PendingpayoutlistComponent;
  let fixture: ComponentFixture<PendingpayoutlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingpayoutlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingpayoutlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
