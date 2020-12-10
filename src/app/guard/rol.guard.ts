import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router){

}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.auth.isAuthenticated()){
        this.router.navigate(['/login']);
        return false;
      }

      const role = next.data['rol'] as string;
      console.log(role);

      if (this.auth.hasRole(role)){
        return true;
      }
      Swal.fire('Acceso denegado', `${this.auth.getUsuario().username} no tienes acceso a este recurso`, 'warning');
      return false;
  }
  
}
