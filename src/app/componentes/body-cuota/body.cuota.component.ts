import { NONE_TYPE } from '@angular/compiler';
import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { isEmpty } from 'rxjs';
import { Cuota } from 'src/app/modelo/Cuota';
import { CuotaServicio } from 'src/app/servicio/cuota.servicio';
import { ReporteServicio } from 'src/app/servicio/reporte.servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body-cuota',
  templateUrl: './body.cuota.component.html',
  styleUrls: ['./body.cuota.component.css']
})
export class BodyCuotaComponent {

  cuotas: Array<Cuota>;
  cuotaPorParametros: Cuota;
  formularioCuota: FormGroup;
  formularioModificarCuota: FormGroup;
  display:boolean;
  cuota:Cuota;
  anioAModificar:any;
  mesAModificar:any;
  filterPropertyAnio:any;
  filterPropertyMes:any;
  searchAnio:any;
  searchMes:any;
  id_cuota:any;
  generarPdf:boolean=false;
  
  
constructor(private fb:FormBuilder, private cService: CuotaServicio, private rService:ReporteServicio){

  this.cuotas= new Array<Cuota>();
  this.cuotaPorParametros = new Cuota();
  this.display=false;
  this.cuota=new Cuota();
  this.anioAModificar="";
  this.mesAModificar="";

  
  //this.mostrarCategorias();
  //console.log(this.categorias);

  this.formularioCuota = fb.group({

    anio: new FormControl('', Validators.required), 
    mes: new FormControl('', Validators.required)
    
  });

  this.formularioModificarCuota = fb.group({

    anio: new FormControl('', Validators.required), 
    mes: new FormControl('', Validators.required)
    
  });
}

//Crear cuota
crearCuota(){
  
if(this.formularioCuota.valid){

  let anioString:String;
  anioString= this.formularioCuota.get('anio')?.value.toString();
  let arrayAnio:Array<String> = anioString.split(" ");
  
  let mesString:String;
  mesString= this.formularioCuota.get('mes')?.value.toString();
  let arrayMes:Array<String> = mesString.split(" ");

  console.log(arrayMes);

if(arrayMes[1]=="Jan"){
  this.cuota.mes = 1
}
if(arrayMes[1]=="Feb"){
  this.cuota.mes = 2
}
if(arrayMes[1]=="Mar"){
  this.cuota.mes = 3
}
if(arrayMes[1]=="Apr"){
  this.cuota.mes = 4
}
if(arrayMes[1]=="May"){
  this.cuota.mes = 5
}
if(arrayMes[1]=="Jun"){
  this.cuota.mes = 6
}
if(arrayMes[1]=="Jul"){
  this.cuota.mes = 7
}
if(arrayMes[1]=="Aug"){
  this.cuota.mes = 8
}
if(arrayMes[1]=="Sep"){
  this.cuota.mes = 9
}
if(arrayMes[1]=="Oct"){
  this.cuota.mes = 10
}
if(arrayMes[1]=="Nov"){
  this.cuota.mes = 11
}
if(arrayMes[1]=="Dec"){
  this.cuota.mes = 12
}

  anioString = arrayAnio[3].toString();
  this.cuota.anio=+anioString;
  
  console.log(this.cuota.anio);
  console.log(this.cuota.mes);
  let anio:any=this.cuota.anio;
  let mes:any= this.cuota.mes;

  this.mostrarCuotaPorParametros(anio, mes);

  setTimeout(() => {
    
  if(this.id_cuota!=undefined){
  
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'Ya existe una cuota registrada con los datos ingresados!',
      footer: 'Verifique los datos ingresados'
    })
  }
  else{

  this.cService.crearCuota(this.cuota).subscribe(res =>{
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cuota creada con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarCuotas();
    this.id_cuota=undefined;
    this.formularioCuota.reset(); 
    let tabla = document.getElementById('listadoCuotas');

   if(tabla)  tabla.style.display = "block"; 
   this.generarPdf=true;
    
  });
}
}, 500);
}

}

//Mostrar cuotas
mostrarCuotas(){

  this.cService.mostrarCuotas().subscribe(res =>{
    this.cuotas = res;

  })
}


//Eliminar categoria
eliminarCuota(cuota:Cuota){

//let id:any;
let anio:any = cuota.anio;
let mes:any = cuota.mes;
let control = false;

this.mostrarCuotaPorParametros(anio, mes);
  
setTimeout(()=>{

  //IF PARA CONTROLAR QUE NO ESTE ASOCIADA LA CUOTA CON ALGUN PAGO DE CUOTA
  
  this.cService.eliminarCuota(this.id_cuota).subscribe(res => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cuota eliminada con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarCuotas();
  });
},500);

