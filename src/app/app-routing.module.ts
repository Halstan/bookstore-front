import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { AutorComponent } from './components/autor/autor.component';
import { LibroComponent } from './components/libro/libro.component';
import { EditorialComponent } from './components/editorial/editorial.component';
import { HomeComponent } from './components/home/home.component';
import { MostrarComponent } from './components/libro/mostrar/mostrar.component';
import { MostrarAutorComponent } from './components/autor/mostrar-autor/mostrar-autor.component';
import { FormAutorComponent } from './components/autor/form-autor/form-autor.component';
import { FormCategoriaComponent } from './components/categoria/form-categoria/form-categoria.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},

  {path: 'categorias', component: CategoriaComponent},
  {path: 'categorias/form', component: FormCategoriaComponent},
  {path: 'categorias/form/:id', component: FormCategoriaComponent},

  {path: 'autores/mostrar', component: MostrarAutorComponent},
  {path: 'autores/form', component: FormAutorComponent},
  {path: 'autores/form/:id', component: FormAutorComponent},
  {path: 'autores', component: AutorComponent},

  {path: 'libros/mostrar', component: MostrarComponent},
  {path: 'libros', component: LibroComponent},

  {path: 'editoriales', component: EditorialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
