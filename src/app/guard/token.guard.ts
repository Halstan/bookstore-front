import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.isAuthenticated()){
        if (this.isTokenExpired()){
          this.auth.logout();
          this.router.navigate(['/login']);
        }
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

  isTokenExpired(): boolean {
    const token = this.auth.getToken();
    const payload = this.auth.obtainToken(token);
    const  now = new Date().getTime() / 1000;
    if (payload.exp < now){
      return true;
    }
    return false;
  }

}
