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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardComponent } from './components/libro/card/card.component';
import localEs from '@angular/common/locales/es';
import { CommonModule, registerLocaleData } from '@angular/common';
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
import { FormLibroComponent } from './components/libro/form-libro/form-libro.component';
import { IdiomaService } from './service/idioma.service';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { AlquilerService } from './service/alquiler.service';
import { FormAlquilerComponent } from './components/alquiler/form-alquiler/form-alquiler.component';
import { IdiomaComponent } from './components/idioma/idioma.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { SwiperModule } from 'node_modules/swiper/angular';
import { FormIdiomaComponent } from './components/idioma/form-idioma/form-idioma.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthService } from './service/auth.service';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { AuthInterceptor } from './interceptors/token/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { MisAlquileresComponent } from './components/alquiler/mis-alquileres/mis-alquileres.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { UsuarioAdminComponent } from './components/usuario/usuario-admin/usuario-admin.component';
import { RolService } from './service/rol.service';
import { MatNativeDateModule } from '@angular/material/core';
import { LazyImageDirective } from './directives/lazy-image.directive';

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
    FormIdiomaComponent,
    LoginComponent,
    MisAlquileresComponent,
    PerfilComponent,
    UsuarioAdminComponent,
    LazyImageDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    SwiperModule,
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AutorService,
    CategoriaService,
    EditorialService,
    LibroService,
    UsuarioService,
    IdiomaService,
    AlquilerService,
    AuthService,
    RolService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
