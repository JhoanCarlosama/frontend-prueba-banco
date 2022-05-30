import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ClienteService } from '../../../services/cliente.service';
import { CuentaService } from '../../../services/cuenta.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-cuenta-new',
  templateUrl: './cuenta-new.component.html',
  styleUrls: ['./cuenta-new.component.scss'],
})
export class CuentaNewComponent implements OnInit {

  clientes: any;

  form: FormGroup;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private cuentaService: CuentaService,
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      numero: new FormControl ('', [Validators.required]),
      saldo: new FormControl ('', [Validators.required]),
      cliente: new FormControl ('', [Validators.required]),
    });

    this.clienteService.list().subscribe(response => {
      if (response) {
        this.clientes = response;
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
    this.getLoading('Registrando información!', 'Por favor espere un momento.');
    if (this.form.valid) {
      this.cuentaService.createOrUpdate(this.form.value).subscribe(response => {
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
    this.router.navigate(['pages/cuenta/index']).then();
  }
}
