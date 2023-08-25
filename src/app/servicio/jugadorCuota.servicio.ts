import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuota } from '../modelo/Cuota';
import { JugadorCuota} from '../modelo/JugadorCuota';
import { Jugador } from '../modelo/Jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadorCuotaServicio {

  rutaglobal = 'http://localhost:8080/jugadorCuota/';
  constructor(private http:HttpClient) {

   }

   //Crear jugadorCuota
   crearJugadorCuota(id_cuota:number, id_jugador:number, nombre:String, apellido:String, precio:number, medioPago:String, fecha:String){

    return this.http.post<JugadorCuota>(this.rutaglobal+'nuevo/'+id_cuota+'/'+id_jugador+'/'+nombre+'/'+apellido+'/'+precio+'/'+medioPago+'/'+fecha, {
      observe: 'response'
    });
  }

   //Obtener jugadorCuota
mostrarJugadorCuota(){
  return this.http.get<JugadorCuota[]>(this.rutaglobal+'mostrar');
}

mostrarJugadores(){
  return this.http.get<Jugador[]>(this.rutaglobal+'mostrar/jugadores');
}


 //Obtener cuotas por todos los parametros
 mostrarCuotaPorParametros(año:number, mes:number){
  return this.http.get<Cuota>(this.rutaglobal + 'cuota/'+año+'/'+mes);
}

buscarJugadorPorDocumento(documento:number){
  return this.http.get<Jugador>(this.rutaglobal + 'buscarPorDocumento/'+documento);
}

existeCuotaEnJugadorCuota(id_cuota:number, documento:number){
  return this.http.get<Boolean>(this.rutaglobal + 'buscarPorId/'+id_cuota+'/'+documento);
}

   //Actualizar socioCuota
   /*
modificarJugador(jugador: Jugador){

  return this.http.put<Jugador>(this.rutaglobal + 'modificar/'+jugador.documento, jugador, {
    observe: 'response'
  });
}
*/

   //Eliminar jugadorCuota
   eliminarJugadorCuota(id_cuota: number, id_jugador:number){

    return this.http.post(this.rutaglobal+"eliminar/"+id_cuota+'/'+id_jugador, {
      observe:'response'
    });
   }

}