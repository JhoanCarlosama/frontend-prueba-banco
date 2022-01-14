import { TestBed } from '@angular/core/testing';

import { CuentaService } from './cuenta.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CuentaService', () => {
  let service: CuentaService;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CuentaService,
      ],
    });
    service = TestBed.inject(CuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('list', () => {
    service = TestBed.inject(CuentaService);
    service.list();
    expect(service).toBeTruthy();
  });

  it('createOrUpdate', () => {
    service = TestBed.inject(CuentaService);
    service.createOrUpdate('1');
    expect(service).toBeTruthy();
  });

  it('show', () => {
    service = TestBed.inject(CuentaService);
    service.show('1');
    expect(service).toBeTruthy();
  });

  it('delete', () => {
    service = TestBed.inject(CuentaService);
    service.delete('1');
    expect(service).toBeTruthy();
  });
});
