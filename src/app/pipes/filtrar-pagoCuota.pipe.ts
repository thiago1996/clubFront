import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPagoCuota'
})
export class FiltrarPagoCuotaPipe implements PipeTransform {

  transform(values: any[], searchName: string, searchApellido:string, searchDocumento:string, searchAnio:string, searchMes:string, searchMedioPago:string): any[] {

    let filterValues=values;


  if(values.length>0){
  
    if(searchName!=""){ 
      console.log(searchName);
    values.forEach(value =>
      {
    let nombre:any=value.nombre;
    value.nombre= nombre.toLowerCase();
  
}
    );
    searchName=searchName.toLowerCase();
    filterValues= filterValues.filter(value => value.nombre?.includes(searchName));
  }
    
    if(searchApellido!=""){
      console.log(searchApellido);
      values.forEach(value =>
        {
      let apellido:any=value.apellido;
      value.apellido= apellido.toLowerCase();
  }
      );
    searchApellido=searchApellido.toLowerCase();
    filterValues=filterValues.filter(value => value.apellido?.includes(searchApellido));
    
    }
 
  if(searchDocumento!=""){ 
   
    console.log(searchDocumento);
    filterValues= filterValues.filter(value => value.documento?.toString().includes(searchDocumento));
  }

  if(searchAnio!=""){
    console.log(searchAnio);
    values.forEach(value =>
      {
    let anio:any=value.anioCuota;
    value.anioCuota= anio.toLowerCase();
}
    );
  searchAnio=searchAnio.toLowerCase();
  filterValues=filterValues.filter(value => value.anioCuota?.includes(searchAnio));
  
  }

  if(searchMes!=""){
    console.log(searchMes);
    values.forEach(value =>
      {
    let mes:any=value.mesCuota;
    value.mesCuota= mes.toLowerCase();
}
    );
  searchMes=searchMes.toLowerCase();
  filterValues=filterValues.filter(value => value.mesCuota?.includes(searchMes));
  
  }

  if(searchMedioPago!=""){
    console.log("xxx");
    console.log(searchMedioPago);
    values.forEach(value =>
      {
    let medioPago:any=value.medioPago;
    value.medioPago= medioPago.toLowerCase();
}
    );
  searchMedioPago=searchMedioPago.toLowerCase();
  filterValues=filterValues.filter(value => value.medioPago?.includes(searchMedioPago));
  
  }

  }

  filterValues.forEach(element => {
    element.nombre = this.mayusculaPrimerLetra(element.nombre);
    element.apellido = this.mayusculaPrimerLetra(element.apellido);
    element.medioPago = this.mayusculaPrimerLetra(element.medioPago);
 });

  return filterValues;
  }

  mayusculaPrimerLetra(string:String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
