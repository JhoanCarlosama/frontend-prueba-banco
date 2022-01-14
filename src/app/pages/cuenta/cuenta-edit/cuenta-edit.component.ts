import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {ClienteService} from '../../../services/cliente.service';
import {CuentaService} from '../../../services/cuenta.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-cuenta-edit',
  templateUrl: './cuenta-edit.component.html',
  styleUrls: ['./cuenta-edit.component.scss'],
})
export class CuentaEditComponent implements OnInit {

  cuenta: any;
  clientes: any;

  form: FormGroup;

  constructor(
    private url: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private cuentaService: CuentaService,
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: new FormControl ('', [Validators.required]),
      numero: new FormControl ('', [Validators.required]),
      saldo: new FormControl ('', [Validators.required]),
      cliente: new FormControl ('', [Validators.required]),
    });

    this.clienteService.list().subscribe(response => {
      if (response) {
        this.clientes = response;
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
      position: 'top-end',
      icon: response.type,
      title: response.message,
      showConfirmButton: true,
    }).then();
  }

  show(id) {
    this.getLoading('Obteniendo información!', 'Por favor espere un momento.');

    this.cuentaService.show(id).subscribe(response => {
      this.cuenta = response;

      this.form.patchValue({
        id: this.cuenta.id,
        numero: this.cuenta.numero,
        saldo: this.cuenta.saldo,
        cliente: this.cuenta.cliente.id,
      });

      this.getMessage(response);
    });
  }

  edit() {
    this.getLoading('Registrando información!', 'Por favor espere un momento.');

    if (this.form.valid) {
      this.clienteService.show(this.form.value.cliente).subscribe(responseCliente => {
        if (responseCliente) {
          this.form.patchValue({
            cliente: responseCliente,
          });

          // guarda el registro
          this.cuentaService.createOrUpdate(this.form.value).subscribe(response => {
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

  back() {
    this.router.navigate(['pages/cuenta/index']).then();
  }
}
