import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import uri from './global.service';
import { map } from 'rxjs/operators';
import { Idioma } from '../model/idioma';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getIdiomas(): Observable<any>{
    return this.httpClient.get(`${uri}idiomas`).pipe(
      map(res => res as Idioma[])
    );
  }
}
