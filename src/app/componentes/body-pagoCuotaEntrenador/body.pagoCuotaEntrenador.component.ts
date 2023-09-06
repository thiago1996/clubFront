import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { PagoCuotaEntrenadorServicio } from 'src/app/servicio/pagoCuotaEntrenador.servicio';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import { Entrenador} from '../../modelo/Entrenador';
import { PagoCuotaEntrenador} from '../../modelo/PagoCuotaEntrenador';
import { Cuota } from '../../modelo/Cuota';
import Swal from 'sweetalert2';
import { ReporteServicio } from 'src/app/servicio/reporte.servicio';
import { Router } from '@angular/router';
import { TransaccionServicio } from 'src/app/servicio/transaccion.servicio';
import { Transaccion } from 'src/app/modelo/Transaccion';
import { EntrenadorServicio } from 'src/app/servicio/entrenador.servicio';

@Component({
  selector: 'app-body-pagoCuotaEntrenador',
  templateUrl: './body.pagoCuotaEntrenador.component.html',
  styleUrls: ['./body.pagoCuotaEntrenador.component.css']
})
export class BodyPagoCuotaEntrenadorComponent {

  entrenadores:Array<Entrenador>;
  formularioEntrenadorCuota: FormGroup;
  formularioModificarEntrenadorCuota: FormGroup;
  //display:boolean;
  datosEntrenador:String="default";
  documento:any;
  id_cuota:any;
  //cuotaPorParametros: Cuota;
  mes:number;
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
  documentoEntrenadorAModificar:any;
  nombreEntrenadorAModificar:String= "";
  apellidoEntrenadorAModificar:String= "";
  anioCuotaAModificar:any;
  mesCuotaAModificar:any;
  id_cuotaAModificar:any;
  ids:Array<number>=[];
  display:boolean=false;
  entrenadoresCuotas:Array<PagoCuotaEntrenador>;
  medioPago:string="default";
  medioPagoModificar:string="default";
  importeAModificar:any;
  medioPagoAModificar:any;
  generarPdf:boolean=false;
  cuota:Cuota;
  cuotaModificar:any;
  idTransaccion:any

constructor(private fb:FormBuilder, private pceService: PagoCuotaEntrenadorServicio, private cService: CuentaServicio, private eService:EntrenadorServicio, private rService:ReporteServicio, private tService:TransaccionServicio, private router:Router){

  //this.display=false;
    this.entrenadores=[];
    this.entrenadoresCuotas=[];
    this.mostrarEntrenadores();
    this.cuota= new Cuota();
    this.mes=0;
   // this.id_cuota=0;
    //this.cuotaPorParametros = new Cuota();
    //this.cuotaPorParametros.id_cuota=0;

 
  this.formularioEntrenadorCuota = fb.group({
    datosEntrenador: new FormControl('', Validators.required),
    anio: new FormControl('', Validators.required), 
    mes: new FormControl('', Validators.required),
    importe: new FormControl('', Validators.required),
    medioPago: new FormControl('', Validators.required),
    fechaPago: new FormControl('', Validators.required)
    

  });

  this.formularioModificarEntrenadorCuota = fb.group({
    importe: new FormControl('', Validators.required),
    medioPagoModificar: new FormControl('', Validators.required),
    fechaPago: new FormControl('', Validators.required)
    

  });

}

//Crear pagoCuotaEntrenador
crearPagoCuotaEntrenador(){
if(this.formularioEntrenadorCuota.valid){

  let anio:number;
  
  let importe:number;
  let fechaPago:Date;
  //let id_cuota:any=0;
  let fecha:any;
  let numeroMesFecha:number;
  let mesFecha:String="";
  let numeroDiaFecha:number;
  let diaFecha:String="";
  let control:Boolean=false;
  let nombre:any;
  let apellido:any;
  let entrenador:Entrenador;
  let transaccion:Transaccion;
  transaccion = new Transaccion();

  entrenador = new Entrenador();

  anio = this.formularioEntrenadorCuota.get('anio')?.value;
  this.mes= this.formularioEntrenadorCuota.get('mes')?.value;

 this.mostrarCuotaPorParametros(anio, this.mes);
 
  setTimeout(() => {
  
if(this.id_cuota==undefined){
  Swal.fire({
    icon: 'error',
    title: 'Registro fallido',
    text: 'No existe una cuota con los datos ingresados!',
    footer: 'Debe crear una cuota con los datos ingresados'
  })
}
  else{

    this.mostrarCuotaPorParametros(anio, this.mes);
  this.datosEntrenador = this.formularioEntrenadorCuota.get('datosEntrenador')?.value;
  
  if(this.datosEntrenador =="default")
  {
     Swal.fire({
       icon: 'error',
       title: 'Registro fallido',
       text: 'Los datos son incorrectos!',
       footer: 'Debe seleccionar un jugador'
     })
     
  }

  else{

  importe= this.formularioEntrenadorCuota.get('importe')?.value;
  fechaPago = this.formularioEntrenadorCuota.get('fechaPago')?.value;

  let array:Array<String>;
  array = this.datosEntrenador.split("-");

  this.documento=array[0].trim();

  this.pceService.buscarEntrenadorPorDocumento(this.documento).subscribe(res =>{

    entrenador = res;
   
    });

  this.pceService.existeCuotaEnPagoCuota(this.id_cuota, this.documento).subscribe(res=>{

    control = res;
  })
  setTimeout(() => {
    
  if(control){

    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'Ya existe un pago asociado con los datos ingresados!',
      footer: 'Verifique los datos de cuota y/o entrenador ingresados'
    })
  }
  
  else{

 
  numeroMesFecha=fechaPago.getMonth()+1;
  mesFecha= numeroMesFecha.toString();
  numeroDiaFecha=fechaPago.getDate();
  diaFecha= numeroDiaFecha.toString();
  
  //this.mostrarCuotaPorParametros(anio, this.mes);

  if(numeroMesFecha<10)
  {
    mesFecha="0"+numeroMesFecha;
  }
  else
  {
    mesFecha= numeroMesFecha.toString();
  }

  if(numeroDiaFecha<10)
  {
    diaFecha="0"+numeroDiaFecha;
   
  }
  
  else{
    diaFecha= numeroDiaFecha.toString();
  }


  fecha=fechaPago.getFullYear()+'-'+mesFecha+'-'+diaFecha;
 
//setTimeout(()=>{
 
      /*
    if(this.cuotaPorParametros.anio==anio && this.cuotaPorParametros.mes==this.mes){
      id_cuota = this.cuotaPorParametros.id_cuota; 
    }
*/
nombre=entrenador.nombre?.trim();
apellido=entrenador.apellido?.trim();

  this.pceService.crearPagoCuotaEntrenador(this.id_cuota, this.documento, nombre, apellido, importe,this.medioPago, fecha).subscribe(res =>{

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pago de cuota registrado con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
   this.mostrarTabla();

   if(this.medioPago == "Efectivo"){

    this.cService.egresoEfectivo(importe).subscribe(res=>{

    });
   }
   else{
    this.cService.egresoDebito(importe).subscribe(res=>{

    });
   }

   transaccion.tipo="Egreso";
   transaccion.cuota=this.cuota;
   transaccion.fecha=fecha;
   transaccion.medioPago=this.medioPago;
   transaccion.importe=importe;
   transaccion.entrenador=entrenador;
   transaccion.descripcion=entrenador.nombre+" "+entrenador.apellido+" "+this.cuota.mes+"/"+this.cuota.anio;

   console.log(transaccion);
this.tService.crearTransaccion(transaccion).subscribe(res=>{
             
});

  });
//},500);

   }

  },500);
  

  }
}

}, 500);
}

} 

