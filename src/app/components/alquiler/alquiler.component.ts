import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alquiler } from '../../model/alquiler.model';
import { AlquilerService } from '../../service/alquiler.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html'
})
export class AlquilerComponent implements OnInit {

  alquileres: Alquiler[];
  error: boolean;
  cargandoAlquiler: boolean;
  messageError: string;
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    backdrop: `
    rgba(179,214,249,0.2)
    `,
    buttonsStyling: false
  });

  constructor(private alquilerService: AlquilerService,
              public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.cargandoAlquiler = true;
    this.alquilerService.getAlquileres().subscribe(
      alquileres => {
        this.alquileres = alquileres;
        this.cargandoAlquiler = false;
      });
  }

  desactivarAlquiler(alquiler: Alquiler): void {
    this.swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea desactivar el alquiler de ${alquiler.usuario.nombre} ${alquiler.usuario.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.alquilerService.desactivarAlquiler(alquiler.idAlquiler).subscribe(
          res => {
            this.swalWithBootstrapButtons.fire(
              'Alquiler eliminado',
              `El alquiler de ${alquiler.usuario.nombre} ${alquiler.usuario.apellido} fue cancelado con exito.`,
              'success'
            );
            this.router.navigate(['/alquileres'])
              .then(() => {
                window.location.reload();
          });
          },
        );
      }
    });
  }

  eliminarAlquiler(alquiler: Alquiler): void {
    this.swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar el alquiler de ${alquiler.usuario.nombre} ${alquiler.usuario.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.alquilerService.eliminarAlquiler(alquiler.idAlquiler).subscribe(
          res => {
            this.alquileres = this.alquileres.filter(au => au !== alquiler);
            this.swalWithBootstrapButtons.fire(
              'Alquiler eliminado',
              `El alquiler de ${alquiler.usuario.nombre} ${alquiler.usuario.apellido} fue eliminado con exito.`,
              'success'
            );
          }
        );
      }
    });
  }

}
