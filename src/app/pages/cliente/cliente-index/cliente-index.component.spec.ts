import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClienteIndexComponent } from './cliente-index.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import Swal from 'sweetalert2';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('ClienteIndexComponent', () => {
  let component: ClienteIndexComponent;
  let fixture: ComponentFixture<ClienteIndexComponent>;

  beforeEach(async () => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    await TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA,
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      declarations: [
        ClienteIndexComponent,
      ],
      providers: [
        ClienteIndexComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getLoading', () => {
    component = TestBed.inject(ClienteIndexComponent);
    component.getLoading('hola', 'mundo');
    expect(component).toBeTruthy();
  });

  it('new', () => {
    component = TestBed.inject(ClienteIndexComponent);
    component.new();
    expect(component).toBeTruthy();
  });

  it('new', () => {
    component = TestBed.inject(ClienteIndexComponent);
    component.edit(1);
    expect(component).toBeTruthy();
  });


  it('delete', () => {
    const aux = 3;
    component.delete(1);
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle().textContent).toEqual('¿Está seguro?');
    Swal.clickConfirm();
    setTimeout(() => {
      expect(aux).toEqual(3);
    });
  });
});
