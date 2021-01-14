import { Component, OnInit } from '@angular/core';
import { AlquilerService } from '../../../service/alquiler.service';
import { AuthService } from '../../../service/auth.service';
import { Alquiler } from '../../../model/alquiler.model';

@Component({
  selector: 'app-mis-alquileres',
  templateUrl: './mis-alquileres.component.html'
})
export class MisAlquileresComponent implements OnInit {

  loading: boolean;
  alquileres: Alquiler[];
  messageError: string;

  constructor(private alquilerService: AlquilerService,
              public authService: AuthService) { }

  ngOnInit(): void {

    this.loading = true;
    this.alquilerService.getAlquileresByUsername(this.authService.getUsuario().username).subscribe(
      alquileres => {
      this.alquileres = alquileres;
      this.loading = false;
      }
    );

  }

}
