import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rol } from '../model/rol';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private uri = environment.url;

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<any> {
    return this.httpClient.get(`${this.uri}roles`).pipe(
      map(res => res as Rol[]
      )
    );
  }
}
