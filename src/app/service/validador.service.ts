import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../model/usuario';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService) { }

  passwordsIguales(pass1: string, pass2: string){

    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if (pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }

    };

  }

}
