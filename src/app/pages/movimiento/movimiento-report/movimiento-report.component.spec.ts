import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoReportComponent } from './movimiento-report.component';

describe('MovimientoReportComponent', () => {
  let component: MovimientoReportComponent;
  let fixture: ComponentFixture<MovimientoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
