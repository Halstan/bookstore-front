import { Component, OnInit } from '@angular/core';
import { Autor } from '../../../model/autor';
import { AutorService } from '../../../service/autor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-autor',
  templateUrl: './form-autor.component.html'
})
export class FormAutorComponent implements OnInit {

  autor: Autor = new Autor();
  title = 'Registrar Autor';
  errors: string[] = [];

  constructor(private autorService: AutorService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarAutor();
  }

  registrarAutor(): void{
    this.autorService.insertarAutor(this.autor).subscribe(
      res => {
        this.router.navigate(['/autores']);
        Swal.fire('Autor registrado', `Autor ${res.nombreAutor} registrado con éxito`, 'success');
      },
      err => {
        this.errors = err.error.Errores as string[];
        console.log(err.status);
        console.log(err.err.Errores);
      }
    );
  }

  cargarAutor(): void{
    this.activatedRoute.params.subscribe(param => {
      const id = param['id'];
      if (id){
        this.autorService.getAutor(id).subscribe(
          autor => this.autor = autor
        );
      }
    });
  }

  actualizarAutor(): void{
    this.autorService.actualizarAutor(this.autor).subscribe(
      autor => {
        this.router.navigate(['/autores']);
        Swal.fire('Autor actualizado', `${autor.nombreAutor} ${autor.apellido} ha sido actualizado con éxito`, 'success');
      },
      err => {
        this.errors = err.error.Errores as string[];
        //Swal.fire('Error', `Error al actualizar ${this.errors}`, 'error');
      }
    );
  }

}
