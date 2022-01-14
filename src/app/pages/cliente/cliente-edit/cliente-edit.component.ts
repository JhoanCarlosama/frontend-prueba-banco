import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ClienteService} from '../../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss'],
})
export class ClienteEditComponent implements OnInit {
  cliente; any;

  form: FormGroup;

  constructor(
    private url: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: new FormControl ('', [Validators.required]),
      nombre: new FormControl ('', [Validators.required]),
      direccion: new FormControl ('', [Validators.required]),
      telefono: new FormControl ('', [Validators.required]),
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

    this.clienteService.show(id).subscribe(response => {
      this.cliente = response;

      this.form.patchValue({
        id: this.cliente.id,
        nombre: this.cliente.nombre,
        direccion: this.cliente.direccion,
        telefono: this.cliente.telefono,
      });

      this.getMessage(response);
    });
  }

  edit() {
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
