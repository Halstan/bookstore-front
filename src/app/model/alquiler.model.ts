import { Libro } from './libro.model';
import { Usuario } from './usuario.model';
import { DetalleAlquiler } from './detalleAlquiler.model';

export class Alquiler{

    idAlquiler: number;
    fechaRetorno: Date;
    fechaCreacion: Date;
    estado: boolean;
    usuario: Usuario;
    libro: Libro;
    detalleAlquiler: DetalleAlquiler;

}
