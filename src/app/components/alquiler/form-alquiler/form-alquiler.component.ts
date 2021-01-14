import { Component, OnInit } from '@angular/core';
import { AlquilerService } from '../../../service/alquiler.service';
import { UsuarioService } from '../../../service/usuario.service';
import { LibroService } from '../../../service/libro.service';
import { Router } from '@angular/router';
import { Libro } from '../../../model/libro.model';
import { Usuario } from '../../../model/usuario.model';
import { Alquiler } from '../../../model/alquiler.model';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-form-alquiler',
  templateUrl: './form-alquiler.component.html'
})
export class FormAlquilerComponent implements OnInit {

  libros: Libro[];
  usuarios: Usuario[];
  alquiler: Alquiler = new Alquiler();
  title = 'Registrar alquiler';
  errors: string[] = [];
  messageError: string;
  formAlquiler: FormGroup;

  constructor(private alquilerService: AlquilerService,
              private usuarioService: UsuarioService,
              private libroService: LibroService,
              private router: Router,
              private fb: FormBuilder,
              public authService: AuthService) {

    this.crearFormulario();

  }

  ngOnInit(): void {
    this.cargarOpciones();
  }

  registrarAlquiler(): void{
    this.alquilerService.registrarAlquiler(this.formAlquiler.value).subscribe(
      res => {
        this.router.navigate(['/alquileres']);
        Swal.fire('Alquiler registrado', `El alquiler de ${res.usuario.nombre} con el libro ${res.libro.nombreLibro} se ha registrado`, 'success');
      },
      err => {
        this.messageError = err.error.Message;
        this.errors = err.error.Errores as string[];
      }
    );
  }

  cargarOpciones(): void{
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios['Usuarios']);

    this.libroService.getLibrosByEstado(true).subscribe(
      libros => this.libros = libros['Libros'])
  }

  cargarData(): void{
    this.formAlquiler.reset({
      fechaRetorno: this.alquiler.fechaRetorno,
      usuario: this.alquiler.usuario,
      libro: this.alquiler.libro
    });
  }

  crearFormulario(): void{
    this.formAlquiler = this.fb.group({
      fechaRetorno: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      libro: ['', [Validators.required]]
    });
  }

}
