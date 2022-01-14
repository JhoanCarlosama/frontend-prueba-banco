import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CuentaService } from '../../../services/cuenta.service';
import { MovimientoService } from '../../../services/movimiento.service';

import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-movimiento-new',
  templateUrl: './movimiento-new.component.html',
  styleUrls: ['./movimiento-new.component.scss'],
  providers: [DatePipe],
})
export class MovimientoNewComponent implements OnInit {
  public date = new Date();
  public fechaActual: any;

  cuentas: any;

  form: FormGroup;

  public tipos = [
    { value: 'CREDITO', name: 'CREDITO' },
    { value: 'DEBITO', name: 'DEBITO' },
  ];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private ctaService: CuentaService,
    private mvtoService: MovimientoService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.fechaActual = this.datePipe.transform(this.date, 'dd-MM-yyyy hh:mm a');

    this.form = this._formBuilder.group({
      tipo: new FormControl ('', [Validators.required]),
      fecha: new FormControl (this.date, [Validators.required]),
      valor: new FormControl ('', [Validators.required]),
      cuenta: new FormControl ('', [Validators.required]),
    });

    this.ctaService.list().subscribe(response => {
      if (response) {
        this.cuentas = response;
      }
    });
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

  new() {
    this.getLoading('Registrando información!', 'Por favor espere un momento.');
    if (this.form.valid) {
      this.mvtoService.createOrUpdate(this.form.value).subscribe(response => {
        if (response) {
          this.back();
        }

        this.getMessage(response);
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Verifique la información registrada.',
        html: 'Uno o más campos contienen datos inválidos!',
        showConfirmButton: true,
      }).then();
    }
  }

  back() {
    this.router.navigate(['pages/movimiento/index']).then();
  }
}
