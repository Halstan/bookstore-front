import { Component, OnInit } from '@angular/core';
import { Editorial } from '../../../model/editorial';
import { EditorialService } from '../../../service/editorial.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-editorial',
  templateUrl: './form-editorial.component.html'
})
export class FormEditorialComponent implements OnInit {

  editorial: Editorial = new Editorial();
  title = 'Registrar editorial';
  formEditorial: FormGroup;
  cantidad: number;
  errors: string[] = [];

  constructor(private editorialService: EditorialService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {

    this.crearFormulario();
    this.cargarEditorial();

    }

  ngOnInit(): void {
  }

  registrarEditorial(): void{
    this.editorialService.insertarEdiorial(this.formEditorial.value).subscribe(
      res => {
        this.router.navigate(['/editoriales']);
        Swal.fire('Categoria registrada', `${res.nombreEditorial} registrada con éxito`, 'success');
      },
      err => {
        this.errors = err.error.Errores as string[];
      }
    );
  }

  crearFormulario(): void{
    this.formEditorial = this.fb.group({
      nombreEditorial: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      fundador: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      fechaFundacion: ['', Validators.required],
    });
  }

  cargarData(): void{
    this.formEditorial.reset({
      nombreEditorial: this.editorial.nombreEditorial,
      fundador: this.editorial.fundador,
      fechaFundacion: this.editorial.fechaFundacion
    });
  }

  cargarEditorial(): void{
    this.activatedRoute.params.subscribe(param => {
      const id = param['id'];
      if (id){
        this.title = 'Editar editorial';
        this.editorialService.getEditorial(id).subscribe(
          editorial => {
            this.editorial = editorial['Editorial'],
            this.cantidad = editorial['CantidadLibros'];
            this.cargarData();
          }
        );
      }
    });
  }

  actualizarEditorial(): void{
    const editorial = this.formEditorial.value as Editorial;
    editorial.idEditorial = this.editorial.idEditorial;
    this.editorialService.actualizarEdiorial(editorial).subscribe(
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
