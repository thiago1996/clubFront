import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entrenador } from '../modelo/Entrenador';


@Injectable({
  providedIn: 'root'
})
export class EntrenadorServicio {

  rutaglobal = 'http://localhost:8080/entrenador/';
  constructor(private http:HttpClient) {

   }

   //Crear entrenador
   crearEntrenador(entrenador: Entrenador){

    return this.http.post<Entrenador>(this.rutaglobal + 'nuevo', entrenador, {
      observe: 'response'
    });
  }

   //Obtener entrenadores
mostrarEntrenadores(){
  return this.http.get<Entrenador[]>(this.rutaglobal + 'mostrar');
}

buscarEntrenadorPorDocumento(documento:number){
  return this.http.get<Boolean>(this.rutaglobal + 'buscarPorDocumento/'+documento);
}

obtenerEntrenadorPorDocumento(documento:number){
  return this.http.get<Entrenador>(this.rutaglobal + 'obtenerPorDocumento/'+documento);
}

   //Actualizar entrenador
modificarEntrenador(entrenador: Entrenador){

  return this.http.post<Entrenador>(this.rutaglobal + 'modificar', entrenador, {
    observe: 'response'
  });
}

//Agregar categoria
agregarCategoria(idEntrenador: number, idCategoria: number){

  return this.http.post<Entrenador>(this.rutaglobal + 'agregarCategoria/'+ idEntrenador, idCategoria, {
    observe: 'response'
    
  });
}

//Eliminar categoria
eliminarCategoria(idEntrenador: number, idCategoria: number){

  return this.http.post<Entrenador>(this.rutaglobal + 'eliminarCategoria/'+ idEntrenador, idCategoria, {
    observe: 'response'
    
  });
}

   //Eliminar entrenador
   eliminarEntrenador(documento: number){

    return this.http.post<Boolean>(this.rutaglobal + documento, {
      observe:'response'
    });
   }
}