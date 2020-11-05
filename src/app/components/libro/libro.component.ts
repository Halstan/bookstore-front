import { Component, OnInit } from '@angular/core';
import { Libro } from '../../model/libro';
import { LibroService } from '../../service/libro.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-libros',
  templateUrl: './libro.component.html'
})
export class LibroComponent implements OnInit {

  libros: Libro[];
  messageError: string;

  constructor(private libroService: LibroService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.libroService.getLibros().subscribe(
      libros => this.libros = libros['Libros']
    );

  }

  eliminarLibro(libro: Libro){

  }

}