activador(entrenadorCuota: PagoCuotaEntrenador){


  this.formularioModificarEntrenadorCuota.get('fechaPago')?.setValue(entrenadorCuota.fechaPago);
  this.formularioModificarEntrenadorCuota.get('importe')?.setValue(entrenadorCuota.importe);
  this.formularioModificarEntrenadorCuota.get('medioPagoModificar')?.setValue(entrenadorCuota.medioPago);
  console.log(entrenadorCuota.importe);
  this.documentoEntrenadorAModificar=entrenadorCuota.documento!.toString();
  this.nombreEntrenadorAModificar=entrenadorCuota.nombre!.toString();
  this.apellidoEntrenadorAModificar=entrenadorCuota.apellido!.toString();
  this.anioCuotaAModificar=entrenadorCuota.anioCuota;
  this.mesCuotaAModificar=entrenadorCuota.mesCuota;
  this.ids=Object.values(entrenadorCuota.id);
  this.id_cuotaAModificar=this.ids[0];
  this.documentoEntrenadorAModificar=this.ids[1];
  this.importeAModificar = entrenadorCuota.importe;
  this.medioPagoAModificar = entrenadorCuota.medioPago;
  this.cuotaModificar=entrenadorCuota.cuota

  this.display= !this.display;
 
}

mostrarEntrenadores(){
  this.pceService.mostrarEntrenadores().subscribe(res =>{
    
      this.entrenadores = res;
    
  });

}

