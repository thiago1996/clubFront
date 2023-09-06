import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlquilerBufe } from 'src/app/modelo/AlquilerBufe';
import { Partido } from 'src/app/modelo/Partido';
import { Transaccion } from 'src/app/modelo/Transaccion';
import { ReporteServicio } from 'src/app/servicio/reporte.servicio';
import { TransaccionServicio } from 'src/app/servicio/transaccion.servicio';

@Component({
  selector: 'app-body-transaccion',
  templateUrl: './body-transaccion.component.html',
  styleUrls: ['./body-transaccion.component.css']
})
export class BodyTransaccionComponent {

  filtro = "default";

  formularioTransacciones: FormGroup;

 displayPagoCuotaEntrenador=false;
 displayPagoCuotaJugador=false;
 displayPagoCuotaSocio=false;
 displayAlquilerCancha=false;
 displayAlquilerBufe=false;
 displayPagoServicio=false;
 displayPartidoIngreso=false;
 displayPartidoEgreso=false;

 filterPropertyName="";
 filterPropertyApellido="";
 filterPropertyDocumento="";
 filterPropertyAnio="";
 filterPropertyMes="";
 filterPropertyMedioPago="";
 searchName:string="";
 searchApellido:string="";
 searchDocumento:string="";
 searchAnio:string="";
 searchMes:string="";
 searchMedioPago:string="";

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
  
 filterPropertyNumeroBufe="";
 searchNumeroBufe:string="";

 filterPropertyHoraInicio="";
 filterPropertyHoraFin="";
 filterPropertyNumeroCancha=""; 
 searchHoraInicio:string="";
 searchHoraFin:string="";
 searchNumeroCancha:string="";

 documento:any;
 nombre:any;
 apellido:any;
 mes:any;
 anio:any;

 generarPdf:boolean=false;


 transacciones:Array<Transaccion>;
 

