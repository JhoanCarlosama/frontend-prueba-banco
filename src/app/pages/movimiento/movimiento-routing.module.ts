import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovimientoIndexComponent } from './movimiento-index/movimiento-index.component';
import { MovimientoReportComponent } from './movimiento-report/movimiento-report.component';
import { MovimientoNewComponent } from './movimiento-new/movimiento-new.component';
import { MovimientoEditComponent } from './movimiento-edit/movimiento-edit.component';

const routes: Routes = [
  {
    path: 'index',
    component: MovimientoIndexComponent,
  },
  {
    path: 'new',
    component: MovimientoNewComponent,
  },
  {
    path: 'edit/:id',
    component: MovimientoEditComponent,
  },
  {
    path: 'report',
    component: MovimientoReportComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimientoRoutingModule { }
