import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';

import { ClienteService } from '../../../services/cliente.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.scss'],
})
export class ClienteIndexComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'telefono', 'acciones'];
  dataSource: any;

  searchCtrl = new FormControl();

  searchStr$ = this.searchCtrl.valueChanges.pipe(
    debounceTime(10),
  );

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.getIndex();
  }

  getLoading(title, html) {
    Swal.fire({
      title: title,
      html: html,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then();
  }

  getMessage(response) {
    Swal.fire({
      position: 'top-end',
      icon: response.type,
      title: response.message,
      showConfirmButton: true,
    }).then();
  }

  getIndex() {
    this.getLoading('Cargando información!', 'Por fav or espere un momento.');

    this.clienteService.list().subscribe(response => {
      if (response) {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

      Swal.close();
    }, err => {
      console.error('Error al realizar consulta' + err.message);
    });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  new() {
    this.router.navigate(['pages/cliente/new']).then();
  }

  edit(id) {
    this.router.navigate(['pages/cliente/edit/' + id]).then();
  }

  delete(id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrá recuperar este registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(id).subscribe(response => {
          this.getMessage(response);

          this.getIndex();
        });
      }
    });
  }
}