  constructor(private fb:FormBuilder, private tService:TransaccionServicio, private router:Router, private rService: ReporteServicio){
    
this.transacciones = Array<Transaccion>();

    this.formularioTransacciones = fb.group({

      filtro: new FormControl('',), 
    });

  }

filtrarTransacciones(){

 this.limpiarCamposFiltro();

 this.displayPagoCuotaEntrenador=false;
 this.displayPagoCuotaJugador=false;
 this.displayPagoCuotaSocio=false;
 this.displayAlquilerCancha=false;
 this.displayAlquilerBufe=false;
 this.displayPagoServicio=false;
 this.displayPartidoIngreso=false;
 this.displayPartidoEgreso=false;

if(this.filtro == "Cuota entrenador"){
 
  this.displayPagoCuotaJugador=false;
  this.displayPagoCuotaSocio=false;
  this.displayAlquilerCancha=false;
  this.displayAlquilerBufe=false;
  this.displayPagoServicio=false;
  this.displayPartidoIngreso=false;
  this.displayPartidoEgreso=false; 
  
  
  this.transaccionesCuotaEntrenador();
  setTimeout(() => {
    this.transacciones.forEach(element => {
      element.documentoEntrenador = element.entrenador?.documento;
      element.nombreEntrenador = element.entrenador?.nombre;
      element.apellidoEntrenador = element.entrenador?.apellido;
      element.mesCuota = element.cuota?.mes;
      element.anioCuota = element.cuota?.anio;
    });
    
  }, 1000);

  setTimeout(() => {
    this.displayPagoCuotaEntrenador = true;
  }, 1500);

}

if(this.filtro == "Cuota jugador"){

  this.displayPagoCuotaEntrenador=false;
  this.displayPagoCuotaSocio=false;
  this.displayAlquilerCancha=false;
  this.displayAlquilerBufe=false;
  this.displayPagoServicio=false;
  this.displayPartidoIngreso=false;
  this.displayPartidoEgreso=false; 
 
  this.transaccionesCuotaJugador();
  setTimeout(() => {
    this.transacciones.forEach(element => {
      element.documentoJugador = element.jugador?.documento;
      element.nombreJugador = element.jugador?.nombre;
      element.apellidoJugador = element.jugador?.apellido;
      element.mesCuota = element.cuota?.mes;
      element.anioCuota = element.cuota?.anio;
    });
    
  }, 1000);
 
  setTimeout(() => {
    this.displayPagoCuotaJugador = true;
  }, 1500);
}

if(this.filtro == "Cuota socio"){

  this.displayPagoCuotaJugador=false;
  this.displayAlquilerCancha=false;
  this.displayAlquilerBufe=false;
  this.displayPagoServicio=false;
  this.displayPartidoIngreso=false;
  this.displayPartidoEgreso=false; 
  this.displayPagoCuotaEntrenador=false;
 

  this.transaccionesCuotaSocio();
  setTimeout(() => {
    this.transacciones.forEach(element => {
      element.documentoSocio = element.socio?.documento;
      element.nombreSocio = element.socio?.nombre;
      element.apellidoSocio = element.socio?.apellido;
      element.mesCuota = element.cuota?.mes;
      element.anioCuota = element.cuota?.anio;
    });

  }, 1000);

  setTimeout(() => {
     this.displayPagoCuotaSocio = true;
  }, 1500);

  
}

if(this.filtro == "Pago servicio"){

  this.displayPagoCuotaJugador=false;
  this.displayAlquilerCancha=false;
  this.displayAlquilerBufe=false;
  this.displayPagoCuotaSocio=false;
  this.displayPartidoIngreso=false;
  this.displayPartidoEgreso=false; 
  this.displayPagoCuotaEntrenador=false;
  this.transaccionesPagoServicio();
  setTimeout(() => {
    
    this.displayPagoServicio = true;
  }, 700);
  
}

if(this.filtro == "Ingreso partido"){

  this.displayPagoCuotaJugador=false;
  this.displayAlquilerCancha=false;
  this.displayAlquilerBufe=false;
  this.displayPagoCuotaSocio=false;
  this.displayPagoServicio=false;
  this.displayPartidoEgreso=false; 
  this.displayPagoCuotaEntrenador=false;

this.transaccionesPartidoIngreso();

  setTimeout(() => {
    this.transacciones.forEach(element => {
      element.descripcion = element.partido?.descripcion;
      element.cancha = element.partido?.cancha;
      element.nombreCategoria = element.partido?.categoria.nombre;
      element.tipoCategoria = element.partido?.categoria.tipo;
      element.deporte = element.partido?.categoria.deporte;
      element.entradas = element.partido?.ingresoEntradas;
    });

  }, 1000);

  setTimeout(() => {
    this.displayPartidoIngreso = true;
  }, 1500);

}

if(this.filtro == "Egreso partido"){

  this.displayPagoCuotaJugador=false;
  this.displayAlquilerCancha=false;
  this.displayAlquilerBufe=false;
  this.displayPagoCuotaSocio=false;
  this.displayPagoServicio=false;
  this.displayPartidoIngreso=false; 
  this.displayPagoCuotaEntrenador=false;

this.transaccionesPartidoEgreso();

  setTimeout(() => {
    this.transacciones.forEach(element => {
      element.descripcion = element.partido?.descripcion;
      element.cancha = element.partido?.cancha;
      element.nombreCategoria = element.partido?.categoria.nombre;
      element.tipoCategoria = element.partido?.categoria.tipo;
      element.deporte = element.partido?.categoria.deporte;
      element.arbitros = element.partido?.gastoArbitros;
      element.medicos = element.partido?.gastoMedicos;
      element.seguridad = element.partido?.gastoSeguridad;
      element.extra = element.partido?.gastoExtra;
      element.observaciones = element.partido?.observaciones;

    });

  }, 1000);

  setTimeout(() => {
    this.displayPartidoEgreso = true;
  }, 1500);

}
if(this.filtro == "Alquiler cancha"){

  this.displayPagoCuotaJugador=false;
  this.displayPartidoEgreso=false;
  this.displayAlquilerBufe=false;
  this.displayPagoCuotaSocio=false;
  this.displayPagoServicio=false;
  this.displayPartidoIngreso=false; 
  this.displayPagoCuotaEntrenador=false;

this.transaccionesAlquilerCancha();

  setTimeout(() => {
    this.transacciones.forEach(element => {

      element.numeroCancha = element.alquilerCancha?.cancha?.numero;
      element.horaInicio = element.alquilerCancha?.horaInicio;
      element.horaFin = element.alquilerCancha?.horaFin;
      element.observaciones = element.alquilerCancha?.observaciones;
    });

  }, 1300);

  setTimeout(() => {
    this.displayAlquilerCancha = true;
  }, 1500);

}

if(this.filtro == "Alquiler bufe"){


  this.displayPagoCuotaJugador=false;
  this.displayPartidoEgreso=false;
  this.displayAlquilerCancha=false;
  this.displayPagoCuotaSocio=false;
  this.displayPagoServicio=false;
  this.displayPartidoIngreso=false; 
  this.displayPagoCuotaEntrenador=false;

this.transaccionesAlquilerBufe();

  setTimeout(() => {
    this.transacciones.forEach(element => {
      element.numeroBufe = element.alquilerBufe?.bufe?.numeroBufe;
      console.log(element.numeroBufe);
      console.log(element.alquilerBufe?.bufe?.numeroBufe);
    });

  }, 1300);

  setTimeout(() => {
    this.displayAlquilerBufe = true;
  }, 1500);

}

this.generarPdf=true;

}

