import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import uri from './global.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Alquiler } from '../model/alquiler';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  constructor(private httpClient: HttpClient) { }

  getAlquileres(): Observable<any> {
    return this.httpClient.get(`${uri}alquileres`).pipe(
      map(res => res as Alquiler[])
    );

  }

  registrarAlquiler(alquiler: Alquiler): Observable<Alquiler>{
    return this.httpClient.post(`${uri}alquileres`, alquiler).pipe(
      map(res => res as Alquiler),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }

  desactivarAlquiler(idAlquiler: number): Observable<Alquiler>{
    return this.httpClient.delete(`${uri}alquileres/${idAlquiler}`).pipe(
      map(res => res as Alquiler),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }

  eliminarAlquiler(idAlquiler: number): Observable<Alquiler>{
    return this.httpClient.delete(`${uri}alquileres/eliminar/${idAlquiler}`).pipe(
      map(res => res as Alquiler),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }
}
