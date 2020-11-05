import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../../model/categoria';
import { CategoriaService } from '../../service/categoria.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[];
  messageError: string;

  constructor(private categoriaService: CategoriaService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.categoriaService.getCategorias().subscribe(
      categorias => this.categorias = categorias['Categorias']
    );

  }

  eliminarCategoria(categoria: Categoria){

  }

}
