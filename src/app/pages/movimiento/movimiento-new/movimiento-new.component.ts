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
      icon: response.type,
      title: response.title,
      text: response.message,
      showConfirmButton: true,
      timer: 1500,
    }).then();
  }

  new() {
    if (this.form.valid) {
      if (this.verificarValorCuenta(this.form.value.cuenta)) {
        Swal.fire({
          icon: 'error',
          title: '¡Error en la solicitud!.',
          html: 'El valor que está a intenta guardar dejaría el saldo de la cuenta en negativo',
          showConfirmButton: true,
        }).then();
      } else {
        this.getLoading('Registrando información!', 'Por favor espere un momento.');
        const data = {
          tipo: this.form.value.tipo,
          newBalance: this.form.value.valor,
          idCuenta: this.form.value.cuenta.id,
        };

        this.ctaService.increaseAndDecreaseBalance(data).subscribe(responseCta => {
          if (responseCta.status === 200) {
            const dataCta = {
              tipo: this.form.value.tipo,
              fecha: this.form.value.fecha,
              valor: this.form.value.valor,
              cuenta: responseCta.data,
            };

            /*this.mvtoService.createOrUpdate(this.form.value).subscribe(response => {*/
            this.mvtoService.createOrUpdate(dataCta).subscribe(response => {
              if (response) {
                // this.back();
              }
            });

            this.getMessage(responseCta);
          }
        });
      }
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

  verificarValorCuenta(e) {
    if (e) {
      if (this.form.value.tipo === 'CREDITO') {
        const excedente =  e.saldo - this.form.value.valor;

        if (Math.sign(excedente) === -1) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
