import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoIndexComponent } from './movimiento-index.component';

describe('MovimientoIndexComponent', () => {
  let component: MovimientoIndexComponent;
  let fixture: ComponentFixture<MovimientoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
