import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuota } from '../modelo/Cuota';
import { PagoCuotaEntrenador } from '../modelo/PagoCuotaEntrenador';
import { Entrenador } from '../modelo/Entrenador';

@Injectable({
  providedIn: 'root'
})
export class PagoCuotaEntrenadorServicio {

  rutaglobal = 'http://localhost:8080/pagoCuotaEntrenador/';
  constructor(private http:HttpClient) {

   }

   //Crear socioCuota
   crearPagoCuotaEntrenador(id_cuota:number, id_entrenador:number, nombre:String, apellido:String, importe:number, medioPago:String, fecha:String){

    return this.http.post<PagoCuotaEntrenador>(this.rutaglobal+'nuevo/'+id_cuota+'/'+id_entrenador+'/'+nombre+'/'+apellido+'/'+importe+'/'+medioPago+'/'+fecha, {
      observe: 'response'
    });
  }

   //Obtener socioCuota
mostrarPagoCuotaEntrenador(){
  return this.http.get<PagoCuotaEntrenador[]>(this.rutaglobal+'mostrar');
}

mostrarEntrenadores(){
  return this.http.get<Entrenador[]>(this.rutaglobal+'mostrar/entrenadores');
}


 //Obtener cuotas por todos los parametros
 
 mostrarCuotaPorParametros(año:number, mes:number){
  return this.http.get<Cuota>(this.rutaglobal + 'cuota/'+año+'/'+mes);
}

buscarEntrenadorPorDocumento(documento:number){
  return this.http.get<Entrenador>(this.rutaglobal + 'buscarPorDocumento/'+documento);
}

existeCuotaEnPagoCuota(id_cuota:number, documento:number){
  return this.http.get<Boolean>(this.rutaglobal + 'buscarPorId/'+id_cuota+'/'+documento);
}

   //Eliminar socioCuota
   eliminarPagoCuotaEntrenador(id_cuota: number, id_entrenador:number){

    return this.http.post(this.rutaglobal+"eliminar/"+id_cuota+'/'+id_entrenador, {
      observe:'response'
    });
   }
}