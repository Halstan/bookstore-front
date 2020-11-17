import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import uri from './global.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alquiler } from '../model/alquiler';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getAlquileres(): Observable<any> {
    return this.httpClient.get(`${uri}alquileres`).pipe(
      map(res => res as Alquiler[])
    );

  }
}
