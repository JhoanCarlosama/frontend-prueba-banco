import { TestBed } from '@angular/core/testing';

import { MovimientoService } from './movimiento.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MovimientoService', () => {
  let service: MovimientoService;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        MovimientoService,
      ],
    });
    service = TestBed.inject(MovimientoService);
  });

  it('should be created', () => {
    service = TestBed.inject(MovimientoService);
    expect(service).toBeTruthy();
  });

  it('list', () => {
    service = TestBed.inject(MovimientoService);
    service.list();
    expect(service).toBeTruthy();
  });

  it('createOrUpdate', () => {
    service = TestBed.inject(MovimientoService);
    service.createOrUpdate('1');
    expect(service).toBeTruthy();
  });

  it('show', () => {
    service = TestBed.inject(MovimientoService);
    service.show('1');
    expect(service).toBeTruthy();
  });

  it('delete', () => {
    service = TestBed.inject(MovimientoService);
    service.delete('1');
    expect(service).toBeTruthy();
  });

  it('report', () => {
    service = TestBed.inject(MovimientoService);
    service.report('1');
    expect(service).toBeTruthy();
  });
});
