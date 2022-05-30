import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ClienteService } from '../../../services/cliente.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-cliente-new',
  templateUrl: './cliente-new.component.html',
  styleUrls: ['./cliente-new.component.scss'],
})
export class ClienteNewComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nombre: new FormControl ('', [Validators.required]),
      direccion: new FormControl ('', [Validators.required]),
      telefono: new FormControl ('', [Validators.required]),
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
      this.clienteService.createOrUpdate(this.form.value).subscribe(response => {
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
    this.router.navigate(['pages/cliente/index']).then();
  }
}
