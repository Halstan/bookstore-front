import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idioma } from '../../model/idioma';
import { IdiomaService } from '../../service/idioma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
})
export class IdiomaComponent implements OnInit {

  idiomas: Idioma[] = [];
  error: boolean;
  cargandoIdioma: boolean;
  messageError: string;
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    backdrop: `
    rgba(179,214,249,0.2)
    `,
    buttonsStyling: false
  });

  constructor(private idiomaService: IdiomaService) { }

  ngOnInit(): void {
    this.cargandoIdioma = true;
    this.idiomaService.getIdiomas().subscribe(
      idiomas => {
        this.idiomas = idiomas;
        this.cargandoIdioma = false;
      }
    );
  }

  eliminarIdioma(idioma: Idioma): void{
    this.swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar el idioma ${idioma.nombreIdioma}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.idiomaService.eliminarIdioma(idioma.idIdioma).subscribe(
          res => {
            this.idiomas = this.idiomas.filter(au => au !== idioma);
            this.swalWithBootstrapButtons.fire(
              'Idioma eliminado',
              `El idioma ${idioma.nombreIdioma} fue eliminado con exito.`,
              'success'
            );
          }
        );
      }
    });
  }

}
