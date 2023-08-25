import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { JugadorCuotaServicio } from 'src/app/servicio/jugadorCuota.servicio';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import { Jugador} from '../../modelo/Jugador';
import { Cuota } from '../../modelo/Cuota';
import { JugadorCuota } from 'src/app/modelo/JugadorCuota';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body-jugadorCuota',
  templateUrl: './body.jugadorCuota.component.html',
  styleUrls: ['./body.jugadorCuota.component.css']
})
export class BodyJugadorCuotaComponent {

  jugadores:Array<Jugador>;
  formularioJugadorCuota: FormGroup;
  formularioModificarJugadorCuota: FormGroup;
  //display:boolean;
  datosJugador:String="default";
  documento:any;
  //cuotaPorParametros: Cuota;
  mes:number;
  id_cuota:any;
  id_cuotaAModificar:any;
  display:boolean=false;
  ids:Array<number>=[];
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
  documentoJugadorAModificar:any;
  nombreJugadorAModificar:String= "";
  apellidoJugadorAModificar:String= "";
  anioCuotaAModificar:any;
  mesCuotaAModificar:any;
  jugadoresCuotas:Array<JugadorCuota>;
  medioPago:string="default";
  medioPagoModificar:string="default";
  precioAModificar:any;
  medioPagoAModificar:any;

constructor(private fb:FormBuilder, private jcService: JugadorCuotaServicio, private cService: CuentaServicio){

  //this.display=false;
    this.jugadores=[];
    this.jugadoresCuotas=[];
    this.mostrarJugadores();
  
    this.mes=0;
    
  //  this.cuotaPorParametros = new Cuota();
   

 
  this.formularioJugadorCuota = fb.group({
    datosJugador: new FormControl('', Validators.required),
    anio: new FormControl('', Validators.required), 
    mes: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    medioPago: new FormControl('', Validators.required),
    fechaPago: new FormControl('', Validators.required)
    

  });

  this.formularioModificarJugadorCuota = fb.group({
    precio: new FormControl('', Validators.required),
    medioPagoModificar: new FormControl('', Validators.required),
    fechaPago: new FormControl('', Validators.required)
    

  });
}

//Crear socioCuota
crearJugadorCuota(){
if(this.formularioJugadorCuota.valid){

  let anio:number;
  
  let precio:number;
  let fechaPago:Date;
  //let id_cuota:any;
  let fecha:any;
  let numeroMesFecha:number;
  let mesFecha:String="";
  let numeroDiaFecha:number;
  let diaFecha:String="";
  let control:Boolean=false;
  let jugador:Jugador;
  let nombre:any;
  let apellido:any;

  jugador = new Jugador();

  this.datosJugador = this.formularioJugadorCuota.get('datosJugador')?.value;

  if(this.datosJugador =="default")
  {
     Swal.fire({
       icon: 'error',
       title: 'Registro fallido',
       text: 'Los datos son incorrectos!',
       footer: 'Debe seleccionar un jugador'
     })
     
  }
 
  else{

  anio = this.formularioJugadorCuota.get('anio')?.value;
  this.mes= this.formularioJugadorCuota.get('mes')?.value;
  precio= this.formularioJugadorCuota.get('precio')?.value;
  fechaPago = this.formularioJugadorCuota.get('fechaPago')?.value;

  this.mostrarCuotaPorParametros(anio, this.mes);


  setTimeout(() => {
  
  console.log(this.id_cuota);

if(this.id_cuota==undefined){
  Swal.fire({
    icon: 'error',
    title: 'Registro fallido',
    text: 'No existe una cuota con los datos ingresados!',
    footer: 'Debe crear una cuota con los datos ingresados'
  })
}
  else{

   // this.mostrarCuotaPorParametros(anio, this.mes);
  
  let array:Array<String>;
  array = this.datosJugador.split("-");
 
  this.documento=array[0].trim();

  this.jcService.buscarJugadorPorDocumento(this.documento).subscribe(res =>{

    jugador = res;
   
    });

  this.jcService.existeCuotaEnJugadorCuota(this.id_cuota, this.documento).subscribe(res=>{

    control = res;
  })
  setTimeout(() => {
    
  
console.log("err  "+control);
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

  nombre=jugador.nombre?.trim();
  apellido=jugador.apellido?.trim();

 this.jcService.crearJugadorCuota(this.id_cuota, this.documento, nombre, apellido, precio, this.medioPago, fecha).subscribe(res =>{

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Pago de cuota registrado con éxito!',
    showConfirmButton: false,
    timer: 1500
  })
  this.mostrarTabla();
  if(this.medioPago == "Efectivo"){

    this.cService.ingresoEfectivo(precio).subscribe(res=>{

    });
   }
   else{
    this.cService.ingresoDebito(precio).subscribe(res=>{

    });
   }

});

}

}, 500);
  }

}, 500);

}
  }

  else{
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'Los datos son incorrectos!',
      footer: 'Verifique los datos ingresados en el formulario, debe completar datos válidos'
    })
}

}



