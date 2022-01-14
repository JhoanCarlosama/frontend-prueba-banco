import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { MaterialModule } from '../../material.module';

import { ClienteNewComponent } from './cliente-new/cliente-new.component';
import { ClienteIndexComponent } from './cliente-index/cliente-index.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';

@NgModule({
  declarations: [
    ClienteNewComponent,
    ClienteIndexComponent,
    ClienteEditComponent,
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
  ],
})
export class ClienteModule { }
