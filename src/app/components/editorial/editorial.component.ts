import { Component, OnInit } from '@angular/core';
import { Editorial } from '../../model/editorial';
import { ActivatedRoute } from '@angular/router';
import { EditorialService } from '../../service/editorial.service';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html'
})
export class EditorialComponent implements OnInit {

  editoriales: Editorial[];
  messageError: string;

  constructor(private editorialService: EditorialService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.editorialService.getEditoriales().subscribe(
      editoriales => this.editoriales = editoriales['Editoriales']
    );

  }

  eliminarEditorial(editorial: Editorial){
    
  }

}
