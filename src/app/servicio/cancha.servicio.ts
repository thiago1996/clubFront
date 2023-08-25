import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cancha } from '../modelo/Cancha';

@Injectable({
  providedIn: 'root'
})
export class CanchaServicio {

  rutaglobal = 'http://localhost:8080/cancha/';

  constructor(private http:HttpClient) {

   }

  //Crear cancha
  crearCancha(cancha: Cancha){

    return this.http.post<Cancha>(this.rutaglobal + 'nueva', cancha, {
      observe: 'response'
    });
  }

   //Obtener canchas
mostrarCanchas(){
  return this.http.get<Cancha[]>(this.rutaglobal + 'mostrar');
}

//Obtener categorias por todos los parametros
mostrarCanchasPorNumero(numero:number){
  return this.http.get<Cancha[]>(this.rutaglobal + 'mostrar/'+numero);
}

 //Eliminar cancha
 eliminarCancha(id: number){

  return this.http.post<void>(this.rutaglobal + id, {
    observe:'response'
  });
 }

    //Actualizar cancha
modificarCancha(cancha: Cancha){

  return this.http.post<Cancha>(this.rutaglobal + 'modificar', cancha, {
    observe: 'response'
  });
}


}
