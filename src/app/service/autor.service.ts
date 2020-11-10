import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import uri from './global.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Autor } from '../model/autor';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getAutores(): Observable<any> {
    return this.httpClient.get(`${uri}autores`).pipe(
      map(res => res as Autor[])
    );
  }

  getAutoresByNombre(nombre: string): Observable<any> {
    return this.httpClient.get(`${uri}autores/nombre/${nombre}`).pipe(
      map(res => res as Autor[])
    );
  }

  insertarAutor(autor: Autor): Observable<Autor>{
    return this.httpClient.post(`${uri}autores`, autor).pipe(
      map(res => res as Autor),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errores', err.error.Errores, 'error');
        return throwError(err);
      })
    );
  }

  getAutor(idAutor: number): Observable<Autor>{
    return this.httpClient.get(`${uri}autores/${idAutor}`).pipe(
      map(res => res as Autor),
      catchError(err => {
        this.router.navigate(['/autores']);
        Swal.fire('Error al obtener el autor', err.Error, 'error');
        return throwError(err);
      })
      );
  }

  actualizarAutor(autor: Autor): Observable<Autor>{
    return this.httpClient.put(`${uri}autores`, autor).pipe(
      map(res => res as Autor),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        this.router.navigate(['/autores']);
        Swal.fire('Errores', err.error.Errores, 'error');
        return throwError(err);
      })
    );
  }

  eliminarAutor(idAutor: number): Observable<Autor>{
    return this.httpClient.delete(`${uri}autores/${idAutor}`).pipe(
      map(res => res as Autor),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }

}
