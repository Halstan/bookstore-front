import { Injectable } from '@angular/core';
import uri from './global.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Sexo } from '../model/sexo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SexoService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getSexos(): Observable<any>{
    return this.httpClient.get(`${uri}sexos`).pipe(
      map(res => res as Sexo[])
    );
  }
}
