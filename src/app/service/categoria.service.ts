import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import uri from './global.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';

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
}
