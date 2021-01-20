import { Libro } from './libro.model';
import { Usuario } from './usuario.model';
export class Alquiler{

    idAlquiler: number;
    fechaRetorno: Date;
    fechaCreacion: Date;
    estado: boolean;
    precio: number;
    usuario: Usuario;
    libro: Libro;

}
