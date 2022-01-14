import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MovimientoService } from '../../../services/movimiento.service';
import { ClienteService } from '../../../services/cliente.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-movimiento-report',
  templateUrl: './movimiento-report.component.html',
  styleUrls: ['./movimiento-report.component.scss'],
})
export class MovimientoReportComponent implements OnInit {
  form: FormGroup;

  cliente: any;
  fechaActual = new Date();

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private movimientoService: MovimientoService,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nombreCliente: new FormControl ('', [Validators.required]),
      fechaInicio: new FormControl ('', [Validators.required]),
      fechaFin: new FormControl ('', [Validators.required]),
    });
  }

  search() {
    if (new Date(this.form.value.fechaInicio) > this.fechaActual) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '¡Error!',
        html: 'La fecha inicial no debe ser mayor a la fecha actual',
        showConfirmButton: true,
      }).then();
    } else if (this.form.value.fechaFin < this.form.value.fechaInicio) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '¡Error!',
        html: 'La fecha final debe ser mayor a la fecha inicial',
        showConfirmButton: true,
      }).then();
    } else {
      this.movimientoService.report(this.form.value).subscribe(response => {
        if (response) {
          const file = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64'});
          const fileUrl = URL.createObjectURL(file);
          window.open(fileUrl);
        }

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Perfecto!',
          html: 'El reporte se generó exitosamente.',
          showConfirmButton: true,
        }).then();
      });
    }

  }

  searchCliente() {
    this.clienteService.searchByName(this.form.value.nombreCliente).subscribe(response => {
      if (response) {
        this.cliente = response;
      }
    });
  }

}
