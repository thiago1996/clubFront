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
  selector: 'app-body-partidoEgresos',
  templateUrl: './body-partidoEgresos.component.html',
  styleUrls: ['./body-partidoEgresos.component.css']
})
export class BodyPartidoEgresosComponent {

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
  formularioEgresosPartido:FormGroup;
  partido:Partido;
  egresoArbitrosAModificar:any;
  egresoSeguridadAModificar:any;
  egresoMedicosAModificar:any;
  egresoExtraAModificar:any;
  generarPdf:boolean=false;
  idTransaccion:any

  transaccionPorPartido:Transaccion;

  partidos: Array<Partido>;

  constructor(private fb:FormBuilder, private pService: PartidoServicio, private cService: CuentaServicio, private rService:ReporteServicio, private tService:TransaccionServicio, private tServicie:TransaccionServicio, private router:Router){
  
    this.partidos= new Array<Partido>();
    this.display = false;
    this.partido = new Partido();
    this.transaccionPorPartido= new Transaccion();
    this.mostrarTabla();

    this.formularioEgresosPartido = fb.group({

      gastoSeguridad: new FormControl('', Validators.required),
      gastoArbitros: new FormControl('', Validators.required),
      gastoMedicos: new FormControl('', Validators.required),
      gastoExtra: new FormControl('', Validators.required),
      observaciones: new FormControl('')
    });

  }

  mostrarPartidos(){

    this.pService.mostrarPartidos().subscribe(res =>{
      this.partidos = res;
      this.partidos.forEach(element => {
        element.gastoTotal=element.gastoArbitros+element.gastoMedicos+element.gastoSeguridad+element.gastoExtra;
      });
      
    })
  }

  modificarPartido(){

    if(this.formularioEgresosPartido.valid){

    let gastoArbitros:number;
    let gastoSeguridad:number;
    let gastoMedicos:number;
    let gastoExtra:number;
    let observaciones:any;
    let valorArestarDeCuenta=0;
    let valorASumarDeCuenta=0;
    let egresoTotal=0;

    let transaccion:Transaccion;
    transaccion = new Transaccion();
    
    gastoArbitros = +this.formularioEgresosPartido.get('gastoArbitros')?.value;
    gastoSeguridad = +this.formularioEgresosPartido.get('gastoSeguridad')?.value;
    gastoMedicos = +this.formularioEgresosPartido.get('gastoMedicos')?.value;
    gastoExtra = +this.formularioEgresosPartido.get('gastoExtra')?.value;
    observaciones = this.formularioEgresosPartido.get('observaciones')?.value;

    egresoTotal=gastoArbitros+gastoSeguridad+gastoMedicos+gastoExtra;

if((!isNaN(gastoArbitros))||(!isNaN(gastoSeguridad))||(!isNaN(gastoMedicos))||(!isNaN(gastoExtra))){

  if((gastoArbitros<0)|| (gastoSeguridad<0) || (gastoMedicos<0) || (gastoExtra<0)){
    this.display = !this.display;
    Swal.fire({
      icon: 'error',
      title: 'Actualización fallida',
      text: 'Los valores de gastos deben ser mayor o igual a 0!',
      footer: 'Verifique los datos ingresados'
    })

  }
  else{

    this.idTransaccionPorPartidoYTipo(this.partido, "Egreso");
    this.partido.gastoArbitros = gastoArbitros;
    this.partido.gastoSeguridad = gastoSeguridad;
    this.partido.gastoMedicos = gastoMedicos;
    this.partido.gastoExtra = gastoExtra;
    this.partido.observaciones= observaciones;

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
      
      if((this.egresoArbitrosAModificar>0) &&(this.egresoArbitrosAModificar!=gastoArbitros)){

        valorASumarDeCuenta+=this.egresoArbitrosAModificar;
     
      }
  
        if(this.egresoArbitrosAModificar!=gastoArbitros){
          
      valorArestarDeCuenta+=gastoArbitros;
    }
  
    if((this.egresoMedicosAModificar>0) &&(this.egresoMedicosAModificar!=gastoMedicos)){
    
         valorASumarDeCuenta+=this.egresoMedicosAModificar;
    
    }
 
      if(this.egresoMedicosAModificar!=gastoMedicos){
      
       valorArestarDeCuenta+=gastoMedicos;
  }

  if((this.egresoSeguridadAModificar>0) &&(this.egresoSeguridadAModificar!=gastoSeguridad)){

    valorASumarDeCuenta+=this.egresoSeguridadAModificar;
  }

    if(this.egresoSeguridadAModificar!=gastoSeguridad){
     
  valorArestarDeCuenta+=gastoSeguridad;

    }

if((this.egresoExtraAModificar>0) &&(this.egresoExtraAModificar!=gastoExtra)){
 
valorASumarDeCuenta+=this.egresoExtraAModificar;

}

  if(this.egresoExtraAModificar!=gastoExtra){
   
valorArestarDeCuenta+=gastoExtra;

  }

console.log(valorASumarDeCuenta);
console.log(valorArestarDeCuenta);

  this.cService.ingresoEfectivo(valorASumarDeCuenta).subscribe(res=>{
              
  });

  setTimeout(() => {
    
  
  this.cService.egresoEfectivo(valorArestarDeCuenta).subscribe(res=>{
              
  });
}, 500);

if(this.idTransaccion!=0){

  transaccion.id = this.idTransaccion;
 }

    transaccion.tipo="Egreso";
    transaccion.partido=this.partido;
    transaccion.fecha=this.partido.fecha;
    transaccion.medioPago="Efectivo";
    transaccion.importe=egresoTotal;
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
      text: 'Los valores de gastos deben ser numéricos!',
      footer: 'Verifique los datos ingresados'
    })
  }

  }

