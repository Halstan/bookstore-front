import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../model/usuario.model';
import { UsuarioService } from '../../../service/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidadorService } from '../../../service/validador.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario();
  sexos = [`Masculino`, `Femenino`];
  title = 'Registrarme';
  errors: string[] = [];
  formUsuario: FormGroup;
  messageError: string;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private validadorService: ValidadorService,
              public authService: AuthService) {

    this.crearFormulario();
    this.cargarUsuario();
  }

  ngOnInit(): void {
  }

  cargarUsuario(): void{
    const username = this.authService.getUsuario().username;
    this.title = `Actualizar perfil de ${username}`;
    this.usuarioService.getUsuarioByUsername(username).subscribe(
      usuario => {
      this.usuario = usuario;
      this.cargarData();
    }
    );

  }

  get pass1NoValido(): boolean{
    return this.formUsuario.get('contrasenha').invalid && this.formUsuario.get('contrasenha').touched;
  }

  get pass2NoValido(): boolean{
    const pass1 = this.formUsuario.get('contrasenha').value;
    const pass2 = this.formUsuario.get('asegurarContrasenha').value;
    return pass1 === pass2 ? false : true;
  }

  cargarData(): void{
    this.formUsuario.reset({
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      username: this.usuario.username,
      correo: this.usuario.correo,
      contrasenha: '',
      asegurarContrasenha: this.usuario.asegurarContrasenha,
      sexo: this.usuario.sexo
    });
  }

  crearFormulario(): void{
    this.formUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      apellido: ['', [Validators.minLength(5), Validators.maxLength(40)]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      correo: ['', [Validators.minLength(10), Validators.maxLength(70), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      contrasenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      asegurarContrasenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      sexo: ['', [Validators.required]],
    }, {
      validators: [this.validadorService.passwordsIguales('contrasenha', 'asegurarContrasenha')]
    });
  }

  actualizarUsuario(): void{
    const usuario = this.formUsuario.value as Usuario;
    usuario.idUsuario = this.usuario.idUsuario;
    this.usuarioService.actualizarUsuario(usuario).subscribe(
      res => {
        this.router.navigate(['/home']);
        this.authService.logout();
        Swal.fire('Usuario actualizado', `${res.username} ha sido actualizado`, 'success');
      },
      err => {
        this.messageError = err.error.Message;
        this.errors = err.error.Errores as string[];
      }
    );
  }

}
