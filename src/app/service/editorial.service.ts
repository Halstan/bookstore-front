import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import uri from './global.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Editorial } from '../model/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getEditoriales(): Observable<any> {
    return this.httpClient.get(`${uri}editoriales`).pipe(
      map(res => res as Editorial[])
    );
  }
}
