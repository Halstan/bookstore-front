import { Component, OnInit } from '@angular/core';
import { Editorial } from '../../../model/editorial';
import { EditorialService } from '../../../service/editorial.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-editorial',
  templateUrl: './form-editorial.component.html'
})
export class FormEditorialComponent implements OnInit {

  editorial: Editorial = new Editorial();
  title = 'Registrar/Editar editorial';
  cantidad: number;
  errors: string[] = [];

  constructor(private editorialService: EditorialService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEditorial();
  }

  registrarEditorial(): void{
    this.editorialService.insertarEdiorial(this.editorial).subscribe(
      res => {
        this.router.navigate(['/editoriales']);
        Swal.fire('Categoria registrada', `${res.nombreEditorial} registrada con éxito`, 'success');
      },
      err => {
        this.errors = err.error.Errores as string[];
      }
    );
  }

  cargarEditorial(): void{
    this.activatedRoute .params.subscribe(param => {
      const id = param['id'];
      if (id){
        this.editorialService.getEditorial(id).subscribe(
          editorial => {
            this.editorial = editorial['Editorial'],
            this.cantidad = editorial['CantidadLibros'];
          }
        );
      }
    });
  }

  actualizarEditorial(): void{
    this.editorialService.actualizarEdiorial(this.editorial).subscribe(
      res => {
        this.router.navigate(['/editoriales']);
        Swal.fire('Categoria actualizada', `${res.nombreEditorial} actualizada con éxito`, 'success');
      },
      err => {
        this.errors = err.error.Errores as string[];
        console.log(err.status);
      }
    );
  }

}
