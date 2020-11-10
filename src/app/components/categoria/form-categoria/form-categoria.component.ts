import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../../service/categoria.service';
import Swal from 'sweetalert2';
import { Categoria } from 'src/app/model/categoria';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html'
})
export class FormCategoriaComponent implements OnInit {

  categoria: Categoria = new Categoria();
  title = 'Registrar Categoria';
  errors: string[] = [];

  constructor(private categoriaService: CategoriaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCategoria();
  }

  registrarCategoria(): void{
    this.categoriaService.insertarCategoria(this.categoria).subscribe(
      res => {
        this.router.navigate(['/categorias']);
        Swal.fire('Categoria Registrada', `Categoria ${res.nombreCategoria} registrada con éxito`, 'success');
      },
      err => {
        this.errors = err.error.Errores as string[];
      }
    );
  }

  cargarCategoria(): void{
    this.activatedRoute.params.subscribe(param => {
      const id = param['id'];
      if (id){
        this.categoriaService.getCategoria(id).subscribe(
          categoria => this.categoria = categoria
        );
      }
    });
  }

  actualizarCategoria(): void{
    this.categoriaService.actualizarCategoria(this.categoria).subscribe(
      categoria => {
        this.router.navigate(['/categorias']);
        Swal.fire('Categoria actualizada', `${categoria.nombreCategoria} ha sido actualizado`, 'success');
      },
       err => {
         this.errors  = err.error.Errores as string[];
       }
    );
  }

}
