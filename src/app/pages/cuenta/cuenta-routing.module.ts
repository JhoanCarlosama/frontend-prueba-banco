import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CuentaNewComponent } from './cuenta-new/cuenta-new.component';
import { CuentaIndexComponent } from './cuenta-index/cuenta-index.component';
import { CuentaEditComponent } from './cuenta-edit/cuenta-edit.component';

const routes: Routes = [
  {
    path: 'index',
    component: CuentaIndexComponent,
  },
  {
    path: 'new',
    component: CuentaNewComponent,
  },
  {
    path: 'edit/:id',
    component: CuentaEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaRoutingModule { }
