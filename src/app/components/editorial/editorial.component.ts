import { Component, OnInit } from '@angular/core';
import { Editorial } from '../../model/editorial';
import { ActivatedRoute } from '@angular/router';
import { EditorialService } from '../../service/editorial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html'
})
export class EditorialComponent implements OnInit {

  editoriales: Editorial[];
  messageError: string;
  cargandoEditorial: boolean;
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

  constructor(private editorialService: EditorialService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargandoEditorial = true;
    this.editorialService.getEditoriales().subscribe(
      editoriales => {
        this.editoriales = editoriales['Editoriales'];
        this.cargandoEditorial = false;
      }
    );

  }

  eliminarEditorial(editorial: Editorial): void{
    this.swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar la editorial ${editorial.nombreEditorial}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.editorialService.eliminarEditorial(editorial.idEditorial).subscribe(
          res => {
            this.editoriales = this.editoriales.filter(au => au !== editorial);
            this.swalWithBootstrapButtons.fire(
              'Editorial eliminada',
              `La editorial ${editorial.nombreEditorial} fue eliminada con exito.`,
              'success'
            );
          }
        );
      }
    });
  }

}
