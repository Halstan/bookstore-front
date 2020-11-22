import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import uri from './global.service';
import { map, catchError } from 'rxjs/operators';
import { Idioma } from '../model/idioma';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getIdiomas(): Observable<any>{
    return this.httpClient.get(`${uri}idiomas`).pipe(
      map(res => res as Idioma[])
    );
  }

  agregarIdioma(idioma: Idioma): Observable<Idioma>{
    return this.httpClient.post(`${uri}idiomas`, idioma).pipe(
      map(res => res as any),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        return throwError(err);
      })
    );
  }

  getIdioma(idIdioma: number): Observable<Idioma>{
    return this.httpClient.get(`${uri}/idiomas/${idIdioma}`).pipe(
      map(res => res as Idioma),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errores', err.error.Errores, 'error');
        return throwError(err);
      })
    );
  }

  actualizarIdioma(idioma: Idioma): Observable<Idioma>{
    return this.httpClient.put(`${uri}idiomas`, idioma).pipe(
      map(res => res as Idioma),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errores', err.error.Errores, 'error');
        return throwError(err);
      })
    );
  }

  eliminarIdioma(idIdioma: number): Observable<Idioma>{
    return this.httpClient.delete(`${uri}idiomas/${idIdioma}`).pipe(
      map(res => res as Idioma),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }
}
