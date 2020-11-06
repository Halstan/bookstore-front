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
      }
    );

  }

}
