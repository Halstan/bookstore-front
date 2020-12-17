import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { ValidadorService } from '../../../service/validador.service';
import { RolService } from '../../../service/rol.service';
import { AuthService } from '../../../service/auth.service';
import { Rol } from '../../../model/rol';

@Component({
  selector: 'app-usuario-admin',
  templateUrl: './usuario-admin.component.html'
})
export class UsuarioAdminComponent implements OnInit {

  usuario: Usuario = new Usuario();
  sexos = [`Masculino`, `Femenino`];
  roles: Rol[];
  title = 'Registrarme';
  errors: string[] = [];
  formUsuario: FormGroup;
  messageError: string;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private validadorService: ValidadorService,
              private rolService: RolService,
              public authService: AuthService) {

    this.crearFormulario();
    this.cargarUsuario();
  }

  ngOnInit(): void {
      this.listRoles();
  }

  listRoles(): void{
    this.rolService.getRoles().subscribe(
      roles => this.roles = roles
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
      sexo: this.usuario.sexo,
      roles: this.usuario.roles
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
      roles: ['', ],
    }, {
      validators: [this.validadorService.passwordsIguales('contrasenha', 'asegurarContrasenha')]
    });
  }

  actualizarUsuario(): void{
    const usuario = this.formUsuario.value as Usuario;
    usuario.idUsuario = this.usuario.idUsuario;
    this.usuarioService.actualizarUsuarioAdmin(usuario).subscribe(
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