mostrarCuotaPorParametros(año:number, mes:number){

  this.pceService.mostrarCuotaPorParametros(año, mes).subscribe(res =>{
   // this.cuotaPorParametros = res;
   if(res!=null){ 
  this.id_cuota=res.id_cuota;
  this.cuota = res;
   }
   else{
    this.id_cuota=undefined;
   }
  })
}

mostrarEntrenadoresCuotas(){
  this.pceService.mostrarPagoCuotaEntrenador().subscribe(res =>{
    
      this.entrenadoresCuotas = res;
      let entrenador:Array<any>;
      let documento:any;
      let ids:Array<number>;

      this.entrenadoresCuotas.forEach(entrenadorCuota => {
        
      entrenadorCuota.anioCuota = entrenadorCuota.cuota?.anio?.toString();
      entrenadorCuota.mesCuota = entrenadorCuota.cuota?.mes?.toString();
      ids=Object.values(entrenadorCuota.id);
      documento=ids[1];
      entrenadorCuota.documento=documento;
        
      this.pceService.buscarEntrenadorPorDocumento(documento).subscribe(res =>{

        entrenador = Object.values(res);
        
        console.log(entrenador [1] +" "+ entrenador[2]);
        entrenadorCuota.apellido = entrenador[2];
        entrenadorCuota.nombre = entrenador[1];

        console.log(entrenadorCuota);
      });
  
      
      
    
      });
        
    
    
  });

}

modificarEntrenadorCuota(){

  if(this.formularioModificarEntrenadorCuota.valid){


    let importe:number;
    let fechaPago:String;
    let control = false;
    let transaccion:Transaccion;
    let entrenador:Entrenador;

    entrenador = new Entrenador();
    transaccion = new Transaccion();
    importe = this.formularioModificarEntrenadorCuota.get('importe')?.value;
    fechaPago = this.formularioModificarEntrenadorCuota.get('fechaPago')?.value;
    this.medioPagoModificar = this.formularioModificarEntrenadorCuota.get('medioPagoModificar')?.value;

    this.idTransaccionPorIdPagoCuotaEntrenador(this.documentoEntrenadorAModificar, this.id_cuotaAModificar);  

    this.pceService.crearPagoCuotaEntrenador(this.id_cuotaAModificar, this.documentoEntrenadorAModificar, this.nombreEntrenadorAModificar, this.apellidoEntrenadorAModificar, importe, this.medioPagoModificar,fechaPago).subscribe(res =>{
      this.display = !this.display;
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pago de cuota actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      control = true;
      this.mostrarEntrenadoresCuotas();

      if(this.medioPagoAModificar == this.medioPagoModificar){
        if(this.importeAModificar!=importe){
          if(this.medioPagoModificar == "Efectivo"){
         
          this.cService.ingresoEfectivo(this.importeAModificar).subscribe(res=> {
            this.cService.egresoEfectivo(importe).subscribe(res=>{
             })
           })  
          

          }
          else{
          
            this.cService.ingresoDebito(this.importeAModificar).subscribe(res=> {
              this.cService.egresoDebito(importe).subscribe(res=>{
               })
             })
            
          }
        }
      }

      else{
      
        if(this.medioPagoModificar=="Efectivo"){

          if(this.importeAModificar!=importe){
             
            
            this.cService.ingresoDebito(this.importeAModificar).subscribe(res=> {
             this.cService.egresoEfectivo(importe).subscribe(res=> { 
             }) 
            })
            
            }
            else{
              
              this.cService.ingresoDebito(this.importeAModificar).subscribe(res=> {
                this.cService.egresoEfectivo(this.importeAModificar).subscribe(res=> { 
                 })
               })
              
            }
        }
        else{
          if(this.importeAModificar!=importe){
            
            this.cService.ingresoEfectivo(this.importeAModificar).subscribe(res=> {
              this.cService.egresoDebito(importe).subscribe(res=> { 
               })
             })
            
            }
            else{
              
              this.cService.ingresoEfectivo(this.importeAModificar).subscribe(res=> {
                this.cService.egresoDebito(this.importeAModificar).subscribe(res=> {  
                })
               })
             
            }
        }
      }

      this.eService.obtenerEntrenadorPorDocumento(this.documentoEntrenadorAModificar).subscribe(res=> {  
      entrenador = res;
      })   

      setTimeout(() => {
        

        if(this.idTransaccion!=0){

          transaccion.id = this.idTransaccion;
         }

      transaccion.id=this.idTransaccion;
      transaccion.tipo="Egreso";
      transaccion.cuota=this.cuotaModificar;
      transaccion.fecha=fechaPago;
      transaccion.medioPago=this.medioPagoModificar;
      transaccion.importe=importe;
      transaccion.entrenador=entrenador;
      transaccion.descripcion=entrenador.documento+" "+entrenador.nombre+" "+entrenador.apellido+" "+this.cuotaModificar.mes+"/"+this.cuotaModificar.anio;
   
      this.formularioModificarEntrenadorCuota.reset();

      console.log(transaccion);
   this.tService.crearTransaccion(transaccion).subscribe(res=>{
                
   });

  }, 300);

    });
    
    setTimeout(() => {
      
    
    if(control==false){
      this.display = !this.display;
      Swal.fire({
        icon: 'error',
        title: 'Actualización fallida',
        text: 'Los datos son incorrectos!',
        footer: 'Verifique los datos ingresados en el formulario, el precio debe ser un valor númerico'
      })
    }
  }, 1500);
  }


  }

