import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IdiomaService } from '../../../service/idioma.service';
import { Idioma } from '../../../model/idioma.model.ts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-idioma',
  templateUrl: './form-idioma.component.html'
})
export class FormIdiomaComponent implements OnInit {

  title = 'Agregar idioma';
  accion = 'agregar';
  formIdioma: FormGroup;
  errors: string[] = [];
  idioma: Idioma = new Idioma();

  constructor(private idiomaService: IdiomaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {

    this.crearFormulario();
    this.cargarIdioma();

    }

  ngOnInit(): void {
  }

  cargarIdioma(): void{
    this.activatedRoute.params.subscribe(param => {
      const id = param['id'];
      if (id){
        this.title = 'Actualizar idioma';
        this.idiomaService.getIdioma(id).subscribe(
          idioma => {
            this.idioma = idioma;
            this.cargarData();
          }
        );
      }
    });
  }

  crearFormulario(): void{
    this.formIdioma = this.fb.group({
      nombreIdioma: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    });
  }

  cargarData(): void{
    this.formIdioma.reset({
      nombreIdioma: this.idioma.nombreIdioma
    });
  }

  registrarIdioma(): void{
    this.idiomaService.agregarIdioma(this.formIdioma.value).subscribe(
      res => {
        this.router.navigate(['/idiomas']);
        Swal.fire('Idioma agregado', `${res.nombreIdioma} agregado con éxito`, 'success');
      },
      err => {
        Swal.fire(err.error.Message, err.error.Error, 'error');
        this.errors = err.error.Errores as string[];
      }
    );
  }

  actualizarIdioma(): void{
    const idioma = this.formIdioma.value as Idioma;
    idioma.idIdioma = this.idioma.idIdioma;
    this.idiomaService.actualizarIdioma(idioma).subscribe(
      res => {
        this.router.navigate(['/idiomas']);
        Swal.fire('Idioma actualizado', `${res.nombreIdioma} actualizado con éxito`, 'success');
      },
      err => {
        this.errors = err.error.Errores as string[];
      }
    );
  }

}
