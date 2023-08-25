import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bufe } from '../modelo/Bufe';

@Injectable({
  providedIn: 'root'
})
export class BufeServicio {

  rutaglobal = 'http://localhost:8080/bufe/';

  constructor(private http:HttpClient) {

   }

  //Crear bufe
  crearBufe(bufe: Bufe){

    return this.http.post<Bufe>(this.rutaglobal + 'nuevo', bufe, {
      observe: 'response'
    });
  }

   //Obtener bufes
mostrarBufes(){
  return this.http.get<Bufe[]>(this.rutaglobal + 'mostrar');
}

//Obtener bufes por numero
mostrarBufesPorNumero(numero:number){
  return this.http.get<Bufe[]>(this.rutaglobal + 'mostrar/'+numero);
}

 //Eliminar bufe
 eliminarBufe(id: number){

  return this.http.post<void>(this.rutaglobal + id, {
    observe:'response'
  });
 }

    //Actualizar Bufe
modificarBufe(bufe: Bufe){

  return this.http.post<Bufe>(this.rutaglobal + 'modificar', bufe, {
    observe: 'response'
  });
}

}
