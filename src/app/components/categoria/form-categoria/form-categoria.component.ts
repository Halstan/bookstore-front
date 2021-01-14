import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../../service/categoria.service';
import Swal from 'sweetalert2';
import { Categoria } from 'src/app/model/categoria.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html'
})
export class FormCategoriaComponent implements OnInit {

  formCategoria: FormGroup;
  categoria: Categoria = new Categoria();
  title = 'Registrar Categoria';
  errors: string[] = [];
  messageError: string;

  constructor(private categoriaService: CategoriaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {

    this.crearFormulario();
    this.cargarCategoria();

  }

  ngOnInit(): void {
  }

  registrarCategoria(): void{
    this.categoriaService.insertarCategoria(this.formCategoria.value).subscribe(
      res => {
        this.router.navigate(['/categorias']);
        Swal.fire('Categoria Registrada', `Categoria ${res.nombreCategoria} registrada con éxito`, 'success');
      },
      err => {
        this.messageError = err.error.Message;
        this.errors = err.error.Errores as string[];
      }
    );
  }

  crearFormulario(): void{
    this.formCategoria = this.fb.group({
      nombreCategoria: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]]
    });
  }

  cargarData(): void{
    this.formCategoria.reset({
      nombreCategoria: this.categoria.nombreCategoria
    });
  }

  cargarCategoria(): void{
    this.activatedRoute.params.subscribe(param => {
      const id = param['id'];
      if (id){
        this.title = 'Editar categoria';
        this.categoriaService.getCategoria(id).subscribe(
          categoria => {
            this.categoria = categoria;
            this.cargarData();
          }
        );
      }
    });
  }

  actualizarCategoria(): void{
    const categoria = this.formCategoria.value as Categoria;
    categoria.idCategoria = this.categoria.idCategoria;
    this.categoriaService.actualizarCategoria(categoria).subscribe(
      res => {
        this.router.navigate(['/categorias']);
        Swal.fire('Categoria actualizada', `${res.nombreCategoria} ha sido actualizado`, 'success');
      },
       err => {
         this.messageError = err.error.Message;
         this.errors  = err.error.Errores as string[];
       }
    );
  }

}
