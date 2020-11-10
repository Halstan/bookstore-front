import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import uri from './global.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Categoria } from '../model/categoria';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getCategorias(): Observable<any> {
    return this.httpClient.get(`${uri}categorias`).pipe(
      map(res => res as Categoria[]
      )
    );
  }

  insertarCategoria(categoria: Categoria): Observable<Categoria>{
    return this.httpClient.post(`${uri}categorias`, categoria).pipe(
      map(res => res as Categoria),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errores', err.error.Errores, 'error');
        return throwError(err);
      })
    );
  }

  getCategoria(idCategoria: number): Observable<Categoria>{
    return this.httpClient.get(`${uri}categorias/${idCategoria}`).pipe(
      map(res => res as Categoria),
      catchError(err => {
        this.router.navigate(['/categorias']);
        Swal.fire('Error al obtener la categoria', err.Error, 'error');
        return throwError(err);
      })
    );
  }

  actualizarCategoria(categoria: Categoria): Observable<Categoria>{
    return this.httpClient.put(`${uri}categorias`, categoria).pipe(
      map(res => res as Categoria),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errores', err.error.Errores, 'error');
        return throwError(err);
      })
    );
  }

  eliminarCategorias(idCategoria: number): Observable<Categoria>{
    return this.httpClient.delete(`${uri}categorias/${idCategoria}`).pipe(
      map(res => res as Categoria),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }

}
