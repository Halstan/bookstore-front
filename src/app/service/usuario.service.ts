import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../model/usuario.model';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private uri = environment.url;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getUsuarios(): Observable<any>{
    return this.httpClient.get(`${this.uri}usuarios`).pipe(
      map(res => res as Usuario[])
    );
  }

  insertarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post(`${this.uri}usuarios`, usuario).pipe(
      map(res => res as Usuario),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errors', err.error['Errores'], 'error');
        return throwError(err);
      })
    );
  }

  getUsuario(idUsuario: number): Observable<Usuario>{
    return this.httpClient.get(`${this.uri}usuarios/${idUsuario}`).pipe(
      map(res => res as Usuario),
      catchError(err => {
        this.router.navigate(['/usuarios']);
        Swal.fire('Error al obtener al usuario', err.error, 'error');
        return throwError(err);
      })
    );
  }

  getUsuarioByUsername(username: string): Observable<Usuario>{
    return this.httpClient.get(`${this.uri}usuarios/username/${username}`).pipe(
      map(res => res as Usuario),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  actualizarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.put(`${this.uri}usuarios`, usuario).pipe(
      map(res => res as Usuario),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errors', err.error['Errores'], 'error');
        return throwError(err);
      })
    );
  }

  actualizarUsuarioAdmin(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.put(`${this.uri}usuarios/admin`, usuario).pipe(
      map(res => res as Usuario),
      catchError(err => {
        if (err.status === 400){
          return throwError(err);
        }
        Swal.fire('Errors', err.error['Errores'], 'error');
        return throwError(err);
      })
    );
  }

  eliminarUsuario(idUsuario: number): Observable<Usuario>{
    return this.httpClient.delete(`${this.uri}usuarios/${idUsuario}`).pipe(
      map(res => res as Usuario),
      catchError(err => {
        Swal.fire('Error', err.error.Mensaje, 'error');
        return throwError(err);
      })
    );
  }
}
