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
import { NavMenuAdministradorComponent } from './componentes/navMenuAdministrador/navMenuAdministrador.component';
import { NavMenuInvitadoComponent } from './componentes/navMenuInvitado/navMenuInvitado.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { LoginComponent } from './componentes/login/login.component';
import { BodyTransaccionComponent } from './componentes/body-transaccion/body-transaccion.component';

const routes: Routes = [
  {path : '',component:LoginComponent},
  {path : 'homeAdministrador',component:NavMenuAdministradorComponent},
  {path : 'homeInvitado',component:NavMenuInvitadoComponent},
  {path : 'homeAdministrador/socio/nuevo',component:BodySocioComponent},
  {path : 'homeAdministrador/jugador/nuevo',component:BodyJugadorComponent},
  {path : 'homeAdministrador/entrenador/nuevo',component:BodyEntrenadorComponent},
  {path : 'homeAdministrador/categoria/nuevo',component:BodyCategoriaComponent},
  {path : 'homeAdministrador/cuota/nuevo',component:BodyCuotaComponent},
  {path : 'homeAdministrador/socioCuota/nuevo',component:BodySocioCuotaComponent},
  {path : 'homeAdministrador/jugadorCuota/nuevo',component:BodyJugadorCuotaComponent},
  {path : 'homeAdministrador/pagoCuotaEntrenador/nuevo',component:BodyPagoCuotaEntrenadorComponent},
  {path : 'homeAdministrador/cancha/nuevo',component:BodyCanchaComponent},
  {path : 'homeAdministrador/alquilerCancha/nuevo',component:BodyAlquilerCanchaComponent},
  {path : 'homeAdministrador/pagoServicio/nuevo',component:BodyPagoServicioComponent},
  {path : 'homeAdministrador/partido/nuevo',component:BodyPartidoComponent},
  {path : 'homeAdministrador/partidoIngresos/nuevo',component:BodyPartidoIngresosComponent},
  {path : 'homeAdministrador/partidoEgresos/nuevo',component:BodyPartidoEgresosComponent},
  {path : 'homeAdministrador/bufe/nuevo',component:BodyBufeComponent},
  {path : 'homeAdministrador/alquilerBufe/nuevo',component:BodyAlquilerBufeComponent},
  {path : 'homeAdministrador/cuenta/nuevo',component:BodyCuentaComponent},
  {path : 'homeAdministrador/usuario/nuevo',component:UsuarioComponent},
  {path : 'homeAdministrador/transaccion',component:BodyTransaccionComponent},
  {path : 'homeInvitado/socio/nuevo',component:BodySocioComponent},
  {path : 'homeInvitado/jugador/nuevo',component:BodyJugadorComponent},
  {path : 'homeInvitado/entrenador/nuevo',component:BodyEntrenadorComponent},
  {path : 'homeInvitado/categoria/nuevo',component:BodyCategoriaComponent},
  {path : 'homeInvitado/cuota/nuevo',component:BodyCuotaComponent},
  {path : 'homeInvitado/socioCuota/nuevo',component:BodySocioCuotaComponent},
  {path : 'homeInvitado/jugadorCuota/nuevo',component:BodyJugadorCuotaComponent},
  {path : 'homeInvitado/pagoCuotaEntrenador/nuevo',component:BodyPagoCuotaEntrenadorComponent},
  {path : 'homeInvitado/cancha/nuevo',component:BodyCanchaComponent},
  {path : 'homeInvitado/alquilerCancha/nuevo',component:BodyAlquilerCanchaComponent},
  {path : 'homeInvitado/pagoServicio/nuevo',component:BodyPagoServicioComponent},
  {path : 'homeInvitado/partido/nuevo',component:BodyPartidoComponent},
  {path : 'homeInvitado/partidoIngresos/nuevo',component:BodyPartidoIngresosComponent},
  {path : 'homeInvitado/partidoEgresos/nuevo',component:BodyPartidoEgresosComponent},
  {path : 'homeInvitado/bufe/nuevo',component:BodyBufeComponent},
  {path : 'homeInvitado/alquilerBufe/nuevo',component:BodyAlquilerBufeComponent},
  {path : 'homeInvitado/transaccion',component:BodyTransaccionComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


