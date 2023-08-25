import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuenta } from '../modelo/Cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaServicio {

  rutaglobal = 'http://localhost:8080/cuenta/';
  constructor(private http:HttpClient) {

   }

   mostrarCuentas(){
    return this.http.get<Cuenta[]>(this.rutaglobal + 'mostrar');
  }
  

   ingresoEfectivo(importe: Number){

    return this.http.post<void>(this.rutaglobal + 'ingresoEfectivo/'+importe, {
      observe: 'response'
    });
  }

  ingresoDebito(importe: Number){

    return this.http.post<void>(this.rutaglobal + 'ingresoDebito/'+importe, {
      observe: 'response'
    });
  }

  egresoEfectivo(importe: Number){

    return this.http.post<Boolean>(this.rutaglobal + 'egresoEfectivo/'+importe, {
      observe: 'response'
    });
  }

  egresoDebito(importe: Number){

    return this.http.post<Boolean>(this.rutaglobal + 'egresoDebito/'+importe, {
      observe: 'response'
    });
  }
}
