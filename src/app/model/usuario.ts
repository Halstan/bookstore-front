
export class Usuario{

    idUsuario: number;
    nombre: string;
    apellido: string;
    username: string;
    correo: string;
    contrasenha: string;
    asegurarContrasenha: string;
    activado: boolean;
    fechaModificacion: Date;
    sexo: string;
    roles: string[] = [];

}
