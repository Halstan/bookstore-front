import { Injectable } from '@angular/core';
import uri from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rol } from '../model/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<any> {
    return this.httpClient.get(`${uri}roles`).pipe(
      map(res => res as Rol[]
      )
    );
  }
}
