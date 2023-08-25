import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuota } from '../modelo/Cuota';
import { SocioCuota } from '../modelo/SocioCuota';
import { Socio } from '../modelo/Socio';

@Injectable({
  providedIn: 'root'
})
export class SocioCuotaServicio {

  rutaglobal = 'http://localhost:8080/socioCuota/';
  constructor(private http:HttpClient) {

   }

   //Crear socioCuota
   crearSocioCuota(id_cuota:number, id_socio:number,nombre:String, apellido:String, precio:number, medioPago:String, fecha:String){

    return this.http.post<SocioCuota>(this.rutaglobal+'nuevo/'+id_cuota+'/'+id_socio+'/'+nombre+'/'+apellido+'/'+precio+'/'+medioPago+'/'+fecha, {
      observe: 'response'
    });
  }

   //Obtener socioCuota
mostrarSocioCuota(){
  return this.http.get<SocioCuota[]>(this.rutaglobal+'mostrar');
}

mostrarSocios(){
  return this.http.get<Socio[]>(this.rutaglobal+'mostrar/socios');
}

buscarSocioPorDocumento(documento:number){
  return this.http.get<Socio>(this.rutaglobal + 'buscarPorDocumento/'+documento);
}

 //Obtener cuotas por todos los parametros
 mostrarCuotaPorParametros(año:number, mes:number){
  return this.http.get<Cuota>(this.rutaglobal + 'cuota/'+año+'/'+mes);
}

existeCuotaEnSocioCuota(id_cuota:number, documento:number){
  return this.http.get<Boolean>(this.rutaglobal + 'buscarPorId/'+id_cuota+'/'+documento);
}
/*
modificarSocioCuota(socioCuota: SocioCuota){

  return this.http.post<SocioCuota>(this.rutaglobal + 'modificar', socioCuota, {
    observe: 'response'
  });
}
*/

   //Actualizar socioCuota
   /*
modificarJugador(jugador: Jugador){

  return this.http.put<Jugador>(this.rutaglobal + 'modificar/'+jugador.documento, jugador, {
    observe: 'response'
  });
}
*/

   //Eliminar socioCuota
   eliminarSocioCuota(id_cuota: number, id_socio:number){

    return this.http.post(this.rutaglobal+"eliminar/"+id_cuota+'/'+id_socio, {
      observe:'response'
    });
   }
}