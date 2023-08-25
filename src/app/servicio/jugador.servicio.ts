import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jugador } from '../modelo/Jugador';
import { Categoria } from '../modelo/Categoria';

@Injectable({
  providedIn: 'root'
})
export class JugadorServicio {

  rutaglobal = 'http://localhost:8080/jugador/';
  constructor(private http:HttpClient) {

   }

   //Crear jugador
   crearJugador(jugador: Jugador){

    return this.http.post<Jugador>(this.rutaglobal + 'nuevo', jugador, {
      observe: 'response'
    });
  }

   //Obtener jugadores
mostrarJugadores(){
  return this.http.get<Jugador[]>(this.rutaglobal + 'mostrar');
}

mostrarCategorias(){
  return this.http.get<Categoria[]>(this.rutaglobal + 'categorias');
}

   //Actualizar jugador
modificarJugador(jugador: Jugador){

  return this.http.put<Jugador>(this.rutaglobal + 'modificar/'+jugador.documento, jugador, {
    observe: 'response'
  });
}

buscarJugadorPorDocumento(documento:number){
  return this.http.get<Boolean>(this.rutaglobal + 'buscarPorDocumento/'+documento);
}
   //Eliminar jugador
   eliminarJugador(documento: number){

    return this.http.delete(this.rutaglobal+"eliminar/" + documento, {
      observe:'response'
    });
   }
}