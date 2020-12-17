import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Categoria } from '../model/categoria';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private uri = environment.url;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getCategorias(): Observable<any> {
    return this.httpClient.get(`${this.uri}categorias`).pipe(
      map(res => res as Categoria[]
      )
    );
  }

  insertarCategoria(categoria: Categoria): Observable<Categoria>{
    return this.httpClient.post(`${this.uri}categorias`, categoria).pipe(
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
    return this.httpClient.get(`${this.uri}categorias/${idCategoria}`).pipe(
      map(res => res as Categoria),
      catchError(err => {
        this.router.navigate(['/categorias']);
        Swal.fire('Error al obtener la categoria', err.Error, 'error');
        return throwError(err);
      })
    );
  }

  actualizarCategoria(categoria: Categoria): Observable<Categoria>{
    return this.httpClient.put(`${this.uri}categorias`, categoria).pipe(
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
    return this.httpClient.delete(`${this.uri}categorias/${idCategoria}`).pipe(
      map(res => res as Categoria),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }

}
