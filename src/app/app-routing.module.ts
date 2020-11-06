import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { AutorComponent } from './components/autor/autor.component';
import { LibroComponent } from './components/libro/libro.component';
import { EditorialComponent } from './components/editorial/editorial.component';
import { CardComponent } from './components/libro/card/card.component';
import { HomeComponent } from './components/home/home.component';
import { MostrarComponent } from './components/libro/mostrar/mostrar.component';
import { BuscarComponent } from './components/libro/buscar/buscar.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'categorias', component: CategoriaComponent},
  {path: 'autores', component: AutorComponent},

  {path: 'mostrar', component: MostrarComponent},
  {path: 'libros', component: LibroComponent},
  {path: 'libros/buscar', component: BuscarComponent},

  {path: 'editoriales', component: EditorialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
