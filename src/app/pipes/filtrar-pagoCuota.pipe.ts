import { Pipe, PipeTransform } from '@angular/core';
import { Entrenador } from '../modelo/Entrenador';
import { Jugador } from '../modelo/Jugador';
import { Socio } from '../modelo/Socio';
import { Transaccion } from '../modelo/Transaccion';

@Pipe({
  name: 'filtroPagoCuota'
})
export class FiltrarPagoCuotaPipe implements PipeTransform {

  transform(values: any[], searchName: string, searchApellido:string, searchDocumento:string, searchAnio:string, searchMes:string, searchMedioPago:string): any[] {

    let filterValues=values;


  if(values.length>0){
  
    if(searchName!=""){ 


      if(values[0].entrenador !=null){
    values.forEach(value =>
      {
    let nombre:any=value.nombreEntrenador;
    value.nombreEntrenador= nombre.toLowerCase();
  
}
    );
    searchName=searchName.toLowerCase();
    filterValues= filterValues.filter(value => value.nombreEntrenador?.includes(searchName));
  }

  else{
    if(values[0].jugador !=null) {
      values.forEach(value =>
        {
      let nombre:any=value.nombreJugador;
      value.nombreJugador= nombre.toLowerCase();
    
  }
      );
      searchName=searchName.toLowerCase();
      filterValues= filterValues.filter(value => value.nombreJugador?.includes(searchName));
    }

  else{
    if(values[0].socio!=null){
      values.forEach(value =>
        {
      let nombre:any=value.nombreSocio;
      value.nombreSocio= nombre.toLowerCase();
    
  }
      );
      searchName=searchName.toLowerCase();
      filterValues= filterValues.filter(value => value.nombreSocio?.includes(searchName));
    }
 
else{
  values.forEach(value =>
    {
  let nombre:any=value.nombre;
  value.nombre= nombre.toLowerCase();

}
  );
  searchName=searchName.toLowerCase();
  filterValues= filterValues.filter(value => value.nombre?.includes(searchName));
}
    }
  }
}

    if(searchApellido!=""){ 

      if(values[0].entrenador !=null){
    values.forEach(value =>
      {
    let apellido:any=value.apellidoEntrenador;
    value.apellidoEntrenador= apellido.toLowerCase();
  
}
    );
    searchApellido=searchApellido.toLowerCase();
    filterValues= filterValues.filter(value => value.apellidoEntrenador?.includes(searchApellido));
  }

  else{
    if(values[0].jugador !=null) {
      values.forEach(value =>
        {
      let apellido:any=value.apellidoJugador;
      value.apellidoJugador= apellido.toLowerCase();
    
  }
      );
      searchApellido=searchApellido.toLowerCase();
      filterValues= filterValues.filter(value => value.apellidoJugador?.includes(searchApellido));
    }

  else{
    if(values[0].socio !=null){
      values.forEach(value =>
        {
      let apellido:any=value.apellidoSocio;
      value.apellidoSocio= apellido.toLowerCase();
    
  }
      );
      searchApellido=searchApellido.toLowerCase();
      filterValues= filterValues.filter(value => value.apellidoSocio?.includes(searchApellido));
    }
    else{
      values.forEach(value =>
        {
      let apellido:any=value.apellido;
      value.apellido= apellido.toLowerCase();
    
  }
      );
      searchApellido=searchApellido.toLowerCase();
      filterValues= filterValues.filter(value => value.apellido?.includes(searchApellido));
    }
  }
}
    }
 
  if(searchDocumento!=""){ 
   
    if(values[0].entrenador !=null){

    filterValues= filterValues.filter(value => value.documentoEntrenador?.toString().includes(searchDocumento));
    }
else{ 
    if(values[0].socio !=null){

      filterValues= filterValues.filter(value => value.documentoSocio?.toString().includes(searchDocumento));
      }
else {
      if(values[0].jugador !=null){

      filterValues= filterValues.filter(value => value.documentoJugador?.toString().includes(searchDocumento));
        }
else {
       filterValues= filterValues.filter(value => value.documento?.toString().includes(searchDocumento));
}
        }
  } 

}

  if(searchAnio!=""){
    console.log(searchAnio);
    values.forEach(value =>
      {
    let anio:any=value.anioCuota;
    value.anioCuota= anio.toString().toLowerCase();
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
    value.mesCuota= mes.toString().toLowerCase();
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

    if(element.entrenador!=null){ 
    element.nombreEntrenador = this.mayusculaPrimerLetra(element.nombreEntrenador);
    element.apellidoEntrenador = this.mayusculaPrimerLetra(element.apellidoEntrenador); 
   }

   if(element.socio!=null){
    element.nombreSocio = this.mayusculaPrimerLetra(element.nombreSocio);
    element.apellidoSocio = this.mayusculaPrimerLetra(element.apellidoSocio); 
   }

   if(element.jugador!=null){
    element.nombreJugador = this.mayusculaPrimerLetra(element.nombreJugador);
    element.apellidoJugador = this.mayusculaPrimerLetra(element.apellidoJugador); 
   }
    element.medioPago = this.mayusculaPrimerLetra(element.medioPago);
 });

  return filterValues;
  }

  mayusculaPrimerLetra(string:String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
