import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Partido } from 'src/app/modelo/Partido';
import { Transaccion } from 'src/app/modelo/Transaccion';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import { PartidoServicio } from 'src/app/servicio/partido.servicio';
import { ReporteServicio } from 'src/app/servicio/reporte.servicio';
import { TransaccionServicio } from 'src/app/servicio/transaccion.servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body-partidoIngresos',
  templateUrl: './body-partidoIngresos.component.html',
  styleUrls: ['./body-partidoIngresos.component.css']
})

export class BodyPartidoIngresosComponent {

  filterPropertyDescripcion="";
  filterPropertyCancha="";
  filterPropertyCategoria:any;
  filterPropertyTipoCategoria="";
  filterPropertyDeporte="";
  filterPropertyFecha="";
  searchDescripcion:string="";
  searchCancha:string="";
  searchCategoria:string="";
  searchTipoCategoria:string="";
  searchDeporte:string="";
  searchFecha:string="";
  display:boolean;
  formularioIngresosPartido:FormGroup;
  partido:Partido;
  ingresoEntradasAModificar:any;
  generarPdf:boolean=false;
  idTransaccion:any;

  transaccionPorPartido:Transaccion;

  partidos: Array<Partido>;

  constructor(private fb:FormBuilder, private pService: PartidoServicio, private cService: CuentaServicio, private rService:ReporteServicio, private tService:TransaccionServicio, private router:Router){
  
    this.partidos= new Array<Partido>();
    this.display = false;
    this.partido = new Partido();
    this.transaccionPorPartido= new Transaccion();
    this.mostrarTabla();


    this.formularioIngresosPartido = fb.group({

      ingresoEntradas: new FormControl('', Validators.required)

    });

  }

  mostrarPartidos(){

    this.pService.mostrarPartidos().subscribe(res =>{
      this.partidos = res;
    })
  }

  modificarPartido(){

    if(this.formularioIngresosPartido.valid){

    let ingresoEntradas:any;
    ingresoEntradas = this.formularioIngresosPartido.get('ingresoEntradas')?.value;
    let transaccion:Transaccion;
    transaccion = new Transaccion();

if(!isNaN(ingresoEntradas)){

  if(ingresoEntradas<0){
    this.display = !this.display;
    Swal.fire({
      icon: 'error',
      title: 'Actualización fallida',
      text: 'El valor ingresado debe ser mayor o igual a 0!',
      footer: 'Verifique los datos ingresados'
    })


  }
  else{

    this.partido.ingresoEntradas = this.formularioIngresosPartido.get('ingresoEntradas')?.value;
    this.idTransaccionPorPartidoYTipo(this.partido, "Ingreso");

    this.pService.modificarPartido(this.partido).subscribe(res =>{
            
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Partido actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.mostrarPartidos();
      this.display = !this.display;
      
      if(this.ingresoEntradasAModificar>0){
        
        this.cService.egresoEfectivo(this.ingresoEntradasAModificar).subscribe(res=>{
              
        });
      }
      setTimeout(() => {
        
      this.cService.ingresoEfectivo(ingresoEntradas).subscribe(res=>{
              
      });
    }, 500);

    
   if(this.idTransaccion!=0){

    transaccion.id = this.idTransaccion;
   }

    transaccion.tipo="Ingreso";
    transaccion.partido=this.partido;
    transaccion.fecha=this.partido.fecha;
    transaccion.medioPago="Efectivo";
    transaccion.importe=ingresoEntradas;
    transaccion.descripcion=this.partido.descripcion +" "+this.partido.categoria.nombre+" "+this.partido.categoria.deporte;

this.tService.crearTransaccion(transaccion).subscribe(res=>{
              
});

    });

}
  }

  else{
    this.display = !this.display;
    Swal.fire({
      icon: 'error',
      title: 'Actualización fallida',
      text: 'Debe ingresar un valor numérico!',
      footer: 'Verifique los datos ingresados'
    })
  }

  }

  else{
  this.display = !this.display;
  Swal.fire({
    icon: 'error',
    title: 'Actualización fallida',
    text: 'El campo ingreso de entradas no debe estar vacío!',
    footer: 'Verifique los datos ingresados'
  })

  }
   
  }

