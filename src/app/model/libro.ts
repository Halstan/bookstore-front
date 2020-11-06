import { Categoria } from './categoria';
import { Editorial } from './editorial';
import { Autor } from './autor';
import { Idioma } from './idioma';

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
