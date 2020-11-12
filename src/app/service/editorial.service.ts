import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import uri from './global.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Editorial } from '../model/editorial';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getEditoriales(): Observable<any> {
    return this.httpClient.get(`${uri}editoriales`).pipe(
      map(res => res as Editorial[])
    );
  }

  insertarEdiorial(editorial: Editorial): Observable<Editorial> {
    return this.httpClient.post(`${uri}editoriales`, editorial).pipe(
      map(res => res as Editorial),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errores', err.error['Errores'], 'error');
        return throwError(err);
      })
    );
  }

  getEditorial(idEditorial: number): Observable<Editorial>{
    return this.httpClient.get(`${uri}editoriales/${idEditorial}`).pipe(
      map(res => res as Editorial),
      catchError(err => {
        this.router.navigate(['/editoriales']);
        Swal.fire('Error al obtener la editorial', err.error, 'error');
        return throwError(err);
      })
    );
  }

  actualizarEdiorial(editorial: Editorial): Observable<Editorial> {
    return this.httpClient.put(`${uri}editoriales`, editorial).pipe(
      map(res => res as Editorial),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errores', err.error.Errores, 'error');
        return throwError(err);
      })
    );
  }

  eliminarEditorial(idEditorial: number): Observable<Editorial>{
    return this.httpClient.delete(`${uri}editoriales/eliminar/${idEditorial}`).pipe(
      map(res => res as Editorial),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }
}
