import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../model/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  user: Usuario;
  titulo = 'Iniciar sesión';

  constructor(private auth: AuthService,
              private router: Router) {
    this.user = new Usuario();
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()){
      Swal.fire('Login', `Hola ${this.auth.getUsuario().nombre} ya estás autenticado`, 'info');
    }
  }

  login(): void{

    const user = this.auth.getUsuario();

    if (this.user.username == null || this.user.contrasenha == null){
      Swal.fire('Error al iniciar sesion', 'Credenciales inválidas', 'error');
      return;
    }

    this.auth.login(this.user).subscribe(res => {

      this.auth.saveUser(res.jwt);
      this.auth.saveToken(res.jwt);

      this.router.navigate(['/home']);
      Swal.fire('Inicio de sesion', `Hola ${this.user.username} has iniciado sesión`, 'success');
    }, err => {
      if (err.status === 400 || err.status === 401) {
        Swal.fire('Error al iniciar sesión', 'Credenciales inválidas', 'error');
      }
    });
  }

}
