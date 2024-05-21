import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsByPropretyComponent } from './views-by-proprety.component';

describe('ViewsByPropretyComponent', () => {
  let component: ViewsByPropretyComponent;
  let fixture: ComponentFixture<ViewsByPropretyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewsByPropretyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewsByPropretyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
