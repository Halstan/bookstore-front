import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario.model';
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadorService } from '../../../service/validador.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html'
})
export class FormUsuarioComponent implements OnInit {

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

  registrarUsuario(): void{
    this.usuarioService.insertarUsuario(this.formUsuario.value).subscribe(
      res => {
        this.router.navigate(['/home']);
        Swal.fire('Te has registrado con exito', `Bienvenido ${res.username}`, 'success');
      },
      err => {
        this.messageError = err.error.Message;
        this.errors = err.error.Errores as string[];
      }
    );
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(param => {
      const id = param['id'];
      if (id){
        this.title = `Actualizar usuario`;
        this.usuarioService.getUsuario(id).subscribe(
          usuario => {
            this.usuario = usuario;
            this.cargarData();
          }
        );
      }
    });
  }

  get nombreNoValido(): boolean{
    return this.formUsuario.get('nombre').invalid && this.formUsuario.get('nombre').touched;
  }

  get apellidoNoValido(): boolean{
    return this.formUsuario.get('apellido').invalid && this.formUsuario.get('apellido').touched;
  }

  get usernameNoValido(): boolean{
    return this.formUsuario.get('username').invalid && this.formUsuario.get('username').touched;
  }

  get correoNoValido(): boolean{
    return this.formUsuario.get('correo').invalid && this.formUsuario.get('correo').touched;
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
      correo: '',
      contrasenha: this.usuario.contrasenha,
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
      sexo: ['', [Validators.required]]
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
        Swal.fire('Usuario actualizado', `${res.username} ha sido actualizado`, 'success');
      },
      err => {
        this.messageError = err.error.Message;
        this.errors = err.error.Errores as string[];
      }
    );
  }

}
