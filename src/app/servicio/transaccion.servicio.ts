import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaccion } from '../modelo/Transaccion';
import { Partido } from '../modelo/Partido';

@Injectable({
  providedIn: 'root'
})
export class TransaccionServicio {

  rutaglobal = 'http://localhost:8080/transaccion/';
  constructor(private http:HttpClient) {

   }

//Crear transaccion
crearTransaccion(transaccion: Transaccion){

  return this.http.post<Transaccion>(this.rutaglobal + 'nueva', transaccion, {
    observe: 'response'
  });
}

 //Obtener transacciones
mostrarTransacciones(){
return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrar');
}

mostrarTransaccionesPorPartido(partido:Partido){
  return this.http.post<Transaccion[]>(this.rutaglobal + 'mostrarPorPartido', partido);
}

mostrarTransaccionesPorPartidoYTipo(partido:Partido, tipo:String){
  return this.http.post<Transaccion[]>(this.rutaglobal + 'mostrarPorPartidoYTipo/'+tipo, partido);
}

mostrarTransaccionesPorIdAlquilerBufe(idAlquilerBufe:number ){
  return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarPorIdAlquilerBufe/'+idAlquilerBufe);
}

mostrarTransaccionesPorIdAlquilerCancha(idAlquilerCancha:number ){
  return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarPorIdAlquilerCancha/'+idAlquilerCancha);
}

mostrarTransaccionesPorJugadorYCuota(documento:number, idCuota:number){
  return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarPorDocumentoJugadorIdCuota/'+documento+'/'+idCuota);
}

mostrarTransaccionesPorEntrenadorYCuota(documento:number, idCuota:number){
  return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarPorDocumentoEntrenadorIdCuota/'+documento+'/'+idCuota);
}
mostrarTransaccionesPorSocioYCuota(documento:number, idCuota:number){
  return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarPorDocumentoSocioIdCuota/'+documento+'/'+idCuota);
}

mostrarTransaccionesPorIdPagoServicio(idPagoServicio:number ){
  return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarPorIdPagoServicio/'+idPagoServicio);
}

//Eliminar transacciones
eliminarTransaccion(id: number){

return this.http.post<void>(this.rutaglobal + id, {
  observe:'response'
});
}

  //Actualizar transaccion
modificarTransaccion(transaccion: Transaccion){

return this.http.post<Transaccion>(this.rutaglobal + 'modificar', transaccion, {
  observe: 'response'
});
}

mostrarTransaccionesCuotaJugador(){
return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarTransaccionesCuotaJugador');
  }

mostrarTransaccionesCuotaEntrenador(){
return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarTransaccionesCuotaEntrenador');
    }

mostrarTransaccionesCuotaSocio(){
return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarTransaccionesCuotaSocio');
      }
  
mostrarTransaccionesPagoServicio(){
return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarTransaccionesPagoServicio');
        }
    
mostrarTransaccionesPartidoIngreso(){
return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarTransaccionesPartidoIngreso');
          }

 mostrarTransaccionesPartidoEgreso(){
return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarTransaccionesPartidoEgreso');
          }

mostrarTransaccionesAlquilerCancha(){
  return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarTransaccionesAlquilerCancha');
            }

mostrarTransaccionesAlquilerBufe(){
              return this.http.get<Transaccion[]>(this.rutaglobal + 'mostrarTransaccionesAlquilerBufe');
              }
}
