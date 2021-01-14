import { Component, OnInit } from '@angular/core';
import { Autor } from '../../../model/autor.model';
import { AutorService } from '../../../service/autor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-autor',
  templateUrl: './form-autor.component.html'
})
export class FormAutorComponent implements OnInit {

  autor: Autor = new Autor();
  title = 'Registrar Autor';
  errors: string[] = [];
  formAutor: FormGroup;
  messageError: string;

  constructor(private autorService: AutorService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {

    this.crearFormulario();
    this.cargarAutor();

  }

  ngOnInit(): void {
  }

  registrarAutor(): void{
    this.autorService.insertarAutor(this.formAutor.value).subscribe(
      res => {
        this.router.navigate(['/autores']);
        Swal.fire('Autor registrado', `Autor ${res.nombreAutor} registrado con éxito`, 'success');
      },
      err => {
        this.messageError = err.error.Message;
        this.errors = err.error.Errores as string[];
      }
    );
  }

  cargarAutor(): void{
    this.activatedRoute.params.subscribe(param => {
      const id = param?.id;
      if (id){
        this.title = 'Editar autor';
        this.autorService.getAutor(id).subscribe(
          autor => {
            this.autor = autor;
            this.cargarData();
          }
        );
      }
    });
  }

  cargarData(): void{
    this.formAutor.reset({
      nombreAutor: this.autor.nombreAutor,
      urlFoto: this.autor.urlFoto,
      apellido: this.autor.apellido,
      biografia: this.autor.biografia,
      fechaNacimiento: this.autor.fechaNacimiento
    });
  }

  crearFormulario(): void{
    this.formAutor = this.fb.group({
      nombreAutor: ['', [Validators.required, Validators.maxLength(40)]],
      urlFoto: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(160)]],
      apellido: ['', [Validators.required, Validators.maxLength(40)]],
      biografia: ['', [Validators.minLength(20), Validators.maxLength(300)]],
      fechaNacimiento: ['', [Validators.required]]
    });
  }

  actualizarAutor(): void{
    const autor = this.formAutor.value as Autor;
    autor.idAutor = this.autor.idAutor;
    this.autorService.actualizarAutor(autor).subscribe(
      res => {
        this.router.navigate(['/autores']);
        Swal.fire('Autor actualizado', `${res.nombreAutor} ${res.apellido} ha sido actualizado con éxito`, 'success');
      },
      err => {
        this.messageError = err.error.Message;
        this.errors = err.error.Errores as string[];
      }
    );
  }

}
