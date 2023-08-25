import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPagoServicio'
})
export class FiltrarPagoServicioPipe implements PipeTransform {

  transform(values: any[], searchDescripcion: string, searchMedioPago:string, searchFecha:string): any[] {

    let filterValues=values;

  if(values.length>0){
  
    if(searchDescripcion!=""){ 
    values.forEach(value =>
      {
    let descripcion:any=value.descripcion;
    value.descripcion= descripcion.toLowerCase();
  
}
    );
    searchDescripcion=searchDescripcion.toLowerCase();
    filterValues= filterValues.filter(value => value.descripcion?.includes(searchDescripcion));
  }
   
    if(searchMedioPago!=""){
      values.forEach(value =>
        {
      let medioPago:any=value.medioPago;
      value.medioPago= medioPago.toLowerCase();
  }
      );
    searchMedioPago=searchMedioPago.toLowerCase();
    filterValues=filterValues.filter(value => value.medioPago?.includes(searchMedioPago));
  
  }

  if(searchFecha!=""){
    values.forEach(value =>
      {
    let fecha:any=value.fecha;
    value.fecha= fecha.toLowerCase();
}
    );
  searchFecha=searchFecha.toLowerCase();
  filterValues=filterValues.filter(value => value.fecha?.includes(searchFecha));

}

}

filterValues.forEach(element => {
  element.descripcion = this.mayusculaPrimerLetra(element.descripcion);
  element.medioPago = this.mayusculaPrimerLetra(element.medioPago);
});

return filterValues;

}

mayusculaPrimerLetra(string:String) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

}