setTimeout(() => {
        
  if(control ==false){

    Swal.fire({
      icon: 'error',
      title: 'Eliminación fallida',
      text: 'La cuota esta asociada a un jugador, socio o entrenador!',
      footer: 'Verifique las cuotas asociadas a jugadores, socios y entrenadores'
    })
  }

}, 500);

  control = false;
  this.id_cuota=undefined;

}




//Activa el dialogo, ! significa lo contrario a lo que tenia la variable
activador(cuota: Cuota){

  this.formularioModificarCuota.get('anio')?.setValue(cuota.anio);
  this.formularioModificarCuota.get('mes')?.setValue(cuota.mes);;
  this.anioAModificar=cuota.anio;
  this.mesAModificar=cuota.mes;

  this.display= !this.display;
  
}

//Actualizar cuota
modificarCuota(){

  if(this.formularioModificarCuota.valid){

    

    this.cuota.anio = this.formularioModificarCuota.get('anio')?.value;
    this.cuota.mes = this.formularioModificarCuota.get('mes')?.value;

    let anio:any = this.cuota.anio;
    let mes:any = this.cuota.mes;
   
    //mostrar Cuotas
 
/*
    this.cuotasPorParametros.forEach(element => {

      
      
      if((element.anio==this.anioAModificar) && (element.mes == this.mesAModificar)){
        
     
        this.cuota.id_cuota = element.id_cuota;
       
      }
    });


if(this.cuotaPorParametros.anio==this.anioAModificar && this.cuotaPorParametros.mes==this.anioAModificar){

  this.cuota.id_cuota = this.cuotaPorParametros.id_cuota;
}
  */ 
this.mostrarCuotaPorParametros(anio, mes);

setTimeout(() => {
  
this.cuota.id_cuota = this.id_cuota;

if(this.id_cuota!=undefined){

  this.display = !this.display;
  Swal.fire({
    icon: 'error',
    title: 'Registro fallido',
    text: 'Ya existe una cuota registrada con los datos ingresados!',
    footer: 'Verifique los datos ingresados'
  })
}
else{

  this.mostrarCuotaPorParametros(this.anioAModificar, this.mesAModificar);

  setTimeout(() => {
    
    this.cuota.id_cuota = this.id_cuota;
    this.cService.modificarCuota(this.cuota).subscribe(res =>{
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cuota actualizada con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.mostrarCuotas();
      this.formularioModificarCuota.reset(); 
      this.display = !this.display;
      this.anioAModificar="";
      this.mesAModificar="";
      //this.cuotaPorParametros=[];
      
    });
    
  }, 500);
    }

  }, 500);

  this.id_cuota=undefined;
  }

  }


  mostrarCuotaPorParametros(año:number, mes:number){

    this.cService.mostrarCuotaPorParametros(año, mes).subscribe(res =>{
     // this.cuotaPorParametros = res;
     if(res!=null){ 
    this.id_cuota=res.id_cuota;
    console.log("hola");
    console.log(this.id_cuota);
     }
     else{
      this.id_cuota=undefined;
     }
    })
  }


mostrarTabla(){
  this.mostrarCuotas();
  let tabla = document.getElementById('listadoCuotas')
  if(tabla)  tabla.style.display = "block"; 
  this.generarPdf=true;
}

onSearchCuotaAnio(searchAnio:number){
  this.searchAnio = searchAnio;
}

onSearchCuotaMes(searchMes:number){
  this.searchMes = searchMes;
}

cerrar(){
  this.display = !this.display;
}

imprimir(){

  const encabezado = ["Año", "Mes"];

  let cuotasFiltrado: Array<Cuota>;
  cuotasFiltrado = new Array<Cuota>();
 
  cuotasFiltrado= this.filtroCuotas(this.cuotas, this.searchAnio, this.searchMes);

 const cuerpo =  cuotasFiltrado.map(

  (obj : Cuota) => {
    const datos = [
      obj.anio,
      obj.mes
    ]
    return datos;
  }
 )

this.rService.imprimir(encabezado, cuerpo, "Listado de cuotas", true);

}

filtroCuotas(values: Cuota[], searchAnio: number, searchMes:number) {

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

