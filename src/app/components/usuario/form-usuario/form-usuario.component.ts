import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SexoService } from '../../../service/sexo.service';
import { Sexo } from '../../../model/sexo';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html'
})
export class FormUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  sexos: Sexo[];
  title = 'Registrarme';
  errors: string[] = [];

  constructor(private usuarioService: UsuarioService,
              private sexoService: SexoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  registrarUsuario(): void{
    this.usuarioService.insertarUsuario(this.usuario).subscribe(
      res => {
        this.router.navigate(['/home']);
        Swal.fire('Te has registrado con exito', `Bienvenido ${res.username}`, 'success');
      },
      err =>{
        this.errors = err.error.Errores as string[];
      }
    );
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(param => {
      const id = param['id'];
      if (id){
        this.usuarioService.getUsuario(id).subscribe(
          usuario => this.usuario = usuario
        );
      }
    });
    this.sexoService.getSexos().subscribe(
      sexos => this.sexos = sexos['Sexos']
    );
  }

  actualizarUsuario(): void{
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      res => {
        this.router.navigate(['/home']);
        Swal.fire('Usuario actualizado', `${res.username} ha sido actualizado`, 'success');
      },
      err =>{
        this.errors = err.error.Errores as string[];
        console.log(err.status);
      }
    );
  }

  compareSexo(sexo1: Sexo, sexo2: Sexo): boolean {
    if (sexo1 === undefined && sexo2 === undefined ){
      return true;
    }
    return sexo1 == null || sexo2 == null ? false : sexo1.idSexo === sexo2.idSexo;
  }

}
