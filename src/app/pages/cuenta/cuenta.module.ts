import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { CuentaIndexComponent } from './cuenta-index/cuenta-index.component';
import { CuentaNewComponent } from './cuenta-new/cuenta-new.component';
import { CuentaEditComponent } from './cuenta-edit/cuenta-edit.component';


@NgModule({
  declarations: [
    CuentaIndexComponent,
    CuentaNewComponent,
    CuentaEditComponent
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule
  ]
})
export class CuentaModule { }
