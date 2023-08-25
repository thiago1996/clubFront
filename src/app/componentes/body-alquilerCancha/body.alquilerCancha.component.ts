import { Component } from '@angular/core';
import { AlquilerCanchaServicio } from 'src/app/servicio/alquilerCancha.servicio';
import { AlquilerCancha } from 'src/app/modelo/AlquilerCancha';
import { Cancha } from 'src/app/modelo/Cancha';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { CanchaServicio } from 'src/app/servicio/cancha.servicio';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';

@Component({
  selector: 'app-body.alquilerCancha',
  templateUrl: './body.alquilerCancha.component.html',
  styleUrls: ['./body.alquilerCancha.component.css']
})
export class BodyAlquilerCanchaComponent { 

  formularioAlquilerCancha: FormGroup;
  formularioModificarAlquilerCancha: FormGroup;
  numeroCancha:String="default";
  numeroCanchaModificar:any;
  alquileresCancha:Array<AlquilerCancha>;
  display:boolean;
  canchas:Array<Cancha>=[];
  medioPago:String="default";
  idAlquilerCanchaAModificar:any;
  medioPagoModificar:any;
  medioPagoAModificar:any;
  numeroCanchaAModificar:any;
  importeAModificar:any;
  filterPropertyFecha="";
  filterPropertyHoraInicio="";
  filterPropertyHoraFin="";
  filterPropertyNumeroCancha="";
  filterPropertyMedioPago="";
  searchFecha:string="";
  searchHoraInicio:string="";
  searchHoraFin:string="";
  searchNumeroCancha:string="";
  searchMedioPago:string="";

  constructor(private fb:FormBuilder, private acService: AlquilerCanchaServicio, private caService: CanchaServicio, private cuService: CuentaServicio ){

      this.alquileresCancha=[];
      this.display = false;
      this.mostrarCanchas();
      this.mostrarAlquileresCancha();
      this.numeroCanchaModificar = "";

      this.formularioAlquilerCancha = fb.group({
      numeroCancha: new FormControl('', Validators.required),
      importe: new FormControl('', Validators.required), 
      medioPago: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required)
      
  
    });
  