  volver(){

    if(this.router.url=="/homeAdministrador/transaccion"){ 
      this.router.navigate(['/homeAdministrador']);
      }
      else{
        this.router.navigate(['/homeInvitado']);
      }
  }

  transaccionesCuotaJugador(){

    this.tService.mostrarTransaccionesCuotaJugador().subscribe(res=>{
                
     this.transacciones=res;
    });
  }

  transaccionesCuotaEntrenador(){

    this.tService.mostrarTransaccionesCuotaEntrenador().subscribe(res=>{
                
     this.transacciones=res;
    });
  }

  transaccionesCuotaSocio(){

    this.tService.mostrarTransaccionesCuotaSocio().subscribe(res=>{
                
     this.transacciones=res;
    });
  }

  transaccionesPagoServicio(){

    this.tService.mostrarTransaccionesPagoServicio().subscribe(res=>{
                
     this.transacciones=res;
    });
  }

  transaccionesPartidoIngreso(){

    this.tService.mostrarTransaccionesPartidoIngreso().subscribe(res=>{
                
     this.transacciones=res;
    });
  }

  transaccionesPartidoEgreso(){

    this.tService.mostrarTransaccionesPartidoEgreso().subscribe(res=>{
                
     this.transacciones=res;
    });
  }

  transaccionesAlquilerCancha(){

    this.tService.mostrarTransaccionesAlquilerCancha().subscribe(res=>{
                
     this.transacciones=res;
    });
  }

  transaccionesAlquilerBufe(){

    this.tService.mostrarTransaccionesAlquilerBufe().subscribe(res=>{
                
     this.transacciones=res;
    });
  }

  onSearchJugadorName(searchName:string){
    this.searchName =searchName;
     
  }
  
  onSearchJugadorApellido(searchApellido:string){
    this.searchApellido = searchApellido;
  }
  
  onSearchJugadorDocumento(searchDocumento:string){
    this.searchDocumento = searchDocumento;
  }

  onSearchJugadorAnio(searchAnio:string){
    this.searchAnio =searchAnio;
     
  }
  
  onSearchJugadorMes(searchMes:string){
    this.searchMes = searchMes;
  }

