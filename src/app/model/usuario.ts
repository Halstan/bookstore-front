import { Sexo } from './sexo';
import { Rol } from './rol';

export class Usuario{

    idUsuario: number;
    nombre: string;
    apellido: string;
    username: string;
    contrasenha: string;
    asegurarContrasenha: string;
    activado: boolean;
    fechaCreacion: Date;
    sexo: Sexo;
    roles: Rol[];

}
