import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from '../modelo/Categoria';

@Pipe({
  name: 'filtroCategoria'
})
export class FiltrarCategoriaPipe implements PipeTransform {

  transform(values: Categoria[], searchName: string, searchType:string, searchDeporte:string): Categoria[] {

    if(values.length>0){
    
      let filterValues;
    
      if(searchName!=""){ 
      values.forEach(value =>
        {
      let nombre:any=value.nombre;
      value.nombre= nombre.toLowerCase();
    
  }
      );
      searchName=searchName.toLowerCase();
      filterValues= values.filter(value => value.nombre?.includes(searchName));
    }
      else{
       
       filterValues= values;
      }
      if(searchType!=""){
        values.forEach(value =>
          {
        let tipo:any=value.tipo;
        value.tipo= tipo.toLowerCase();
    }
        );
      searchType=searchType.toLowerCase();
      filterValues=filterValues.filter(value => value.tipo?.includes(searchType));
      }

      if(searchDeporte!=""){
        values.forEach(value =>
          {
        let deporte:any=value.deporte;
        value.deporte= deporte.toLowerCase();
    }
        );
      searchDeporte=searchDeporte.toLowerCase();
      filterValues=filterValues.filter(value => value.deporte?.includes(searchDeporte));
      }
   
      filterValues.forEach(element => {
        element.tipo = this.mayusculaPrimerLetra(element.tipo);
        element.deporte = this.mayusculaPrimerLetra(element.deporte);
     });

    return filterValues;
  
    }
  
    return values;
  }

  mayusculaPrimerLetra(string:String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