    this.formularioModificarAlquilerCancha = fb.group({
      
      numeroCanchaModificar: new FormControl('', Validators.required),
      importe: new FormControl('', Validators.required), 
      medioPagoModificar: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required)
  
    });

  }

  crearAlquilerCancha(){
    if(this.formularioAlquilerCancha.valid){
    
      
      let numeroCancha:number;
      let importe:number;
      let fecha:Date;
      let fechaFin:Date;
      let observaciones:String;
      let numeroMesFecha:number;
      let mesFecha:String="";
      let numeroDiaFecha:number;
      let diaFecha:String="";
      let fechaString="";
      let horaInicio:number;
      let minutosInicio:number;
      let segundosInicio:number;
      let horaFin:number;
      let minutosFin:number;
      let segundosFin:number;
      let horaInicial:String="";
      let horaFinal:String="";
      let minutosInicialString="";
      let segundosInicialString="";
      let minutosFinalString="";
      let segundosFinalString="";
      
     
      //let control:Boolean=false;
      let alquilerCancha:AlquilerCancha;
     
    
      alquilerCancha = new AlquilerCancha();
    
     numeroCancha= +this.numeroCancha;
     importe= this.formularioAlquilerCancha.get('importe')?.value;
     this.medioPago= this.formularioAlquilerCancha.get('medioPago')?.value;
     fecha= this.formularioAlquilerCancha.get('fechaInicio')?.value;
     fechaFin= this.formularioAlquilerCancha.get('fechaFin')?.value;
     observaciones= this.formularioAlquilerCancha.get('observaciones')?.value;
     //this.medioPago = this.formularioSocioCuota.get('medioPago')?.value;
    
     if(this.numeroCancha =="default")
     {
        Swal.fire({
          icon: 'error',
          title: 'Registro fallido',
          text: 'Los datos son incorrectos!',
          footer: 'Debe seleccionar una cancha'
        })
        
     }
    
     else{
 
  numeroMesFecha=fecha.getMonth()+1;
  mesFecha= numeroMesFecha.toString();
  numeroDiaFecha=fecha.getDate();
  diaFecha= numeroDiaFecha.toString();
  horaInicio=fecha.getHours();
  minutosInicio=fecha.getMinutes();
  segundosInicio=fecha.getSeconds();
  horaFin=fechaFin.getHours();
  minutosFin=fechaFin.getMinutes();
  segundosFin=fechaFin.getSeconds();

  if(minutosInicio < 10)
  {
    minutosInicialString = "0"+minutosInicio.toString();
  }
  else
  {
    minutosInicialString = minutosInicio.toString();
  }
  if(minutosFin < 10)
  {
    minutosFinalString = "0"+minutosFin.toString();
  }
  else
  {
    minutosFinalString = minutosFin.toString();
  }
  if(segundosInicio < 10)
  {
    segundosInicialString = "0"+segundosInicio.toString();
  }
  else
  {
    segundosInicialString = segundosInicio.toString();
  }
  if(segundosFin < 10)
  {
    segundosFinalString = "0"+segundosFin.toString();
  }
  else
  {
    segundosFinalString = segundosFin.toString();
  }
  
horaInicial = horaInicio+":"+minutosInicialString+":"+segundosInicialString;
horaFinal = horaFin+":"+minutosFinalString+":"+segundosFinalString;

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


  fechaString=fecha.getFullYear()+'-'+mesFecha+'-'+diaFecha;
    
     this.caService.mostrarCanchasPorNumero(numeroCancha).subscribe(res =>{
    
       this.canchas = res;
     
      });

      setTimeout(() => {
        
      alquilerCancha.cancha=this.canchas[0];
      alquilerCancha.numeroCancha=this.canchas[0].numero;
      alquilerCancha.fecha=fechaString;
      alquilerCancha.horaInicio=horaInicial;
      alquilerCancha.horaFin=horaFinal;
      alquilerCancha.importe=importe;
      alquilerCancha.medioPago=this.medioPago;
      alquilerCancha.observaciones=observaciones;
    
      console.log(alquilerCancha);
      this.acService.crearAlquilerCancha(alquilerCancha).subscribe(res =>{
    
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alquiler registrado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
       
         if(this.medioPago == "Efectivo"){
    
          this.cuService.ingresoEfectivo(importe).subscribe(res=>{
    
          });
         }
         else{
          this.cuService.ingresoDebito(importe).subscribe(res=>{
    
          });
         }
        this.mostrarAlquileresCancha();
        
      });

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

    //Mostrar alquileres
mostrarAlquileresCancha(){

  this.acService.mostrarAlquileresCancha().subscribe(res =>{
    this.alquileresCancha = res;
    this.alquileresCancha.forEach(element => {
      
        element.numeroCancha = element.cancha?.numero;
    });
  })
}

mostrarCanchas(){

  this.caService.mostrarCanchas().subscribe(res =>{
    this.canchas = res;
  })
}

mostrarTabla(){
  this.mostrarAlquileresCancha();
  let tabla = document.getElementById('listadoAlquileresCancha')
  if(tabla)  tabla.style.display = "block"; 
}

eliminarAlquilerCancha(alquilerCancha:AlquilerCancha){

  let id:any;
  id = alquilerCancha.cancha?.id;
  let importe:any;
  importe = alquilerCancha.importe;
  let alquilerDeCancha:AlquilerCancha;
  let fecha:any;
  fecha=alquilerCancha.fecha;
  let horaInicio:any;
  horaInicio=alquilerCancha.horaInicio;
  let horaFin:any;
  horaFin=alquilerCancha.horaFin;
  alquilerDeCancha = new AlquilerCancha();
  let idAlquilerCancha:any;

  this.acService.buscarPorParametros(fecha, horaInicio, horaFin, id).subscribe( res=> {

    alquilerDeCancha.id = res[0].id;
  });
  
  setTimeout(() => {
    
console.log(alquilerDeCancha.id);    
idAlquilerCancha = alquilerDeCancha.id;
this.acService.eliminarAlquilerCancha(idAlquilerCancha).subscribe( res=>{

  Swal.fire({
    position:'center',
    icon: 'success',
    title: 'Alquiler eliminado con éxito!',
    showConfirmButton: false,
    timer: 1500
  })
 
  this.mostrarAlquileresCancha();

  if(alquilerCancha.medioPago=="Efectivo"){
    this.cuService.egresoEfectivo(importe).subscribe(res => {
    });
  }
  else{
    this.cuService.egresoDebito(importe).subscribe(res => {
    });
  
  }

});
}, 500);
  
}
modificarAlquilerCancha(){

  if(this.formularioModificarAlquilerCancha.valid){
    
   // let horaInicio:String;
    //let horaFin:String;
    let importe:number;
    let medioPago:String;
    let observaciones:String;
    let numeroCancha:number;

    let fecha:Date;
    let fechaFin:Date;
    let numeroMesFecha:number;
    let mesFecha:String="";
    let numeroDiaFecha:number;
    let diaFecha:String="";
    let fechaString="";
    let horaInicio:number;
    let minutosInicio:number;
    let segundosInicio:number;
    let horaFin:number;
    let minutosFin:number;
    let segundosFin:number;
    let horaInicial:String="";
    let horaFinal:String="";
    let minutosInicialString="";
    let segundosInicialString="";
    let minutosFinalString="";
    let segundosFinalString="";

    let control=false;

    let alquilerCancha:AlquilerCancha;
    
    alquilerCancha = new AlquilerCancha();

    importe=this.formularioModificarAlquilerCancha.get('importe')?.value;
    medioPago=this.formularioModificarAlquilerCancha.get('medioPagoModificar')?.value;
    observaciones=this.formularioModificarAlquilerCancha.get('observaciones')?.value;
    fecha= new Date(this.formularioModificarAlquilerCancha.get('fechaInicio')?.value);
    fechaFin= new Date(this.formularioModificarAlquilerCancha.get('fechaFin')?.value);

    numeroMesFecha=fecha.getMonth()+1;
    mesFecha= numeroMesFecha.toString();
    numeroDiaFecha=fecha.getDate();
    diaFecha= numeroDiaFecha.toString();
    horaInicio=fecha.getHours();
    minutosInicio=fecha.getMinutes();
    segundosInicio=fecha.getSeconds();
    horaFin=fechaFin.getHours();
    minutosFin=fechaFin.getMinutes();
    segundosFin=fechaFin.getSeconds();
  
    if(minutosInicio < 10)
    {
      minutosInicialString = "0"+minutosInicio.toString();
    }
    else
    {
      minutosInicialString = minutosInicio.toString();
    }
    if(minutosFin < 10)
    {
      minutosFinalString = "0"+minutosFin.toString();
    }
    else
    {
      minutosFinalString = minutosFin.toString();
    }
    if(segundosInicio < 10)
    {
      segundosInicialString = "0"+segundosInicio.toString();
    }
    else
    {
      segundosInicialString = segundosInicio.toString();
    }
    if(segundosFin < 10)
    {
      segundosFinalString = "0"+segundosFin.toString();
    }
    else
    {
      segundosFinalString = segundosFin.toString();
    }
    
  horaInicial = horaInicio+":"+minutosInicialString+":"+segundosInicialString;
  horaFinal = horaFin+":"+minutosFinalString+":"+segundosFinalString;
  
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
  
  
    fechaString=fecha.getFullYear()+'-'+mesFecha+'-'+diaFecha;
    numeroCancha=+this.numeroCanchaModificar;

    this.caService.mostrarCanchasPorNumero(numeroCancha).subscribe(res =>{
    
      this.canchas = res;
    
     });

     setTimeout(() => {
    
     alquilerCancha.id = this.idAlquilerCanchaAModificar;  
     alquilerCancha.cancha=this.canchas[0];
     alquilerCancha.numeroCancha=this.canchas[0].numero;
    
     alquilerCancha.fecha=fechaString;
     alquilerCancha.horaInicio=horaInicial;
     alquilerCancha.horaFin=horaFinal;
     alquilerCancha.importe=importe;
     alquilerCancha.medioPago=medioPago;
     alquilerCancha.observaciones=observaciones;

     this.acService.modificarAlquilerCancha(alquilerCancha).subscribe(res =>{
    
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Alquiler actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      control = true; 
      this.display = !this.display;
      this.mostrarAlquileresCancha();
      this.formularioModificarAlquilerCancha.reset();
      this.mostrarCanchas();

      console.log(this.medioPagoAModificar);
      console.log(medioPago);
      console.log(this.importeAModificar);
      console.log(importe);

      if(this.medioPagoAModificar == medioPago){
        if(this.importeAModificar!=importe){
          if(this.medioPagoAModificar == "Efectivo"){
          
          this.cuService.egresoEfectivo(this.importeAModificar).subscribe(res=> {
            this.cuService.ingresoEfectivo(importe).subscribe(res=>{
             })
           })  
          

          }
          else{
          
            this.cuService.egresoDebito(this.importeAModificar).subscribe(res=> {
              this.cuService.ingresoDebito(importe).subscribe(res=>{
               })
             })
            
          }
        }
      }

      else{
      
        if(this.medioPagoAModificar=="Efectivo"){

          if(this.importeAModificar!=importe){
             
            this.cuService.egresoEfectivo(this.importeAModificar).subscribe(res=> {
             this.cuService.ingresoDebito(importe).subscribe(res=> { 
             }) 
            })
            
            }
            else{
              
              this.cuService.egresoEfectivo(this.importeAModificar).subscribe(res=> {
                this.cuService.ingresoDebito(this.importeAModificar).subscribe(res=> { 
                 })
               })
              
            }
        }
        else{
          if(this.importeAModificar!=importe){
      
            this.cuService.egresoDebito(this.importeAModificar).subscribe(res=> {
              this.cuService.ingresoEfectivo(importe).subscribe(res=> { 
               })
             })
            
            }
            else{
                   console.log("sdads");
              this.cuService.egresoDebito(this.importeAModificar).subscribe(res=> {
                this.cuService.ingresoEfectivo(this.importeAModificar).subscribe(res=> {  
                })
               })
             
            }
        }
      }
   
    });

}, 500);
    
setTimeout(() => {
  

if(control==false){
  this.display = !this.display;
  Swal.fire({
    icon: 'error',
    title: 'Actualización fallida',
    text: 'Los datos son incorrectos!',
    footer: 'Verifique los datos ingresados en el formulario'
  })
}
},1500);

}


}

activador(alquilerCancha:AlquilerCancha){

  let fechaInicio:Date;
  let fechaFin:Date;
  let numeroCancha:any;
  let fechaInicioString:String;
  let fechaFinString:String;

  this.numeroCanchaModificar= alquilerCancha.cancha?.numero;
  this.numeroCanchaAModificar = alquilerCancha.cancha?.numero;

  fechaInicio = new Date((alquilerCancha.fecha)+" "+alquilerCancha.horaInicio);
  fechaFin = new Date(alquilerCancha.fecha+" "+alquilerCancha.horaFin);
  
  fechaInicioString = fechaInicio.toLocaleDateString();
  fechaFinString = fechaFin.toLocaleDateString();

  this.formularioModificarAlquilerCancha.get('fechaInicio')?.setValue(this.convertDateFormat(fechaInicioString)+" "+fechaInicio.toLocaleTimeString());
  this.formularioModificarAlquilerCancha.get('fechaFin')?.setValue(this.convertDateFormat(fechaFinString)+" "+fechaFin.toLocaleTimeString());

  this.formularioModificarAlquilerCancha.get('medioPagoModificar')?.setValue(alquilerCancha.medioPago);
  this.formularioModificarAlquilerCancha.get('importe')?.setValue(alquilerCancha.importe);
  this.formularioModificarAlquilerCancha.get('observaciones')?.setValue(alquilerCancha.observaciones);
  this.idAlquilerCanchaAModificar=alquilerCancha.id;
  this.medioPagoModificar=alquilerCancha.medioPago;
  this.medioPagoAModificar=alquilerCancha.medioPago;
  this.numeroCanchaAModificar=alquilerCancha.cancha?.numero;
  this.importeAModificar=alquilerCancha.importe;

  this.display= !this.display;

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

convertDateFormat(fecha:String) {
  var info = fecha.split('/');
  return info[1] + '/' + info[0] + '/' + info[2];
}

cerrar(){
  this.display = !this.display;
}

}
