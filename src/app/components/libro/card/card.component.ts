import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent {

  @Input() items: any[] = [];

  constructor() { }

  mostrarLibro(item: any): void{

    let nombreLibro;

    if (item.type === 'libro'){
      nombreLibro = item.id;
    }

  }

}
