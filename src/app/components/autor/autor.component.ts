import { Component, OnInit } from '@angular/core';
import { Autor } from '../../model/autor';
import { ActivatedRoute } from '@angular/router';
import { AutorService } from '../../service/autor.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {

  autores: Autor[];
  messageError: string;

  constructor(private autorService: AutorService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.autorService.getAutores().subscribe(
      autores => this.autores = autores
    );
  }

  eliminarAutor(autor: Autor){

  }

}
