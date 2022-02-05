import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveinvestorlistComponent } from './activeinvestorlist.component';

describe('ActiveinvestorlistComponent', () => {
  let component: ActiveinvestorlistComponent;
  let fixture: ComponentFixture<ActiveinvestorlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveinvestorlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveinvestorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
