import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaIndexComponent } from './cuenta-index.component';

describe('CuentaIndexComponent', () => {
  let component: CuentaIndexComponent;
  let fixture: ComponentFixture<CuentaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
