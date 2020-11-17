import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alquiler } from '../../model/alquiler';
import { AlquilerService } from '../../service/alquiler.service';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html'
})
export class AlquilerComponent implements OnInit {

  alquileres: Alquiler[];
  cargandoAlquiler: boolean;
  messageError: string;

  constructor(private alquilerService: AlquilerService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargandoAlquiler = true;
    this.alquilerService.getAlquileres().subscribe(
      alquileres => {
        this.alquileres = alquileres;
        this.cargandoAlquiler = false;
        console.log(this.alquileres);
    });
  }

}
