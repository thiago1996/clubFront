import { Pipe, PipeTransform } from '@angular/core';
import { Partido } from '../modelo/Partido';

@Pipe({
  name: 'filtroPartido'
})
export class FiltrarPartidoPipe implements PipeTransform {

  transform(values: Partido[], searchDescripcion: string, searchCancha:string,searchCategoria: string, searchTipoCategoria:string, searchDeporte:string, searchFecha:string): any[] {

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

  
  if(searchCancha!=""){
    
    values.forEach(value =>
      {
    let cancha:any=value.cancha;
    value.cancha= cancha.toLowerCase();
}
    );
  searchCancha=searchCancha.toLowerCase();
  filterValues=filterValues.filter(value => value.cancha?.includes(searchCancha));

}
   
    if(searchCategoria!=""){
     
    filterValues=filterValues.filter(value => value.categoria.nombre.toString().includes(searchCategoria));
  
  }

  if(searchTipoCategoria!=""){

    values.forEach(value =>
      {
    let tipoCategoria:any=value.categoria.tipo;
    value.categoria.tipo= tipoCategoria.toLowerCase();
}
    );
  searchTipoCategoria=searchTipoCategoria.toLowerCase();
  filterValues=filterValues.filter(value => value.categoria?.tipo.includes(searchTipoCategoria));

}

if(searchDeporte!=""){ 
  
  values.forEach(value =>
    {
  let deporte:any=value.categoria.deporte;
  value.categoria.deporte = deporte.toLowerCase();

}
  );
  searchDeporte=searchDeporte.toLowerCase();
  filterValues= filterValues.filter(value => value.categoria.deporte?.includes(searchDeporte));
}
 
if(searchFecha!=""){ 

  values.forEach(value =>
    {
  let fecha:any=value.fecha;
  value.fecha = fecha.toLowerCase();

}
  );
  searchFecha=searchFecha.toLowerCase();
  filterValues= filterValues.filter(value => value.fecha?.includes(searchFecha));
}

}

filterValues.forEach(element => {
  element.descripcion = this.mayusculaPrimerLetra(element.descripcion);
  element.cancha = this.mayusculaPrimerLetra(element.cancha);
  //element.categoria.nombre = this.mayusculaPrimerLetra(element.categoria.nombre);
  element.categoria.tipo = this.mayusculaPrimerLetra(element.categoria.tipo);
  element.categoria.deporte = this.mayusculaPrimerLetra(element.categoria.deporte);
  element.fecha = this.mayusculaPrimerLetra(element.fecha);
});

return filterValues;

}

mayusculaPrimerLetra(string:String) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

}
