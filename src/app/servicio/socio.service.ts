import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socio } from '../modelo/Socio';

@Injectable({
  providedIn: 'root'
})
export class SocioServicio {

  rutaglobal = 'http://localhost:8080/socio/';
  constructor(private http:HttpClient) {

   }

   //Crear socio
   crearSocio(socio: Socio){

    return this.http.post<Socio>(this.rutaglobal + 'nuevo', socio, {
      observe: 'response'
    });
  }

   //Obtener socios
mostrarSocios(){
  return this.http.get<Socio[]>(this.rutaglobal + 'mostrar');
}

   //Actualizar socio
modificarSocio(socio: Socio){

  return this.http.post<Socio>(this.rutaglobal + 'modificar', socio, {
    observe: 'response'
  });
}

buscarSocioPorDocumento(documento:number){
  return this.http.get<Boolean>(this.rutaglobal + 'buscarPorDocumento/'+documento);
}

   //Eliminar persona
   eliminarSocio(documento: number){

    return this.http.post<Boolean>(this.rutaglobal + documento, {
      observe:'response'
    });
   }
}