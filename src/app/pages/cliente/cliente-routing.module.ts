import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClienteNewComponent } from './cliente-new/cliente-new.component';
import { ClienteIndexComponent } from './cliente-index/cliente-index.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';

const routes: Routes = [
  {
    path: 'index',
    component: ClienteIndexComponent,
  },
  {
    path: 'new',
    component: ClienteNewComponent,
  },
  {
    path: 'edit/:id',
    component: ClienteEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule { }
