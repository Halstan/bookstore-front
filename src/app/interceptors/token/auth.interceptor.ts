import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
              private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(e => {
        if (e.status === 401){
          if (this.auth.isAuthenticated()){
              this.auth.logout();
          }
          this.router.navigate(['/login']);
          }

        if (e.status === 403){
          Swal.fire('Acceso denegado', `Usted no tiene acceso a este recurso`, 'warning');
          // this.router.navigate(['/home']);
        }
        return throwError(e);
      })
    );
  }
}
