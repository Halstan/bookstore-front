import { Sexo } from './sexo';

export class Usuario{

    idUsuario: number;
    nombre: string;
    apellido: string;
    contrasenha: string;
    asegurarContrasenha: string;
    activado: boolean;
    fechaCreacion: Date;
    sexo: Sexo;

}