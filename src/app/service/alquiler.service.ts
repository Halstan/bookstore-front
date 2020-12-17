import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Alquiler } from '../model/alquiler';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  private uri = environment.url;

  constructor(private httpClient: HttpClient) { }

  getAlquileres(): Observable<any> {
    return this.httpClient.get(`${this.uri}alquileres`).pipe(
      map(res => res as Alquiler[])
    );

  }

  getAlquileresByUsername(username: string): Observable<any>{
    return this.httpClient.get(`${this.uri}alquileres/usuario/${username}`).pipe(
      map(res => res as Alquiler[])
    );
  }

  registrarAlquiler(alquiler: Alquiler): Observable<Alquiler>{
    return this.httpClient.post(`${this.uri}alquileres`, alquiler).pipe(
      map(res => res as Alquiler),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }

  desactivarAlquiler(idAlquiler: number): Observable<Alquiler>{
    return this.httpClient.delete(`${this.uri}alquileres/${idAlquiler}`).pipe(
      map(res => res as Alquiler),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }

  eliminarAlquiler(idAlquiler: number): Observable<Alquiler>{
    return this.httpClient.delete(`${this.uri}alquileres/eliminar/${idAlquiler}`).pipe(
      map(res => res as Alquiler),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }
}
