import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuota } from '../modelo/Cuota';

@Injectable({
  providedIn: 'root'
})
export class CuotaServicio {

  rutaglobal = 'http://localhost:8080/cuota/';
  constructor(private http:HttpClient) {

   }

   //Crear cuota
   crearCuota(cuota: Cuota){

    return this.http.post<Cuota>(this.rutaglobal + 'nuevo', cuota, {
      observe: 'response'
    });
  }

   //Obtener cuotas
mostrarCuotas(){
  return this.http.get<Cuota[]>(this.rutaglobal + 'mostrar');
}

   //Obtener cuotas por todos los parametros
   
   mostrarCuotaPorParametros(año:number, mes:number){
    return this.http.get<Cuota>(this.rutaglobal + 'mostrar/'+año+'/'+mes);
  }
  

   //Actualizar cuota
modificarCuota(cuota: Cuota){

  return this.http.post<Cuota>(this.rutaglobal + 'modificar', cuota, {
    observe: 'response'
  });
}

existeCuota(anio:number, mes:number){
  return this.http.get<Boolean>(this.rutaglobal + 'existeCuota/'+anio+'/'+mes);
}


   //Eliminar cuota
   eliminarCuota(id: number){

    return this.http.post<Boolean>(this.rutaglobal + id, {
      observe:'response'
    });
   }
}