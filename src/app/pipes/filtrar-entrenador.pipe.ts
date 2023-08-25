import { Pipe, PipeTransform } from '@angular/core';
import { Entrenador } from '../modelo/Entrenador';

@Pipe({
  name: 'filtroEntrenador'
})
export class FiltrarEntrenadorPipe implements PipeTransform {

  transform(values: Entrenador[], searchName: string, searchApellido:string, searchDocumento:string, searchCategoria:string=""): Entrenador[] {

    let filterValues=values;

  if(values.length>0){
  
    if(searchName!=""){ 
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
   
  filterValues= filterValues.filter(value => value.documento?.toString().includes(searchDocumento));
}

  if(searchCategoria!=""){ 
    console.log(searchCategoria);
  
   filterValues.forEach(element => {
    
     filterValues= filterValues.filter(value => value.categoriasAsignadas.toString().includes(searchCategoria));
   

  });

  }

}

filterValues.forEach(element => {
  element.nombre = this.mayusculaPrimerLetra(element.nombre);
  element.apellido = this.mayusculaPrimerLetra(element.apellido);
});

  return filterValues;
  }

  mayusculaPrimerLetra(string:String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
