import { Component, OnInit } from '@angular/core';
import { AutorService } from '../../../service/autor.service';
import { Autor } from '../../../model/autor.model';

@Component({
  selector: 'app-mostrar-autor',
  templateUrl: './mostrar-autor.component.html'
})
export class MostrarAutorComponent implements OnInit {

  autores: Autor[];
  loading: boolean;
  error: boolean;
  messageError: string;

  constructor(private autorService: AutorService) { }

  ngOnInit(): void {
    this.error = false;
    this.loading = true;

    this.autorService.getAutores().subscribe(
      autores => {
        this.autores = autores;
        this.loading = false;
      }
    );
  }

  buscar(nombre: string): void {
    this.loading = true;

    this.autorService.getAutoresByNombre(nombre).subscribe(
      res => {
        this.autores = res;
        this.loading = false;
      }, err => {
        console.log('Este autor no existe');
      }
    );
  }

}
