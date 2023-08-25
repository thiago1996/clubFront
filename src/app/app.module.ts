import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BodySocioComponent } from './componentes/body-socio/body.socio.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { BodyJugadorComponent } from './componentes/body-jugador/body.jugador.component';
import { BodyEntrenadorComponent } from './componentes/body-entrenador/body.entrenador.component';
import { BodyCategoriaComponent } from './componentes/body-categoria/body.categoria.component';
import { BodyCuotaComponent } from './componentes/body-cuota/body.cuota.component';
import { BodySocioCuotaComponent } from './componentes/body-socio-cuota/body.socioCuota.component';
import { BodyJugadorCuotaComponent } from './componentes/body-jugadorCuota/body.jugadorCuota.component';
import { BodyPagoCuotaEntrenadorComponent } from './componentes/body-pagoCuotaEntrenador/body.pagoCuotaEntrenador.component';
import { FiltrarPersonaPipe } from './pipes/filtrar-persona.pipe';
import { FiltrarCategoriaPipe } from './pipes/filtrar-categoria.pipe';
import { FiltrarCuotaPipe } from './pipes/filtrar-cuota.pipe';
import { FiltrarPagoCuotaPipe } from './pipes/filtrar-pagoCuota.pipe';
import { FiltrarEntrenadorPipe } from './pipes/filtrar-entrenador.pipe';
import { BodyCanchaComponent } from './componentes/body-cancha/body.cancha.component';
import { BodyAlquilerCanchaComponent } from './componentes/body-alquilerCancha/body.alquilerCancha.component';
import { FiltrarAlquilerCanchaPipe } from './pipes/filtrar-alquilerCancha.pipe';
import { BodyPagoServicioComponent } from './componentes/body-pagoServicio/body.pagoServicio.component';
import { FiltrarPagoServicioPipe } from './pipes/filtrar-pagoServicio.pipe';
import { BodyPartidoComponent } from './componentes/body-partido/body.partido.component';
import { FiltrarPartidoPipe } from './pipes/filtrar-partido.pipe';
import { BodyPartidoIngresosComponent } from './componentes/body-partidoIngresos/body-partidoIngresos.component';
import { BodyPartidoEgresosComponent } from './componentes/body-partidoEgresos/body-partidoEgresos.component';
import { BodyBufeComponent } from './componentes/body-bufe/body.bufe.component';
import { BodyAlquilerBufeComponent } from './componentes/body-alquilerbufe/body.alquilerBufe.component';
import { FiltrarAlquilerBufePipe } from './pipes/filtrar-alquilerBufe.pipe';
import { BodyCuentaComponent } from './componentes/body-cuenta/body.cuenta.component';


@NgModule({
  declarations: [
    AppComponent,
    BodySocioComponent,
    BodyJugadorComponent,
    BodyEntrenadorComponent,
    BodyCategoriaComponent,
    BodyCuotaComponent,
    BodySocioCuotaComponent,
    BodyJugadorCuotaComponent,
    BodyPagoCuotaEntrenadorComponent,
    FiltrarPersonaPipe,
    FiltrarCategoriaPipe,
    FiltrarCuotaPipe,
    FiltrarPagoCuotaPipe,
    FiltrarEntrenadorPipe,
    BodyCanchaComponent,
    BodyAlquilerCanchaComponent,
    FiltrarAlquilerCanchaPipe,
    BodyPagoServicioComponent,
    FiltrarPagoServicioPipe,
    BodyPartidoComponent,
    FiltrarPartidoPipe,
    BodyPartidoIngresosComponent,
    BodyPartidoEgresosComponent,
    BodyBufeComponent,
    BodyAlquilerBufeComponent,
    FiltrarAlquilerBufePipe,
    BodyCuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    BrowserAnimationsModule,
    MenuModule,
    MenubarModule,
    CalendarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
