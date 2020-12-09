import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent{

  constructor(public auth: AuthService, private router: Router) { }

  logout(): void{
    Swal.fire('Cerrar sesión', `Hola ${this.auth.getUsuario().username}. has cerrado sesion`, 'success');
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
