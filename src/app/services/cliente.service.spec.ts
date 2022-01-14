import { TestBed } from '@angular/core/testing';

import { ClienteService } from './cliente.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ClienteService,
      ],
    });
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('list', () => {
    service = TestBed.inject(ClienteService);
    service.list();
    expect(service).toBeTruthy();
  });

  it('createOrUpdate', () => {
    service = TestBed.inject(ClienteService);
    service.createOrUpdate('1');
    expect(service).toBeTruthy();
  });

  it('show', () => {
    service = TestBed.inject(ClienteService);
    service.show('1');
    expect(service).toBeTruthy();
  });

  it('delete', () => {
    service = TestBed.inject(ClienteService);
    service.delete('1');
    expect(service).toBeTruthy();
  });

  it('searchByName', () => {
    service = TestBed.inject(ClienteService);
    service.searchByName('jose');
    expect(service).toBeTruthy();
  });
});
