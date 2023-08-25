import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlquilerBufe } from '../modelo/AlquilerBufe';

@Injectable({
  providedIn: 'root'
})
export class AlquilerBufeServicio {

  rutaglobal = 'http://localhost:8080/alquilerBufe/';

  constructor(private http:HttpClient) { }

  //Crear alquilerBufe
  crearAlquilerBufe(alquilerBufe:AlquilerBufe){

    return this.http.post<AlquilerBufe>(this.rutaglobal+'nuevo',alquilerBufe, {
      observe: 'response'
    });
  }

   //Obtener alquilerBufe
mostrarAlquileresBufe(){
  return this.http.get<AlquilerBufe[]>(this.rutaglobal+'mostrar');
}

buscarPorParametros(fecha:String, idBufe:number){
  return this.http.get<AlquilerBufe[]>(this.rutaglobal+'buscarPorParametros/'+fecha+'/'+idBufe);
}

//Eliminar alquilerBufe
eliminarAlquilerBufe(id: number){

  return this.http.post<Boolean>(this.rutaglobal + id, {
    observe:'response'
  });
 }

 modificarAlquilerBufe(alquilerBufe: AlquilerBufe){

  return this.http.post<AlquilerBufe>(this.rutaglobal + 'modificar', alquilerBufe, {
    observe: 'response'
  });
}
}
