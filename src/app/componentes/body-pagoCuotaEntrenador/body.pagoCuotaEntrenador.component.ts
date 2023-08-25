import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { PagoCuotaEntrenadorServicio } from 'src/app/servicio/pagoCuotaEntrenador.servicio';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import { Entrenador} from '../../modelo/Entrenador';
import { PagoCuotaEntrenador} from '../../modelo/PagoCuotaEntrenador';
import { Cuota } from '../../modelo/Cuota';
import Swal from 'sweetalert2';

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

constructor(private fb:FormBuilder, private pceService: PagoCuotaEntrenadorServicio, private cService: CuentaServicio){

  //this.display=false;
    this.entrenadores=[];
    this.entrenadoresCuotas=[];
    this.mostrarEntrenadores();
  
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
  console.log(this.id_cuota);
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

    importe = this.formularioModificarEntrenadorCuota.get('importe')?.value;
    fechaPago = this.formularioModificarEntrenadorCuota.get('fechaPago')?.value;
    this.medioPagoModificar = this.formularioModificarEntrenadorCuota.get('medioPagoModificar')?.value;


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

      this.formularioModificarEntrenadorCuota.reset();
      
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
},1000);
}

eliminarEntrenadorCuota(entrenadorCuota:PagoCuotaEntrenador){
  let id_cuota:any = entrenadorCuota.cuota?.id_cuota;
  let documentoJugador:any = entrenadorCuota.documento;
  let medio:any = entrenadorCuota.medioPago;
  let importe:any = entrenadorCuota.importe;

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

}