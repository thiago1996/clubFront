import { Pipe, PipeTransform } from '@angular/core';
import { Cuota } from '../modelo/Cuota';

@Pipe({
  name: 'filtroCuota'
})
export class FiltrarCuotaPipe implements PipeTransform {

  transform(values: Cuota[], searchAnio: number, searchMes:number): Cuota[] {

    if(values.length>0){
    
      let filterValues;
      
    
      if(searchAnio!=undefined){ 
      let searchAnioString:string;
      values.forEach(value =>
        {
      let anio:any=value.anio;
      value.anio= anio.toString().toLowerCase();
    
  }
      );
      searchAnioString=searchAnio.toString().toLowerCase();
      filterValues= values.filter(value => value.anio?.toString().includes(searchAnioString));
    }
      else{
       
       filterValues= values;
      }
      if(searchMes!=undefined){
        let searchMesString:string;
        values.forEach(value =>
          {
        let mes:any=value.mes;
        value.mes= mes.toString().toLowerCase();
    }
        );
      searchMesString=searchMes.toString().toLowerCase();
      filterValues=filterValues.filter(value => value.mes?.toString().includes(searchMesString));
      }
   
    return filterValues;
  
    }
  
    return values;
  }

}
