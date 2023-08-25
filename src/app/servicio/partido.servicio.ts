import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Partido } from '../modelo/Partido';
import { Categoria } from '../modelo/Categoria';

@Injectable({
  providedIn: 'root'
})
export class PartidoServicio {

  rutaglobal = 'http://localhost:8080/partido/';

  constructor(private http:HttpClient) {

   }

  //Crear partido
  crearPartido(partido: Partido){

    return this.http.post<Partido>(this.rutaglobal + 'nuevo', partido, {
      observe: 'response'
    });
  }

   //Obtener partidos
mostrarPartidos(){
  return this.http.get<Partido[]>(this.rutaglobal + 'mostrar');
}

//Obtener partidos por parametros
mostrarPartidoPorParametros(descripcion:String, idCategoria:number, cancha:String, fecha:String){
  return this.http.get<Partido>(this.rutaglobal + 'buscarPorParametros/'+descripcion+'/'+idCategoria+'/'+cancha+'/'+fecha);
}

 //Eliminar partido
 eliminarPartido(id: number){

  return this.http.post<void>(this.rutaglobal + id, {
    observe:'response'
  });
 }

    //Actualizar partido
modificarPartido(partido: Partido){

  return this.http.post<Partido>(this.rutaglobal + 'modificar', partido, {
    observe: 'response'
  });
}

mostrarCategorias(){
  return this.http.get<Categoria[]>(this.rutaglobal + 'categorias');
}

}