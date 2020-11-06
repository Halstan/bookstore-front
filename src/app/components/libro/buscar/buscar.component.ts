import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../../service/libro.service';
import { Libro } from '../../../model/libro';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  libros: Libro[];
  loading: boolean;

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
  }

  buscar(termino: string){

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
