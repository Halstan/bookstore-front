import { Categoria } from './categoria';
import { Editorial } from './editorial';
import { Autor } from './autor';

export class Libro {

    idLibro: number;
    categoria: Categoria;
    editorial: Editorial;
    nombreLibro: string;
    urlPortada: string;
    isbn: string;
    fechaPublicacion: Date;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    precio: number;
    estado: boolean;
    idioma: string;
    autor: Autor;
}
