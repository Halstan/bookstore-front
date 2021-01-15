import { Component, OnInit } from '@angular/core';
import { Libro } from '../../model/libro.model';
import { LibroService } from '../../service/libro.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libro.component.html'
})
export class LibroComponent implements OnInit {

  libros: Libro[];
  cargandoLibro: boolean;
  page = 0;
  totalPages: Array<number>;
  isLast = false;
  totalElements: number;
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
              public authService: AuthService) { }

  ngOnInit(): void {
    this.getLibros(this.page);

  }

  getLibros(page: number): void {
    this.cargandoLibro = true;
    this.libroService.getLibrosPaginated(page).subscribe(
      libros => {
        this.libros = libros['content'];
        this.isLast = libros['last'];
        this.totalPages = new Array(libros['totalPages']);
        this.totalElements = libros['totalElements'];
        this.cargandoLibro = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  minPages(): void{
    if (this.page >= 0){
      this.page--;
      this.getLibros(this.page);
    }
  }

  maxPages(): void{
    if (this.page < this.totalPages.length){
      this.page++;

      this.getLibros(this.page);
    }

  }

  cambiarPagina(page: number, event: any): void{
    event.preventDefault();
    this.page = page;
    this.getLibros(this.page);
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
