import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Libro } from '../model/libro.model';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private uri = environment.url;
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
    return this.httpClient.get(`${this.uri}libros`).pipe(
      map(res => res as Libro[]
      )
    );
  }

  getLibrosPaginated(page: number): Observable<Libro[]>{
    return this.httpClient.get<Libro[]>(`${this.uri}libros/page/${page}`);
  }

  getLibrosByNombre(nombre: string): Observable<object>{
    return this.httpClient.get(`${this.uri}libros/nombre/${nombre}`).pipe(
      map(res => res as Libro[]),
      catchError(err => {
        if (err.status === 400){
          this.Toast.fire('Error', 'Este libro no existe', 'error');
          return throwError(err);
        }
      })
    );
  }

  getLibrosByEstado(estado: boolean): Observable<any>{
    return this.httpClient.get(`${this.uri}libros/estado/${estado}`).pipe(
      map(res => res as Libro[]),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }

  getLibrosByIdEditorial(idEditorial: number): Observable<any>{
    return this.httpClient.get(`${this.uri}libros/editorial/${idEditorial}`).pipe(
      map(res => res as Libro[]),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }

  getLibrosByNombreEditorial(nombreEditorial: string): Observable<any>{
    return this.httpClient.get(`${this.uri}libros/editorial/nombre/${nombreEditorial}`).pipe(
      map(res => res as Libro[]),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }

  insertarLibro(libro: Libro): Observable<Libro>{
    return this.httpClient.post(`${this.uri}libros`, libro).pipe(
      map(res => res as Libro),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errores', err.error.Errores, 'error');
        return throwError(err);
      })
    );
  }

  getLibro(idLibro: number): Observable<Libro>{
    return this.httpClient.get(`${this.uri}libros/${idLibro}`).pipe(
      map(res => res as Libro),
      catchError(err => {
        this.router.navigate(['/libros']);
        Swal.fire('Error al obtener el libro', err.Error, 'error');
        return throwError(err);
      })
    );
  }

  actualizarLibro(libro: Libro): Observable<Libro>{
    return this.httpClient.put(`${this.uri}libros`, libro).pipe(
      map(res => res as Libro),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errores', err.error.Errores, 'error');
        return throwError(err);
      })
    );
  }

  eliminarLibro(idLibro: number): Observable<Libro>{
    return this.httpClient.delete(`${this.uri}libros/${idLibro}`).pipe(
      map(res => res as Libro),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }

}
