import { Categoria } from './categoria.model';
import { Editorial } from './editorial.model';
import { Autor } from './autor.model';
import { Idioma } from './idioma.model.ts';

export class Libro {

    idLibro: number;
    categoria: Categoria;
    editorial: Editorial;
    nombreLibro: string;
    descripcion: string;
    urlPortada: string;
    isbn: string;
    fechaPublicacion: Date;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    precio: number;
    estado: boolean;
    idioma: Idioma;
    autor: Autor;
}
