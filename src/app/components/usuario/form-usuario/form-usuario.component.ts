import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SexoService } from '../../../service/sexo.service';
import { Sexo } from '../../../model/sexo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html'
})
export class FormUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  sexos: Sexo[];
  title = 'Registrarme';
  errors: string[] = [];
  formUsuario: FormGroup;
  messageError: string;

  constructor(private usuarioService: UsuarioService,
              private sexoService: SexoService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {

    this.crearFormulario();
    this.cargarUsuario();
  }

  ngOnInit(): void {
    this.listSexos();
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

  listSexos(): void{
    this.sexoService.getSexos().subscribe(
      sexos => this.sexos = sexos['Sexos']
    );
  }

  cargarData(): void{
    this.formUsuario.reset({
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      username: this.usuario.username,
      correo: this.usuario.correo,
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
      correo: ['', [Validators.minLength(10), Validators.maxLength(70)]],
      contrasenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      asegurarContrasenha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      sexo: ['', [Validators.required]],
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

  compareSexo(sexo1: Sexo, sexo2: Sexo): boolean {
    if (sexo1 === undefined && sexo2 === undefined ){
      return true;
    }
    return sexo1 == null || sexo2 == null ? false : sexo1.idSexo === sexo2.idSexo;
  }

}
