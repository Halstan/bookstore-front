import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../../model/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[];
  messageError: string;
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    backdrop: `
    rgba(179,214,249,0.2)
    `,
    buttonsStyling: false
  });

  constructor(private categoriaService: CategoriaService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias['Categorias']
    );

  }

  eliminarCategoria(categoria: Categoria): void{
    this.swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar la categoria ${categoria.nombreCategoria}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategorias(categoria.idCategoria).subscribe(
          res => {
            this.categorias = this.categorias.filter(au => au !== categoria);
            this.swalWithBootstrapButtons.fire(
              'Categoria eliminada',
              `La categoria ${categoria.nombreCategoria} fue eliminada con exito.`,
              'success'
            );
          }
        );
      }
    });
  }

}
