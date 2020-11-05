import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import uri from './global.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Libro } from '../model/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getLibros(): Observable<any> {
    return this.httpClient.get(`${uri}libros`).pipe(
      map(res => res as Libro[]
      )
    );
  }
}
