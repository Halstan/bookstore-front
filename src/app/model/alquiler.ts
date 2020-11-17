import { Libro } from './libro';
import { Usuario } from './usuario';

export class Alquiler{

    idAlquiler: number;
    fechaRetorno: Date;
    fechaCreacion: Date;
    estado: boolean;
    usuario: Usuario;
    libro: Libro;

}