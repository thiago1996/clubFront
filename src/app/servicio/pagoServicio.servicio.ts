import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagoServicio } from '../modelo/PagoServicio';
@Injectable({
  providedIn: 'root'
})

export class PagoServicioServicio {

rutaglobal = 'http://localhost:8080/pagoServicio/';

  constructor(private http:HttpClient) {

  }

   //Crear pago de servicio
   crearPagoServicio(pagoServicio: PagoServicio){

    return this.http.post<PagoServicio>(this.rutaglobal + 'nuevo', pagoServicio, {
      observe: 'response'
    });
  }

   //Obtener pagos de servicio
mostrarPagosServicio(){
  return this.http.get<PagoServicio[]>(this.rutaglobal + 'mostrar');
}

  //Obtener pagos de servicio por descripcion y fecha
  mostrarPagosServicioPorDescripcionYFecha(descripcion:String, fecha:String){
    return this.http.get<PagoServicio[]>(this.rutaglobal + 'mostrarPorDescripcionYFecha/'+descripcion+'/'+fecha);
  }

  //Obtener pagos de servicio por descripcion, fecha, importe y medio de pago
  mostrarPagosServicioPorDescripcionFechaImporteYMedioPago(descripcion:String, fecha:String, importe:number, medioPago:String){
    return this.http.get<PagoServicio[]>(this.rutaglobal + 'mostrarPorDescripcionFechaImporteYMedioPago/'+descripcion+'/'+fecha+'/'+importe+'/'+medioPago);
  }

 //Eliminar pago de servicio
 eliminarPagoServicio(id: number){

  return this.http.post<void>(this.rutaglobal + id, {
    observe:'response'
  });
 }

    //Actualizar pago de servicio
modificarPagoServicio(pagoServicio:PagoServicio){

  return this.http.post<PagoServicio>(this.rutaglobal + 'modificar', pagoServicio, {
    observe: 'response'
  });
}



}
