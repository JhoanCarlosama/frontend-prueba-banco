import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CuentaService} from '../../../services/cuenta.service';
import {MovimientoService} from '../../../services/movimiento.service';
import {DatePipe} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-movimiento-edit',
  templateUrl: './movimiento-edit.component.html',
  styleUrls: ['./movimiento-edit.component.scss'],
  providers: [DatePipe],
})
export class MovimientoEditComponent implements OnInit {
  movimiento: any;

  public date = new Date();
  public fechaActual: any;
  public bloquearBoton = false;

  cuentas: any;

  form: FormGroup;

  public tipos = [
    { value: 'CREDITO', name: 'CREDITO' },
    { value: 'DEBITO', name: 'DEBITO' },
  ];

  constructor(
    private url: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private ctaService: CuentaService,
    private mvtoService: MovimientoService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.fechaActual = this.datePipe.transform(this.date, 'dd-MM-yyyy hh:mm a');

    this.form = this._formBuilder.group({
      id: new FormControl ('', [Validators.required]),
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

    this.show(this.url.snapshot.params.id);
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

  show(id) {
    this.getLoading('Obteniendo información!', 'Por favor espere un momento.');

    this.mvtoService.show(id).subscribe(response => {
      this.movimiento = response.data;

      this.form.patchValue({
        id: this.movimiento.id,
        tipo: this.movimiento.tipo,
        valor: this.movimiento.valor,
        cuenta: this.movimiento.cuenta.id,
      });

      this.getMessage(response);
    });
  }

  edit() {
    this.getLoading('Registrando información!', 'Por favor espere un momento.');

    if (this.form.valid) {
      this.ctaService.show(this.form.value.cuenta).subscribe(responseCta => {
        if (responseCta) {
          this.form.patchValue({
            cuenta: responseCta.data,
          });

          // guarda el registro
          this.mvtoService.createOrUpdate(this.form.value).subscribe(response => {
            if (response) {
              this.back();
            }

            this.getMessage(response);
          });
        }
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

  verificarValorCuenta(e) {
    if (e) {
      if (this.form.value.tipo === 'CREDITO') {
        const excedente =  e.saldo - this.form.value.valor;

        if (Math.sign(excedente) === -1) {
          this.bloquearBoton = true;
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: '¡Error!.',
            html: 'El valor que está a punto de guardar dejará el saldo de la cuenta en negativo',
            showConfirmButton: true,
          }).then();
        }
      }
    }
  }

  back() {
    this.router.navigate(['pages/movimiento/index']).then();
  }

}
