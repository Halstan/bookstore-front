import { Component, OnInit } from '@angular/core';
import { AlquilerService } from '../../../service/alquiler.service';
import { UsuarioService } from '../../../service/usuario.service';
import { LibroService } from '../../../service/libro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from '../../../model/libro';
import { Usuario } from '../../../model/usuario';
import { Alquiler } from '../../../model/alquiler';
import Swal from 'sweetalert2';

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

  constructor(private alquilerService: AlquilerService,
              private usuarioService: UsuarioService,
              private libroService: LibroService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarOpciones();
  }

  registrarAlquiler(): void{
    this.alquilerService.registrarAlquiler(this.alquiler).subscribe(
      res => {
        this.router.navigate(['/alquileres']);
        Swal.fire('Alquiler registrado', `El alquiler de ${res.usuario.nombre} con el libro ${res.libro.nombreLibro} se ha registrado`, 'success');
      },
      err => {
        this.errors = err.error.Errores as string[];
      }
    );
  }

  cargarOpciones(): void{
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios['Usuarios']);

    this.libroService.getLibros().subscribe(
      libros => this.libros = libros['Libros'])
  }

}
