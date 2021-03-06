import { Component, OnInit } from '@angular/core';
import { Autor } from '../../model/autor.model';
import { AutorService } from '../../service/autor.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html'
})
export class AutorComponent implements OnInit {

  autores: Autor[];
  messageError: string;
  cargandoAutor: boolean;
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

  constructor(private autorService: AutorService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.cargandoAutor = true;
    this.autorService.getAutores().subscribe(
      autores => {
        this.autores = autores;
        this.cargandoAutor = false;
      }
    );
  }

  eliminarAutor(autor: Autor): void {
    this.swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar al autor ${autor.nombreAutor}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.autorService.eliminarAutor(autor.idAutor).subscribe(
          res => {
            this.autores = this.autores.filter(au => au !== autor);
            this.swalWithBootstrapButtons.fire(
              'Autor eliminada',
              `El autor ${autor.nombreAutor} ${autor.apellido} fue eliminado con exito.`,
              'success'
            );
          }
        );
      }
    });
  }

}
