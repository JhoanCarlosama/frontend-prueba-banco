import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientoRoutingModule } from './movimiento-routing.module';
import { MaterialModule } from '../../material.module';

import { MovimientoIndexComponent } from './movimiento-index/movimiento-index.component';
import { MovimientoReportComponent } from './movimiento-report/movimiento-report.component';
import { MovimientoNewComponent } from './movimiento-new/movimiento-new.component';
import { MovimientoEditComponent } from './movimiento-edit/movimiento-edit.component';


@NgModule({
  declarations: [
    MovimientoIndexComponent,
    MovimientoReportComponent,
    MovimientoNewComponent,
    MovimientoEditComponent,
  ],
  imports: [
    CommonModule,
    MovimientoRoutingModule,
    MaterialModule,
  ],
})
export class MovimientoModule { }
