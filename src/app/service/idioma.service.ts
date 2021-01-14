import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Idioma } from '../model/idioma.model.ts';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  private uri = environment.url;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getIdiomas(): Observable<any>{
    return this.httpClient.get(`${this.uri}idiomas`).pipe(
      map(res => res as Idioma[])
    );
  }

  agregarIdioma(idioma: Idioma): Observable<Idioma>{
    return this.httpClient.post(`${this.uri}idiomas`, idioma).pipe(
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
    return this.httpClient.get(`${this.uri}idiomas/${idIdioma}`).pipe(
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
    return this.httpClient.put(`${this.uri}idiomas`, idioma).pipe(
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
    return this.httpClient.delete(`${this.uri}idiomas/${idIdioma}`).pipe(
      map(res => res as Idioma),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }
}
