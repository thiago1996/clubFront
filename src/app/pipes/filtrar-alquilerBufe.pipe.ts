import { Pipe, PipeTransform } from '@angular/core';
import { AlquilerBufe } from '../modelo/AlquilerBufe';

@Pipe({
  name: 'filtroAlquilerBufe'
})
export class FiltrarAlquilerBufePipe implements PipeTransform {

  transform(values: any[], searchFecha: string, searchNumeroBufe:string, searchMedioPago:string): any[] {

    let filterValues=values;


  if(values.length>0){
  
    if(searchFecha!=""){ 
    searchFecha = searchFecha.toLowerCase();
    values.forEach(value =>
      {
    let fecha:any=value.fecha;
    value.fecha= fecha.toLowerCase();
  
}
    );

    filterValues= filterValues.filter(value => value.fecha?.includes(searchFecha));

  }

   
  if(searchNumeroBufe.toString()!=""){ 

   
   if(filterValues[0].bufe!=null){ 
    console.log("hola!");
    filterValues= filterValues.filter(value => value.bufe?.numeroBufe.toString().includes(searchNumeroBufe));
    }
    if(filterValues[0].numeroBufe!=null){ 
      console.log("chau");
      filterValues=filterValues.filter(value => value.numeroBufe.toString().includes(searchNumeroBufe));
    }
   
  }  

  if(searchMedioPago!=""){
    searchMedioPago=searchMedioPago.toLowerCase();
    values.forEach(value =>
      {
    let medioPago:any=value.medioPago;
    value.medioPago= medioPago.toLowerCase();
}
    );
  //searchHoraInicio=searchHoraInicio.toLowerCase();
  filterValues=filterValues.filter(value => value.medioPago?.includes(searchMedioPago));
  
  }


  }
  
   filterValues.forEach(element => {
     element.medioPago = this.mayusculaPrimerLetra(element.medioPago);
  });

  return filterValues;
  }

  
  mayusculaPrimerLetra(string:String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


}