  activador(partido:Partido){
    
    this.formularioIngresosPartido.get('ingresoEntradas')?.setValue(partido.ingresoEntradas);
    
    this.partido.id=partido.id;  
    this.partido.descripcion=partido.descripcion;
    this.partido.cancha=partido.cancha;
    this.partido.fecha=partido.fecha;
    this.partido.categoria=partido.categoria;
    this.partido.gastoArbitros=partido.gastoArbitros;
    this.partido.gastoExtra=partido.gastoExtra;
    this.partido.gastoMedicos=partido.gastoMedicos;
    this.partido.gastoSeguridad=partido.gastoSeguridad;
    this.partido.observaciones=partido.observaciones;

    this.ingresoEntradasAModificar=partido.ingresoEntradas;

    this.display= !this.display;

  }

  mostrarTabla(){
    this.mostrarPartidos();
    let tabla = document.getElementById('listadoIngresoPartidos')
    if(tabla)  tabla.style.display = "block"; 
    this.generarPdf=true;
  }

  onSearchPartidoDescripcion(searchDescripcion:string){
    this.searchDescripcion =searchDescripcion;
     
  }
  
  onSearchPartidoCancha(searchCancha:string){
    this.searchCancha =searchCancha;
     
  }

  onSearchPartidoCategoria(searchCategoria:string){
    this.searchCategoria =searchCategoria
     
  }
  
  onSearchPartidoTipoCategoria(searchTipoCategoria:string){
    this.searchTipoCategoria =searchTipoCategoria;
     
  }
  onSearchPartidoDeporte(searchDeporte:string){
    this.searchDeporte =searchDeporte;
     
  }

  onSearchPartidoFecha(searchFecha:string){
    this.searchFecha = searchFecha;
  }

  cerrar(){
    this.display = !this.display;
  }

  imprimir(){

    const encabezado = ["Descripcion", "Cancha", "Categoria", "Tipo de categoría", "Deporte", "Fecha","Entradas"];
  
    let partidoIngresosFiltrado: Array<Partido>;
    partidoIngresosFiltrado = new Array<Partido>();
   
    partidoIngresosFiltrado= this.partidoIngresosFiltros(this.partidos, this.searchDescripcion, this.searchCancha, this.searchCategoria, this.searchTipoCategoria, this.searchDeporte, this.searchFecha);
  
   const cuerpo =  partidoIngresosFiltrado.map(
  
    (obj : Partido) => {
      const datos = [
        obj.descripcion,
        obj.cancha,
        obj.categoria.nombre,
        obj.categoria.tipo,
        obj.categoria.deporte,
        obj.fecha,
        obj.ingresoEntradas
      ]
      return datos;
    }
   )
  
  this.rService.imprimir(encabezado, cuerpo, "Listado de ingresos de entradas", true);
  
  }
  
  partidoIngresosFiltros(values: Partido[], searchDescripcion: string, searchCancha:string, searchCategoria: string, searchTipoCategoria:string, searchDeporte:string, searchFecha:string): any[] {

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
  element.categoria.tipo = this.mayusculaPrimerLetra(element.categoria.tipo);
  element.categoria.deporte = this.mayusculaPrimerLetra(element.categoria.deporte);
  element.fecha = this.mayusculaPrimerLetra(element.fecha);
});

return filterValues;

}

mayusculaPrimerLetra(string:String) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

volver(){

  if(this.router.url=="/homeAdministrador/partidoIngresos/nuevo"){ 
    this.router.navigate(['/homeAdministrador']);
    }
    else{
      this.router.navigate(['/homeInvitado']);
    }
}

idTransaccionPorPartidoYTipo(partido:Partido, tipo:String){

  this.tService.mostrarTransaccionesPorPartidoYTipo(partido, tipo).subscribe(res=>{
            
   this.idTransaccion=res[0].id;
  });
}

}
