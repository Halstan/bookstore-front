import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import uri from './global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: Usuario;
  private token: string;
  private httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClient: HttpClient) { }

  public getUsuario(): Usuario{
    if (this.usuario != null){
      return this.usuario;
    }else if (this.usuario == null && sessionStorage.getItem('usuario') != null){
      this.usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this.usuario;
    }
    return new Usuario();
  }

  public getToken(): string{
    if (this.token != null){
      return this.token;
    }else if (this.token == null && sessionStorage.getItem('token') != null){
      this.token = sessionStorage.getItem('token');
      return this.token;
    }
    return null;
  }

  login(user: Usuario): Observable<any> {

    const params = {
      username: user.username,
      password: user.contrasenha
    };

    return this.httpClient.post<any>(`${uri}auth`, params, {headers: this.httpHeader});
  }

  saveUser(accessToken: string): void{
    const payload = this.obtainToken(accessToken);
    this.usuario = new Usuario();

    this.usuario.username = payload.sub;
    this.usuario.rols = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  saveToken(accessToken: string): void{
    this.token = accessToken;
    sessionStorage.setItem('token', this.token);
  }

  obtainToken(accessToken: string): any{
    if (accessToken != null){
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    const payload = this.obtainToken(this.token);
    if (payload != null && payload.sub && payload.sub.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean{
    if (this.getUsuario().rols.includes(role)){
      return true;
    }
    return false;
  }

  logout(): void{
    this.token = null;
    this.usuario = null;
    sessionStorage.clear();
  }

}
