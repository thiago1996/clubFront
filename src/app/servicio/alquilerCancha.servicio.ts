import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlquilerCancha } from '../modelo/AlquilerCancha';

@Injectable({
  providedIn: 'root'
})
export class AlquilerCanchaServicio {

  rutaglobal = 'http://localhost:8080/alquilerCancha/';

  constructor(private http:HttpClient) { }

  //Crear alquilerCancha
  crearAlquilerCancha(alquilerCancha:AlquilerCancha){

    return this.http.post<AlquilerCancha>(this.rutaglobal+'nuevo',alquilerCancha, {
      observe: 'response'
    });
  }

   //Obtener alquilerCancha
mostrarAlquileresCancha(){
  return this.http.get<AlquilerCancha[]>(this.rutaglobal+'mostrar');
}

//Obtener alquilerCancha por parametros
buscarPorParametros(fecha:String, horaInicio:String, horaFin:String, idCancha:number){
  return this.http.get<AlquilerCancha[]>(this.rutaglobal+'buscarPorParametros/'+fecha+'/'+horaInicio+'/'+horaFin+'/'+idCancha);
}

//Eliminar alquilerCancha
eliminarAlquilerCancha(id: number){

  return this.http.post<Boolean>(this.rutaglobal + id, {
    observe:'response'
  });
 }

 modificarAlquilerCancha(alquilerCancha: AlquilerCancha){

  return this.http.post<AlquilerCancha>(this.rutaglobal + 'modificar', alquilerCancha, {
    observe: 'response'
  });
}

}
