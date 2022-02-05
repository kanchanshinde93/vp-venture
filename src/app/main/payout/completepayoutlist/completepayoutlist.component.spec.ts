import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletepayoutlistComponent } from './completepayoutlist.component';

describe('CompletepayoutlistComponent', () => {
  let component: CompletepayoutlistComponent;
  let fixture: ComponentFixture<CompletepayoutlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletepayoutlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletepayoutlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
