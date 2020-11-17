import { Component, OnInit } from '@angular/core';
import { Libro } from '../../model/libro';
import { LibroService } from '../../service/libro.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libros',
  templateUrl: './libro.component.html'
})
export class LibroComponent implements OnInit {

  libros: Libro[];
  cargandoLibro: boolean;
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

  messageError: string;

  constructor(private libroService: LibroService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargandoLibro = true;
    this.libroService.getLibros().subscribe(
      libros => {
        this.libros = libros['Libros'];
        this.cargandoLibro = false;
      }
    );

  }

  eliminarLibro(libro: Libro): void{
    this.swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar el libro ${libro.nombreLibro}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroService.eliminarLibro(libro.idLibro).subscribe(
          res => {
            this.libros = this.libros.filter(au => au !== libro);
            this.swalWithBootstrapButtons.fire(
              'Libro eliminado',
              `El libro ${libro.nombreLibro} fue eliminado con exito.`,
              'success'
            );
          }
        );
      }
    });
  }

}
