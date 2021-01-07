import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../service/libro.service';
import SwiperCore, { Virtual, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/core';
import { Libro } from '../../model/libro';
SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, A11y, Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  libros: Libro[];
  cargando: boolean;
  title = 'Bienvenido a la biblioteca Rikazzo';

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.libroService.getLibros().subscribe(
      libros => {
        this.libros = libros;
        this.cargando = false;
      }
    );
  }

}
