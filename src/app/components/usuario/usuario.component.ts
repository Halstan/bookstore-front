import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];
  messageError: string;
  cargandoUsuario: boolean;
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    backdrop: `
    rgba(179,214,249,0.2)
    `,
    buttonsStyling: false
  });

  constructor(private usuarioService: UsuarioService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.cargandoUsuario = true;
    this.usuarioService.getUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios['Usuarios'];
        this.cargandoUsuario = false;
      }
    );

  }

  eliminarUsuario(usuario: Usuario): void{
    this.swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar al usuario ${usuario.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.idUsuario).subscribe(
          res => {
            this.usuarios = this.usuarios.filter(au => au !== usuario);
            this.swalWithBootstrapButtons.fire(
              'Usuario eliminado',
              `El usuario ${usuario.nombre} fue eliminado con exito.`,
              'success'
            );
          }
        );
      }
    });
  }

}
