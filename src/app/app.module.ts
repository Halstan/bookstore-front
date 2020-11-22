import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecuredomPipe } from './pipes/securedom.pipe';
import { AutorComponent } from './components/autor/autor.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { LibroComponent } from './components/libro/libro.component';
import { EditorialComponent } from './components/editorial/editorial.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/libro/card/card.component';
import localEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutorService } from './service/autor.service';
import { CategoriaService } from './service/categoria.service';
import { EditorialService } from './service/editorial.service';
import { LibroService } from './service/libro.service';
import { MostrarComponent } from './components/libro/mostrar/mostrar.component';
import { MostrarAutorComponent } from './components/autor/mostrar-autor/mostrar-autor.component';
import { FormAutorComponent } from './components/autor/form-autor/form-autor.component';
import { FormCategoriaComponent } from './components/categoria/form-categoria/form-categoria.component';
import { FormEditorialComponent } from './components/editorial/form-editorial/form-editorial.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioService } from './service/usuario.service';
import { FormUsuarioComponent } from './components/usuario/form-usuario/form-usuario.component';
import { SexoService } from './service/sexo.service';
import { FormLibroComponent } from './components/libro/form-libro/form-libro.component';
import { IdiomaService } from './service/idioma.service';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { AlquilerService } from './service/alquiler.service';
import { FormAlquilerComponent } from './components/alquiler/form-alquiler/form-alquiler.component';
import { IdiomaComponent } from './components/idioma/idioma.component';
import { FormIdiomaComponent } from './components/idioma/form-idioma/form-idioma.component';

registerLocaleData(localEs);
@NgModule({
  declarations: [
    AppComponent,
    SecuredomPipe,
    AutorComponent,
    CategoriaComponent,
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    LibroComponent,
    EditorialComponent,
    CardComponent,
    HomeComponent,
    MostrarComponent,
    MostrarAutorComponent,
    FormAutorComponent,
    FormCategoriaComponent,
    FormEditorialComponent,
    UsuarioComponent,
    FormUsuarioComponent,
    FormLibroComponent,
    AlquilerComponent,
    FormAlquilerComponent,
    IdiomaComponent,
    FormIdiomaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    AutorService,
    CategoriaService,
    EditorialService,
    LibroService,
    UsuarioService,
    SexoService,
    IdiomaService,
    AlquilerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