  onSearchJugadorMedioPago(searchMedioPago:string){
    this.searchMedioPago = searchMedioPago;
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

  onSearchAlquilerBufeFecha(searchFecha:string){
    this.searchFecha =searchFecha;
     
  }
  
  onSearchAlquilerBufeNumeroBufe(searchNumeroBufe:string){
    this.searchNumeroBufe =searchNumeroBufe;
     
  }
  
  onSearchAlquilerBufeMedioPago(searchMedioPago:string){
    this.searchMedioPago =searchMedioPago;
     
  }

  onSearchAlquilerCanchaFecha(searchFecha:string){
    this.searchFecha =searchFecha;
     
  }
  
  onSearchAlquilerCanchaHoraInicio(searchHoraInicio:string){
    this.searchHoraInicio =searchHoraInicio;
     
  }
  
  
  onSearchAlquilerCanchaHoraFin(searchHoraFin:string){
    this.searchHoraFin =searchHoraFin;
     
  }
  
  
  onSearchAlquilerCanchaNumeroCancha(searchNumeroCancha:string){
    this.searchNumeroCancha =searchNumeroCancha;
     
  }
  
  onSearchAlquilerCanchaMedioPago(searchMedioPago:string){
    this.searchMedioPago =searchMedioPago;
     
  }

  onSearchPagoServicioDescripcion(searchDescripcion:string){
    this.searchDescripcion =searchDescripcion;
     
  }
  
  onSearchPagoServicioFecha(searchFecha:string){
    this.searchFecha = searchFecha;
  }

  onSearchPagoServicioMedioPago(searchMedioPago:string){
    this.searchMedioPago = searchMedioPago;
  }
  
  limpiarCamposFiltro(){
    
    this.filterPropertyName="";
    this.filterPropertyApellido="";
    this.filterPropertyDocumento="";
    this.filterPropertyAnio="";
    this.filterPropertyMes="";
    this.filterPropertyMedioPago="";
    this.searchName="";
    this.searchApellido="";
    this.searchDocumento="";
    this.searchAnio="";
    this.searchMes="";
    this.searchMedioPago="";

    this.filterPropertyDescripcion="";
    this.filterPropertyCancha="";
    this.filterPropertyCategoria="";
    this.filterPropertyTipoCategoria="";
    this.filterPropertyDeporte="";
    this.filterPropertyFecha="";
    this.searchDescripcion="";
    this.searchCancha="";
    this.searchCategoria="";
    this.searchTipoCategoria="";
    this.searchDeporte="";
    this.searchFecha="";

    this.filterPropertyNumeroBufe="";
    this.searchNumeroBufe="";

    this.filterPropertyHoraInicio="";
    this.filterPropertyHoraFin="";
    this.filterPropertyNumeroCancha=""; 
    this.searchHoraInicio="";
    this.searchHoraFin="";
    this.searchNumeroCancha="";
 
  }

filtroTransaccionesPagoCuota(values: any[], searchName: string, searchApellido:string, searchDocumento:string, searchAnio:string, searchMes:string, searchMedioPago:string): any[] { 

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

  filtroTransaccionesPartido(values: any[], searchDescripcion: string, searchCancha:string,searchCategoria: string, searchTipoCategoria:string, searchDeporte:string, searchFecha:string): any[] {

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

      if(values[0].categoria != null) {
     
    filterValues=filterValues.filter(value => value.categoria.nombre.toString().includes(searchCategoria));
      }
      else{
        filterValues=filterValues.filter(value => value.nombreCategoria.toString().includes(searchCategoria));
      }
  }

  if(searchTipoCategoria!=""){

    if(values[0].categoria != null) {

    values.forEach(value =>
      {
    let tipoCategoria:any=value.categoria.tipo;
    value.categoria.tipo= tipoCategoria.toLowerCase();
}
    );
  searchTipoCategoria=searchTipoCategoria.toLowerCase();
  filterValues=filterValues.filter(value => value.categoria?.tipo.includes(searchTipoCategoria));
    }
    else{
      values.forEach(value =>
        {
      let tipoCategoria:any=value.tipoCategoria;
      value.tipoCategoria= tipoCategoria.toLowerCase();
  }
      );
    searchTipoCategoria=searchTipoCategoria.toLowerCase();
    filterValues=filterValues.filter(value => value.tipoCategoria.includes(searchTipoCategoria));
    }
}

if(searchDeporte!=""){ 
  
  if(values[0].categoria !=null){

  values.forEach(value =>
    {
  let deporte:any=value.categoria.deporte;
  value.categoria.deporte = deporte.toLowerCase();

}
  );
  searchDeporte=searchDeporte.toLowerCase();
  filterValues= filterValues.filter(value => value.categoria.deporte?.includes(searchDeporte));

}
else{
  values.forEach(value =>
    {
  let deporte:any=value.deporte;
  value.deporte = deporte.toLowerCase();

}
  );
  searchDeporte=searchDeporte.toLowerCase();
  filterValues= filterValues.filter(value => value.deporte?.includes(searchDeporte));
}
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
  element.fecha = this.mayusculaPrimerLetra(element.fecha);
 
  if(values[0].categoria!=null){
    element.tipoCategoria = this.mayusculaPrimerLetra(element.tipoCategoria);
    element.deporte = this.mayusculaPrimerLetra(element.deporte);
  }
  else{

  }
  
  
});

return filterValues;

}

filtrarTransaccionesPagoServicio(values: any[], searchDescripcion: string, searchMedioPago:string, searchFecha:string): any[] {

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

filtroTransaccionesAlquilerBufe(values: any[], searchFecha: string, searchNumeroBufe:string, searchMedioPago:string): any[] {

  let filterValues=values;


if(values.length>0){

  if(searchFecha!=""){ 
  searchFecha = searchFecha.toLowerCase();
  values.forEach(value =>
    {
  let fecha:any=value.fecha;
  value.fecha= fecha.toLowerCase();

}
  );

  filterValues= filterValues.filter(value => value.fecha?.includes(searchFecha));

}

 
if(searchNumeroBufe.toString()!=""){ 
 
  filterValues= filterValues.filter(value => value.numeroBufe.toString().includes(searchNumeroBufe));
}

if(searchMedioPago!=""){
  searchMedioPago=searchMedioPago.toLowerCase();
  values.forEach(value =>
    {
  let medioPago:any=value.medioPago;
  value.medioPago= medioPago.toLowerCase();
}
  );

filterValues=filterValues.filter(value => value.medioPago?.includes(searchMedioPago));

}


}

 filterValues.forEach(element => {
   element.medioPago = this.mayusculaPrimerLetra(element.medioPago);
});

return filterValues;
}

filtroAlquilerCancha(values: any[], searchFecha:string, searchHoraInicio:string, searchHoraFin:string, searchNumeroCancha:string, searchMedioPago:string) : any[]{

  let filterValues=values;

  if(values.length>0){
  
    if(searchFecha!=""){ 
    searchFecha = searchFecha.toLowerCase();
    values.forEach(value =>
      {
    let fecha:any=value.fecha;
    value.fecha= fecha.toLowerCase();
  
}
    );
    //searchName=searchName.toLowerCase();
    filterValues= filterValues.filter(value => value.fecha?.includes(searchFecha));


  }
    
    if(searchHoraInicio!=""){
      searchHoraInicio = searchHoraInicio.toLowerCase();
      values.forEach(value =>
        {
      let horaInicio:any=value.horaInicio;
      value.horaInicio= horaInicio.toLowerCase();
  }
      );
    //searchHoraInicio=searchHoraInicio.toLowerCase();
    filterValues=filterValues.filter(value => value.horaInicio?.includes(searchHoraInicio));
    
    }

    if(searchHoraFin!=""){
      searchHoraFin = searchHoraFin.toLowerCase();
      values.forEach(value =>
        {
      let horaFin:any=value.horaFin;
      value.horaFin= horaFin.toLowerCase();
  }
      );
    //searchHoraInicio=searchHoraInicio.toLowerCase();
    filterValues=filterValues.filter(value => value.horaFin?.includes(searchHoraFin));
    
    }

   
  if(searchNumeroCancha.toString()!=""){ 
   
    filterValues= filterValues.filter(value => value.numeroCancha?.toString().includes(searchNumeroCancha));
  }

  if(searchMedioPago!=""){
    searchMedioPago=searchMedioPago.toLowerCase();
    values.forEach(value =>
      {
    let medioPago:any=value.medioPago;
    value.medioPago= medioPago.toLowerCase();
}
    );

  filterValues=filterValues.filter(value => value.medioPago?.includes(searchMedioPago));
  
  }

  }
  
   filterValues.forEach(element => {
     element.medioPago = this.mayusculaPrimerLetra(element.medioPago);
  });

  return filterValues;
  }

  mayusculaPrimerLetra(string:String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  imprimir(){

if(this.transacciones[0].entrenador!=null || this.transacciones[0].jugador!=null || this.transacciones[0].socio!=null){

  const encabezado = ["Documento", "Nombre", "Año", "Mes", "Precio", "Medio", "Fecha de pago"];
  
    let transaccionPagoCuotaFiltrado: Array<Transaccion>;
    transaccionPagoCuotaFiltrado= new Array<Transaccion>();
   
    transaccionPagoCuotaFiltrado= this.filtroTransaccionesPagoCuota(this.transacciones,  this.searchName, this.searchApellido, this.searchDocumento, this.searchAnio, this.searchMes, this.searchMedioPago);
  
if(this.transacciones[0].entrenador!=null) { 

   const cuerpo =  transaccionPagoCuotaFiltrado.map(
  
    (obj : Transaccion) => {
      const datos = [
        obj.documentoEntrenador,
        obj.nombreEntrenador + " " + obj.apellidoEntrenador,
        obj.cuota?.anio,
        obj.cuota?.mes,
        obj.importe,
        obj.medioPago,
        obj.fecha
      ]
      return datos;
    }
   )
  
  this.rService.imprimir(encabezado, cuerpo, "Listado de transacciones de pago cuota entrenadores", true);

  }

  else{
    if(this.transacciones[0].jugador!=null){
      
      const cuerpo =  transaccionPagoCuotaFiltrado.map(
  
        (obj : Transaccion) => {
          const datos = [
            obj.documentoJugador,
            obj.nombreJugador + " " + obj.apellidoJugador,
            obj.cuota?.anio,
            obj.cuota?.mes,
            obj.importe,
            obj.medioPago,
            obj.fecha
          ]
          return datos;
        }
       )
      
      this.rService.imprimir(encabezado, cuerpo, "Listado de transacciones de pago cuota jugadores", true);
    
    }

    else{
      if(this.transacciones[0].socio!=null){
  
        const cuerpo =  transaccionPagoCuotaFiltrado.map(
  
          (obj : Transaccion) => {
            const datos = [
              obj.documentoSocio,
              obj.nombreSocio + " " + obj.apellidoSocio,
              obj.cuota?.anio,
              obj.cuota?.mes,
              obj.importe,
              obj.medioPago,
              obj.fecha
            ]
            return datos;
          }
         )
        
        this.rService.imprimir(encabezado, cuerpo, "Listado de transacciones de pago cuota socios", true);
      
      }
  }
  }

  }

  if(this.transacciones[0].partido!=null){

    if(this.transacciones[0].tipo=="Ingreso"){
      const encabezado = ["Descripcion", "Cancha", "Categoria", "Tipo de categoría", "Deporte", "Fecha","Entradas"];
  
      let partidoIngresosFiltrado: Array<Transaccion>;
      partidoIngresosFiltrado = new Array<Transaccion>();
     
      partidoIngresosFiltrado= this.filtroTransaccionesPartido(this.transacciones, this.searchDescripcion, this.searchCancha, this.searchCategoria, this.searchTipoCategoria, this.searchDeporte, this.searchFecha);
    
     const cuerpo =  partidoIngresosFiltrado.map(
    
      (obj : Transaccion) => {
        const datos = [
          obj.descripcion,
          obj.cancha,
          obj.nombreCategoria,
          obj.tipoCategoria,
          obj.deporte,
          obj.fecha,
          obj.entradas
        ]
        return datos;
      }
     )
    
    this.rService.imprimir(encabezado, cuerpo, "Listado de ingresos de entradas de partidos", true);
    
    }
    else
{
  const encabezado = ["Descripción", "Cancha", "Categoría", "Tipo categoría", "Deporte", "Fecha", "Gasto total", "Observaciones"];
  
  let partidoEgresosFiltrado: Array<Transaccion>;
  partidoEgresosFiltrado = new Array<Transaccion>();
 
  partidoEgresosFiltrado= this.filtroTransaccionesPartido(this.transacciones, this.searchDescripcion, this.searchCancha, this.searchCategoria, this.searchTipoCategoria, this.searchDeporte, this.searchFecha);

  partidoEgresosFiltrado.forEach(element => {
    element.gastoTotal=element.arbitros+element.medicos+element.seguridad+element.extra;
  });

  setTimeout(() => {
    
 const cuerpo =  partidoEgresosFiltrado.map(

  (obj : Transaccion) => {
    const datos = [
      obj.descripcion,
      obj.cancha,
      obj.nombreCategoria,
      obj.tipoCategoria,
      obj.deporte,
      obj.fecha,
      obj.gastoTotal,
      obj.observaciones
    ]
    return datos;
  }
 )

this.rService.imprimir(encabezado, cuerpo, "Listado de gastos de partidos ", true);

}, 300);

}
    }

    if(this.transacciones[0].pagoServicio!=null){

      const encabezado = ["Descricion", "Importe", "Medio de pago", "Fecha de pago"];
          
            let pagoServicioFiltrado: Array<Transaccion>;
            pagoServicioFiltrado = new Array<Transaccion>();
           
            pagoServicioFiltrado= this.filtrarTransaccionesPagoServicio(this.transacciones, this.searchDescripcion, this.searchMedioPago, this.searchFecha);
          
           const cuerpo =  pagoServicioFiltrado.map(
          
            (obj : Transaccion) => {
              const datos = [
                obj.descripcion,
                obj.importe,
                obj.medioPago,
                obj.fecha
              ]
              return datos;
            }
           )
          
          this.rService.imprimir(encabezado, cuerpo, "Listado de pagos de servicios", true);
    }

    if(this.transacciones[0].alquilerBufe!=null){

      const encabezado = ["Bufe", "Fecha", "Importe", "Medio de pago",];

  let alquilerBufeFiltrado: Array<Transaccion>;
  alquilerBufeFiltrado = new Array<Transaccion>();
 
  alquilerBufeFiltrado= this.filtroTransaccionesAlquilerBufe(this.transacciones, this.searchFecha, this.searchNumeroBufe, this.searchMedioPago);

 const cuerpo =  alquilerBufeFiltrado.map(

  (obj : Transaccion) => {
    const datos = [
      obj.numeroBufe,
      obj.fecha,
      obj.importe,
      obj.medioPago
    ]
    return datos;
  }
 )

this.rService.imprimir(encabezado, cuerpo, "Listado de alquileres de bufé", true);
    }

    if(this.transacciones[0].alquilerCancha!=null){
    
      const encabezado = ["Cancha", "Fecha", "Hora inicio", "Hora fin", "Importe", "Pago", "Observaciones",];

  let alquilerCanchaFiltrado: Array<Transaccion>;
  alquilerCanchaFiltrado = new Array<Transaccion>();
 
  alquilerCanchaFiltrado= this.filtroAlquilerCancha(this.transacciones, this.searchFecha, this.searchHoraInicio, this.searchHoraFin, this.searchNumeroCancha, this.searchMedioPago);

 const cuerpo =  alquilerCanchaFiltrado.map(

  (obj : Transaccion) => {
    const datos = [
      obj.numeroCancha,
      obj.fecha,
      obj.horaInicio,
      obj.horaFin,
      obj.importe,
      obj.medioPago,
      obj.observaciones
    ]
    return datos;
  }
 )

this.rService.imprimir(encabezado, cuerpo, "Listado de alquileres de cancha", true);

    }
}

}