activador(jugadorCuota: JugadorCuota){


  this.formularioModificarJugadorCuota.get('fechaPago')?.setValue(jugadorCuota.fechaPago);
  this.formularioModificarJugadorCuota.get('precio')?.setValue(jugadorCuota.precio);
  this.formularioModificarJugadorCuota.get('medioPagoModificar')?.setValue(jugadorCuota.medioPago);
  this.documentoJugadorAModificar=jugadorCuota.documento!.toString();
  this.nombreJugadorAModificar=jugadorCuota.nombre!.toString();
  this.apellidoJugadorAModificar=jugadorCuota.apellido!.toString();
  this.anioCuotaAModificar=jugadorCuota.anioCuota;
  this.mesCuotaAModificar=jugadorCuota.mesCuota;
  this.ids=Object.values(jugadorCuota.id);
  this.id_cuotaAModificar=this.ids[0];
  this.documentoJugadorAModificar=this.ids[1];
  this.precioAModificar = jugadorCuota.precio;
  this.medioPagoAModificar = jugadorCuota.medioPago;

  this.display= !this.display;
 
}


mostrarJugadores(){
  this.jcService.mostrarJugadores().subscribe(res =>{
    
      this.jugadores = res;
    
  });

}

mostrarCuotaPorParametros(año:number, mes:number){

  this.jcService.mostrarCuotaPorParametros(año, mes).subscribe(res =>{
    if(res!=null){ 
      this.id_cuota=res.id_cuota;
      console.log(this.id_cuota);
       }
       else{
        this.id_cuota=undefined;
       }
      })
 
}

mostrarJugadoresCuotas(){
  this.jcService.mostrarJugadorCuota().subscribe(res =>{
    
      this.jugadoresCuotas = res;
      let socio:Array<any>;
      let documento:any;
      let ids:Array<number>;

      this.jugadoresCuotas.forEach(jugadorCuota => {
        
      jugadorCuota.anioCuota = jugadorCuota.cuota?.anio?.toString();
      jugadorCuota.mesCuota = jugadorCuota.cuota?.mes?.toString();
      ids=Object.values(jugadorCuota.id);
      documento=ids[1];
      jugadorCuota.documento=documento;
        
      this.jcService.buscarJugadorPorDocumento(documento).subscribe(res =>{

        socio = Object.values(res);
        jugadorCuota.apellido = socio[2];
        jugadorCuota.nombre = socio[1];
      });
  
      
      
    
      });
        
    
    
  });

}

modificarJugadorCuota(){

  if(this.formularioModificarJugadorCuota.valid){


    let precio:number;
    let fechaPago:String;
    let control = false;

    precio = this.formularioModificarJugadorCuota.get('precio')?.value;
    fechaPago = this.formularioModificarJugadorCuota.get('fechaPago')?.value;
    this.medioPagoModificar = this.formularioModificarJugadorCuota.get('medioPagoModificar')?.value;
  
    this.jcService.crearJugadorCuota(this.id_cuotaAModificar, this.documentoJugadorAModificar, this.nombreJugadorAModificar, this.apellidoJugadorAModificar, precio, this.medioPagoModificar, fechaPago).subscribe(res =>{
      this.display = !this.display;
        
      control = true;

      //setTimeout(() => {
        
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pago de cuota actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
    //}, 500);
   
      this.mostrarJugadoresCuotas(); 

      if(this.medioPagoAModificar == this.medioPagoModificar){
        if(this.precioAModificar!=precio){
          if(this.medioPagoModificar == "Efectivo"){
          
          this.cService.egresoEfectivo(this.precioAModificar).subscribe(res=> {
            this.cService.ingresoEfectivo(precio).subscribe(res=>{
             })
           })  
          

          }
          else{
            
            this.cService.egresoDebito(this.precioAModificar).subscribe(res=> {
              this.cService.ingresoDebito(precio).subscribe(res=>{
               })
             })
            
          }
        }
      }

      else{
      
        if(this.medioPagoModificar=="Efectivo"){

          if(this.precioAModificar!=precio){
             
            this.cService.egresoDebito(this.precioAModificar).subscribe(res=> {
             this.cService.ingresoEfectivo(precio).subscribe(res=> { 
             }) 
            })
            
            }
            else{
              
              this.cService.egresoDebito(this.precioAModificar).subscribe(res=> {
                this.cService.ingresoEfectivo(this.precioAModificar).subscribe(res=> { 
                 })
               })
              
            }
        }
        else{
          if(this.precioAModificar!=precio){
      
            this.cService.egresoEfectivo(this.precioAModificar).subscribe(res=> {
              this.cService.ingresoDebito(precio).subscribe(res=> { 
               })
             })
            
            }
            else{

              this.cService.egresoEfectivo(this.precioAModificar).subscribe(res=> {
                this.cService.ingresoDebito(this.precioAModificar).subscribe(res=> {  
                })
               })
             
            }
        }
      }
  
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
  this.mostrarJugadoresCuotas();
  setTimeout(()=>{

  let tabla = document.getElementById('listadoPagosCuotasJugadores')
  if(tabla)  tabla.style.display = "block"; 
},1000);
}

eliminarJugadorCuota(jugadorCuota:JugadorCuota){
  let id_cuota:any = jugadorCuota.cuota?.id_cuota;
  let documentoJugador:any = jugadorCuota.documento;
  let medio:any = jugadorCuota.medioPago;
  let importe:any = jugadorCuota.precio;

  this.jcService.eliminarJugadorCuota(id_cuota, documentoJugador).subscribe(res =>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pago de cuota eliminado con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarJugadoresCuotas();

    if(medio =="Efectivo"){
     
      this.cService.egresoEfectivo(importe).subscribe(res => {
   });
   }
   else{
     
     this.cService.egresoDebito(importe).subscribe(res => {
     });
   }

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

    cerrar(){
      this.display = !this.display;
    }

}