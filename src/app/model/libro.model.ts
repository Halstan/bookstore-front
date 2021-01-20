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
    portada: string;
    isbn: string;
    fechaPublicacion: Date;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    precio: number;
    fechaVigencia: Date;
    estado: boolean;
    idioma: Idioma;
    autor: Autor;
}