  else{
  this.display = !this.display;
  Swal.fire({
    icon: 'error',
    title: 'Actualización fallida',
    text: 'Debe completar todos los datos!',
    footer: 'Verifique los datos ingresados'
  })

  }
   
  }

  activador(partido:Partido){
    
    this.formularioEgresosPartido.get('gastoArbitros')?.setValue(partido.gastoArbitros);
    this.formularioEgresosPartido.get('gastoSeguridad')?.setValue(partido.gastoSeguridad);
    this.formularioEgresosPartido.get('gastoMedicos')?.setValue(partido.gastoMedicos);
    this.formularioEgresosPartido.get('gastoExtra')?.setValue(partido.gastoExtra);
    this.formularioEgresosPartido.get('observaciones')?.setValue(partido.observaciones);
    
    this.partido.id=partido.id;  
    this.partido.descripcion=partido.descripcion;
    this.partido.cancha=partido.cancha;
    this.partido.fecha=partido.fecha;
    this.partido.categoria=partido.categoria;
    this.partido.ingresoEntradas=partido.ingresoEntradas;
    /*this.partido.gastoArbitros=partido.gastoArbitros;
    this.partido.gastoExtra=partido.gastoExtra;
    this.partido.gastoMedicos=partido.gastoMedicos;
    this.partido.gastoSeguridad=partido.gastoSeguridad;
    this.partido.observaciones=partido.observaciones;
*/
    this.egresoArbitrosAModificar=partido.gastoArbitros;
    this.egresoSeguridadAModificar=partido.gastoSeguridad;
    this.egresoMedicosAModificar=partido.gastoMedicos;
    this.egresoExtraAModificar=partido.gastoExtra;

    this.display= !this.display;

  }

  mostrarTabla(){
    this.mostrarPartidos();
    let tabla = document.getElementById('listadoEgresoPartidos')
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

    const encabezado = ["Descripción", "Cancha", "Categoría", "Tipo categoría", "Deporte", "Fecha", "Gasto total", "Observaciones"];
  
    let partidoEgresosFiltrado: Array<Partido>;
    partidoEgresosFiltrado = new Array<Partido>();
   
    partidoEgresosFiltrado= this.filtroEgresosPartido(this.partidos, this.searchDescripcion, this.searchCancha, this.searchCategoria, this.searchTipoCategoria, this.searchDeporte, this.searchFecha);
  
   const cuerpo =  partidoEgresosFiltrado.map(
  
    (obj : Partido) => {
      const datos = [
        obj.descripcion,
        obj.cancha,
        obj.categoria.nombre,
        obj.categoria.tipo,
        obj.categoria.deporte,
        obj.fecha,
        obj.gastoTotal,
        obj.observaciones
      ]
      return datos;
    }
   )
  
  this.rService.imprimir(encabezado, cuerpo, "Listado de gastos de partidos ", true);
  
  }
  
  filtroEgresosPartido(values: Partido[], searchDescripcion: string, searchCancha:string,searchCategoria: string, searchTipoCategoria:string, searchDeporte:string, searchFecha:string): any[] {

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

  if(this.router.url=="/homeAdministrador/partidoEgresos/nuevo"){ 
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