import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoEditComponent } from './movimiento-edit.component';

describe('MovimientoEditComponent', () => {
  let component: MovimientoEditComponent;
  let fixture: ComponentFixture<MovimientoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
