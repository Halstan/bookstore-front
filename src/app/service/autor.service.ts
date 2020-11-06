import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import uri from './global.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Autor } from '../model/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getAutores(): Observable<any> {
    return this.httpClient.get(`${uri}autores`).pipe(
      map(res => res as Autor[])
    );
  }
}
