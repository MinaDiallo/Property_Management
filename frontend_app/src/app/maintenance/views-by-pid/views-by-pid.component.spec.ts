import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsByPIdComponent } from './views-by-pid.component';

describe('ViewsByPIdComponent', () => {
  let component: ViewsByPIdComponent;
  let fixture: ComponentFixture<ViewsByPIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewsByPIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewsByPIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
