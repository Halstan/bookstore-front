import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { AutorComponent } from './components/autor/autor.component';
import { LibroComponent } from './components/libro/libro.component';
import { EditorialComponent } from './components/editorial/editorial.component';

const routes: Routes = [
  {path: 'categorias', component: CategoriaComponent},
  {path: 'autores', component: AutorComponent},
  {path: 'libros', component: LibroComponent},
  {path: 'editoriales', component: EditorialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
