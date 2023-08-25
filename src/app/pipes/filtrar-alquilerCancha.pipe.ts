import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroAlquilerCancha'
})
export class FiltrarAlquilerCanchaPipe implements PipeTransform {

  transform(values: any[], searchFecha: string, searchHoraInicio:string, searchHoraFin:string, searchNumeroCancha:string, searchMedioPago:string): any[] {

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
    //searchName=searchName.toLowerCase();
    filterValues= filterValues.filter(value => value.fecha?.includes(searchFecha));


  }
    
    if(searchHoraInicio!=""){
      searchHoraInicio = searchHoraInicio.toLowerCase();
      values.forEach(value =>
        {
      let horaInicio:any=value.horaInicio;
      value.horaInicio= horaInicio.toLowerCase();
  }
      );
    //searchHoraInicio=searchHoraInicio.toLowerCase();
    filterValues=filterValues.filter(value => value.horaInicio?.includes(searchHoraInicio));
    
    }

    if(searchHoraFin!=""){
      searchHoraFin = searchHoraFin.toLowerCase();
      values.forEach(value =>
        {
      let horaFin:any=value.horaFin;
      value.horaFin= horaFin.toLowerCase();
  }
      );
    //searchHoraInicio=searchHoraInicio.toLowerCase();
    filterValues=filterValues.filter(value => value.horaFin?.includes(searchHoraFin));
    
    }

   
  if(searchNumeroCancha.toString()!=""){ 
   
    filterValues= filterValues.filter(value => value.numeroCancha?.toString().includes(searchNumeroCancha));
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