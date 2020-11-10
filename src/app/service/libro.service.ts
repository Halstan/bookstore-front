import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import uri from './global.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Libro } from '../model/libro';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    timer: 800,
    timerProgressBar: true,
    showCancelButton: false
   });

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getLibros(): Observable<any> {
    return this.httpClient.get(`${uri}libros`).pipe(
      map(res => res as Libro[]
      )
    );
  }

  getLibrosByNombre(nombre: string): Observable<object>{
    return this.httpClient.get(`${uri}libros/nombre/${nombre}`).pipe(
      map(res => res as Libro[]),
      catchError(err => {
        if (err.status === 400){
          this.Toast.fire('Error', 'Este libro no existe', 'error');
          return throwError(err);
        }
      })
    );
  }
  
}
