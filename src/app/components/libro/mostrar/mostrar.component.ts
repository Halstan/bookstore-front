import { Component, OnInit } from '@angular/core';
import { Libro } from '../../../model/libro';
import { LibroService } from '../../../service/libro.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html'
})
export class MostrarComponent implements OnInit {

  libros: Libro[];
  loading: boolean;
  error: boolean;
  messageError: string;

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {

    this.error = false;
    this.loading = true;

    this.libroService.getLibros().subscribe(
      libros => {
        this.libros = libros['Libros'];
        this.loading = false;
        this.error = false;
      }
    );

  }

  buscar(termino: string): void{

    this.loading = true;

    this.libroService.getLibrosByNombre(termino)
          .subscribe((res: any) => {
            this.libros = res['Libros']
            this.loading = false;
    }, err => {
      console.log('Este libro no existe');
    });

  }

}
