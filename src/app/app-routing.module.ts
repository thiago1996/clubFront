import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodySocioComponent } from './componentes/body-socio/body.socio.component';
import { BodyJugadorComponent } from './componentes/body-jugador/body.jugador.component';
import { BodyEntrenadorComponent } from './componentes/body-entrenador/body.entrenador.component';
import { BodyCategoriaComponent } from './componentes/body-categoria/body.categoria.component';
import { BodyCuotaComponent } from './componentes/body-cuota/body.cuota.component';
import { BodySocioCuotaComponent } from './componentes/body-socio-cuota/body.socioCuota.component';
import { BodyJugadorCuotaComponent } from './componentes/body-jugadorCuota/body.jugadorCuota.component';
import { BodyPagoCuotaEntrenadorComponent } from './componentes/body-pagoCuotaEntrenador/body.pagoCuotaEntrenador.component';
import { BodyCanchaComponent } from './componentes/body-cancha/body.cancha.component';
import { BodyAlquilerCanchaComponent } from './componentes/body-alquilerCancha/body.alquilerCancha.component';
import { BodyPagoServicioComponent } from './componentes/body-pagoServicio/body.pagoServicio.component';
import { BodyPartidoComponent } from './componentes/body-partido/body.partido.component';
import { BodyPartidoIngresosComponent } from './componentes/body-partidoIngresos/body-partidoIngresos.component';
import { BodyPartidoEgresosComponent } from './componentes/body-partidoEgresos/body-partidoEgresos.component';
import { BodyBufeComponent } from './componentes/body-bufe/body.bufe.component';
import { BodyAlquilerBufeComponent } from './componentes/body-alquilerbufe/body.alquilerBufe.component';
import { BodyCuentaComponent } from './componentes/body-cuenta/body.cuenta.component';

const routes: Routes = [
  {path : 'socio/nuevo',component:BodySocioComponent},
  {path : 'jugador/nuevo',component:BodyJugadorComponent},
  {path : 'entrenador/nuevo',component:BodyEntrenadorComponent},
  {path : 'categoria/nuevo',component:BodyCategoriaComponent},
  {path : 'cuota/nuevo',component:BodyCuotaComponent},
  {path : 'socioCuota/nuevo',component:BodySocioCuotaComponent},
  {path : 'jugadorCuota/nuevo',component:BodyJugadorCuotaComponent},
  {path : 'pagoCuotaEntrenador/nuevo',component:BodyPagoCuotaEntrenadorComponent},
  {path : 'cancha/nuevo',component:BodyCanchaComponent},
  {path : 'alquilerCancha/nuevo',component:BodyAlquilerCanchaComponent},
  {path : 'pagoServicio/nuevo',component:BodyPagoServicioComponent},
  {path : 'partido/nuevo',component:BodyPartidoComponent},
  {path : 'partidoIngresos/nuevo',component:BodyPartidoIngresosComponent},
  {path : 'partidoEgresos/nuevo',component:BodyPartidoEgresosComponent},
  {path : 'bufe/nuevo',component:BodyBufeComponent},
  {path : 'alquilerBufe/nuevo',component:BodyAlquilerBufeComponent},
  {path : 'cuenta/nuevo',component:BodyCuentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


