import { Component, OnInit } from '@angular/core';
import { Libro } from '../../../model/libro';
import { LibroService } from '../../../service/libro.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Categoria } from '../../../model/categoria';
import { Editorial } from 'src/app/model/editorial';
import { Idioma } from '../../../model/idioma';
import { Autor } from '../../../model/autor';
import { CategoriaService } from '../../../service/categoria.service';
import { EditorialService } from '../../../service/editorial.service';
import { IdiomaService } from '../../../service/idioma.service';
import { AutorService } from '../../../service/autor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-libro',
  templateUrl: './form-libro.component.html'
})
export class FormLibroComponent implements OnInit {

  libro: Libro = new Libro();
  categorias: Categoria[];
  editoriales: Editorial[];
  idiomas: Idioma[];
  autores: Autor[];
  title = 'Registrar Libro';
  errors: string[] = [];
  messageError: string;
  portada: string;
  formLibro: FormGroup;

  constructor(private libroService: LibroService,
              private categoriaService: CategoriaService,
              private editorialService: EditorialService,
              private idiomaService: IdiomaService,
              private autorService: AutorService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {

    this.crearFormulario();
    this.cargarLibro();
  }

  ngOnInit(): void {
    this.listIdiomas();
    this.listCategorias();
    this.listEditoriales();
    this.listAutores();
    this.cargarData();
  }

  listIdiomas(): void{
    this.idiomaService.getIdiomas().subscribe(
      idiomas => {
        this.idiomas = idiomas;
      }
    );
  }

  listCategorias(): void{
    this.categoriaService.getCategorias().subscribe(
      categorias => {
        this.categorias = categorias['Categorias']
      }
    );
  }

  listEditoriales(): void{
    this.editorialService.getEditoriales().subscribe(
      editoriales => this.editoriales = editoriales['Editoriales']
    );
  }

  listAutores(): void{
    this.autorService.getAutores().subscribe(
      autores => this.autores = autores
    );
  }

  registrarLibro(): void{
    this.libroService.insertarLibro(this.formLibro.value).subscribe(
      res => {
        this.router.navigate(['/libros']);
        Swal.fire('Libro registrado', `El libro ${res.nombreLibro} ha sido registrado con éxito`, 'success');
      },
      err => {
        this.messageError = err.error.Message;
        this.errors = err.error.Errores as string[];
      }
    );
  }

  cargarLibro(): void{
    this.activatedRoute.params.subscribe(param => {
      const id = param['id'];
      if (id){
        this.title = 'Editar Libro';
        this.libroService.getLibro(id).subscribe(
          libro => {
            this.libro = libro;
            this.portada = libro.urlPortada;
            this.cargarData();
          }
        );
      }
    });
  }

  cargarData(): void{
    // POR SEACA
    this.formLibro.patchValue({
      nombreLibro: this.libro.nombreLibro,
      isbn: this.libro.isbn,
      descripcion: this.libro.descripcion,
      urlPortada: this.libro.urlPortada,
      precio: this.libro.precio,
      categoria: this.libro.categoria,
      editorial: this.libro.editorial,
      idioma:  this.libro.idioma,
      autor: this.libro.autor,
      fechaPublicacion: this.libro.fechaPublicacion
    });
  }

  crearFormulario(): void{
    this.formLibro = this.fb.group({
      nombreLibro: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      isbn: ['', [Validators.required, Validators.maxLength(30)]],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      urlPortada: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(150)]],
      precio: ['', [Validators.maxLength(5)]],
      categoria: ['', [Validators.required]],
      editorial: ['', [Validators.required]],
      idioma: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      fechaPublicacion: ['', [Validators.required]]
    });
  }

  actualizarLibro(): void{
    const libro = this.formLibro.value as Libro;
    libro.idLibro = this.libro.idLibro;
    this.libroService.actualizarLibro(libro).subscribe(
      res => {
        this.router.navigate(['/libros']);
        Swal.fire('Libro actualizado', `${libro.nombreLibro} ha sido actualizado con éxito`, 'success');
      },
      err => {
        this.messageError = err.error.Message;
        this.errors = err.error.Errores as string[];
      }
    );
  }

  compararIdioma(idioma1: any, idioma2: any): boolean {
    if (idioma1 === undefined && idioma2 === undefined ){
      return true;
    }
    return idioma1 == null || idioma2 == null ? false : idioma1.idIdioma === idioma2.idIdioma;
  }

  compararCategoria(categoria1: Categoria, categoria2: Categoria): boolean {
    if (categoria1 === undefined && categoria2 === undefined ){
      return true;
    }
    return categoria1 == null || categoria2 == null ? false : categoria1.idCategoria === categoria2.idCategoria;
  }

  compareEditorial(editorial1: Editorial, editorial2: Editorial): boolean {
    if (editorial1 === undefined && editorial2 === undefined ){
      return true;
    }
    return editorial1 == null || editorial2 == null ? false : editorial1.idEditorial === editorial2.idEditorial;
  }

  compareAutor(autor1: Autor, autor2: Autor): boolean {
    if (autor1 === undefined && autor2 === undefined ){
      return true;
    }
    return autor1 == null || autor2 == null ? false : autor1.idAutor === autor2.idAutor;
  }

}