mostrarTabla(){
  this.mostrarEntrenadoresCuotas();
  setTimeout(()=>{

  let tabla = document.getElementById('listadoPagosCuotasEntrenadores')
  if(tabla)  tabla.style.display = "block"; 
  this.generarPdf=true;
},1000);
}

eliminarEntrenadorCuota(entrenadorCuota:PagoCuotaEntrenador){
  let id_cuota:any = entrenadorCuota.cuota?.id_cuota;
  let documentoJugador:any = entrenadorCuota.documento;
  let medio:any = entrenadorCuota.medioPago;
  let importe:any = entrenadorCuota.importe;

  this.idTransaccionPorIdPagoCuotaEntrenador(documentoJugador, id_cuota);

  setTimeout(() => {
    
this.tService.eliminarTransaccion(this.idTransaccion).subscribe(res=>{
                
});

  }, 500);

  setTimeout(() => {
    
  
  this.pceService.eliminarPagoCuotaEntrenador(id_cuota, documentoJugador).subscribe(res =>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pago eliminado con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarEntrenadoresCuotas();

    if(medio =="Efectivo"){
     
      this.cService.ingresoEfectivo(importe).subscribe(res => {
   });
   }
   else{
     
     this.cService.ingresoDebito(importe).subscribe(res => {
     });
   }

    });
  }, 500);
    }


    onSearchEntrenadorName(searchName:string){
      this.searchName =searchName;
       
    }
    
    onSearchEntrenadorApellido(searchApellido:string){
      this.searchApellido = searchApellido;
    }
    
    onSearchEntrenadorDocumento(searchDocumento:string){
      this.searchDocumento = searchDocumento;
    }

    onSearchEntrenadorAnio(searchAnio:string){
      this.searchAnio =searchAnio;
       
    }
    
    onSearchEntrenadorMes(searchMes:string){
      this.searchMes = searchMes;
    }

    onSearchEntrenadorMedioPago(searchMedioPago:string){
      this.searchMedioPago = searchMedioPago;
    }

    cerrar(){
      this.display = !this.display;
    }

    imprimir(){

      const encabezado = ["Documento", "Nombre", "Año", "Mes", "Importe", "Medio", "Fecha de pago"];
    
      let entrenadorCuotaFiltrado: Array<PagoCuotaEntrenador>;
      entrenadorCuotaFiltrado = new Array<PagoCuotaEntrenador>();
     
      entrenadorCuotaFiltrado= this.filtroEntrenadorCuota(this.entrenadoresCuotas, this.searchName, this.searchApellido, this.searchDocumento, this.searchAnio, this.searchMes, this.searchMedioPago);
    
     const cuerpo =  entrenadorCuotaFiltrado.map(
    
      (obj : PagoCuotaEntrenador) => {
        const datos = [
          obj.documento,
          obj.nombre + " " + obj.apellido,
          obj.anioCuota,
          obj.mesCuota,
          obj.importe,
          obj.medioPago,
          obj.fechaPago
        ]
        return datos;
      }
     )
    
    this.rService.imprimir(encabezado, cuerpo, "Listado de pago de cuotas de entrenadores", true);
    
    }
    
    filtroEntrenadorCuota(values: PagoCuotaEntrenador[], searchName: string, searchApellido:string,searchDocumento: string, searchAnio:string, searchMes:string, searchMedioPago:string): any[] {

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

      volver(){

        if(this.router.url=="/homeAdministrador/pagoCuotaEntrenador/nuevo"){ 
          this.router.navigate(['/homeAdministrador']);
          }
          else{
            this.router.navigate(['/homeInvitado']);
          }
      }

      idTransaccionPorIdPagoCuotaEntrenador(documento:number, idCuota:number){

        this.tService.mostrarTransaccionesPorEntrenadorYCuota(documento, idCuota).subscribe(res=>{
                    
         this.idTransaccion=res[0].id;
        });
      }
}