import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

import { ClienteNewComponent } from './cliente-new.component';

describe('ClienteNewComponent', () => {
  let component: ClienteNewComponent;
  let fixture: ComponentFixture<ClienteNewComponent>;
  let formBuilder: FormBuilder;

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
        FormsModule,
        ReactiveFormsModule,
        FormBuilder,
      ],
      declarations: [ ClienteNewComponent ],
      providers: [
        ClienteNewComponent,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteNewComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('getLoading', () => {
    component = TestBed.inject(ClienteNewComponent);
    component.getLoading('hola', 'mundo');
    expect(component).toBeTruthy();
  });

  it('delete', () => {
    const aux = 3;
    component.new();
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle().textContent).toEqual('Registrando información!');
    Swal.clickConfirm();
    setTimeout(() => {
      expect(aux).toEqual(3);
    });
  });*/
});
