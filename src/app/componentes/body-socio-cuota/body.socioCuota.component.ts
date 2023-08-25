import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { SocioCuotaServicio } from 'src/app/servicio/socioCuota.servicio';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import { Socio } from '../../modelo/Socio';
import { Cuota } from '../../modelo/Cuota';
import { SocioCuota } from 'src/app/modelo/SocioCuota';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-body-socioCuota',
  templateUrl: './body.socioCuota.component.html',
  styleUrls: ['./body.socioCuota.component.css']
})
export class BodySocioCuotaComponent {

  socios:Array<Socio>;
  sociosCuotas:Array<SocioCuota>;
  formularioSocioCuota: FormGroup;
  formularioModificarSocioCuota: FormGroup;
  //display:boolean;
   datosSocio:String= "default";
   documentoSocioAModificar:any;
   nombreSocioAModificar:String= "";
   apellidoSocioAModificar:String= "";
   anioCuotaAModificar:any;
   mesCuotaAModificar:any;
  cuotaPorParametros: Cuota;
  mes:number;
  id_cuota:any;
  documento:any;
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
  medioPago:string="default";
  medioPagoModificar:string="default";
  precioAModificar:any;
  medioPagoAModificar:any;


constructor(private fb:FormBuilder, private scService: SocioCuotaServicio, private cService: CuentaServicio){

  //this.display=false;
    this.socios=[];
    this.sociosCuotas=[];
    this.mostrarSocios();
    this.mes=0;
    this.cuotaPorParametros = new Cuota();
   

 
  this.formularioSocioCuota = fb.group({
    datosSocio: new FormControl('', Validators.required),
    anio: new FormControl('', Validators.required), 
    mes: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    medioPago: new FormControl('', Validators.required),
    fechaPago: new FormControl('', Validators.required)
    

  });

  this.formularioModificarSocioCuota = fb.group({
    precio: new FormControl('', Validators.required),
    medioPagoModificar: new FormControl('', Validators.required),
    fechaPago: new FormControl('', Validators.required)

  });

}

//Crear socioCuota
crearSocioCuota(){
if(this.formularioSocioCuota.valid){

  
  let anio:number;
  let precio:number;
  let fechaPago:Date;
  let fecha:any;
  let numeroMesFecha:number;
  let mesFecha:String="";
  let numeroDiaFecha:number;
  let diaFecha:String="";
  let control:Boolean=false;
  let socio:Socio;
  let nombre:any;
  let apellido:any;

  socio = new Socio();
 

 this.datosSocio = this.formularioSocioCuota.get('datosSocio')?.value;
 //this.medioPago = this.formularioSocioCuota.get('medioPago')?.value;

 if(this.datosSocio =="default")
 {
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'Los datos son incorrectos!',
      footer: 'Debe seleccionar un socio'
    })
    
 }

 else{

 let array:Array<String>;
 array = this.datosSocio.split("-");
 this.documento=array[0].trim();

 this.scService.buscarSocioPorDocumento(this.documento).subscribe(res =>{

  socio = res;
 
  });

 anio = this.formularioSocioCuota.get('anio')?.value;
 this.mes= this.formularioSocioCuota.get('mes')?.value;

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

      this.scService.existeCuotaEnSocioCuota(this.id_cuota, this.documento).subscribe(res=>{

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

  precio= this.formularioSocioCuota.get('precio')?.value;
  fechaPago = this.formularioSocioCuota.get('fechaPago')?.value;
 
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
  console.log(socio);
  nombre=socio.nombre?.trim();
  apellido=socio.apellido?.trim();

  console.log(nombre);
  console.log(apellido);

  this.scService.crearSocioCuota(this.id_cuota, this.documento, nombre, apellido, precio, this.medioPago, fecha).subscribe(res =>{

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pago de cuota registrado con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
   
     if(this.medioPago == "Efectivo"){

      this.cService.ingresoEfectivo(precio).subscribe(res=>{

      });
     }
     else{
      this.cService.ingresoDebito(precio).subscribe(res=>{

      });
     }
    this.mostrarSociosCuotas();
    
  });

}
},500);

}

},500);
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

activador(socioCuota: SocioCuota){


  this.formularioModificarSocioCuota.get('fechaPago')?.setValue(socioCuota.fechaPago);
  this.formularioModificarSocioCuota.get('precio')?.setValue(socioCuota.precio);
  this.formularioModificarSocioCuota.get('medioPagoModificar')?.setValue(socioCuota.medioPago);
  this.documentoSocioAModificar=socioCuota.documento!.toString();
  this.nombreSocioAModificar=socioCuota.nombre!.toString();
  this.apellidoSocioAModificar=socioCuota.apellido!.toString();
  this.anioCuotaAModificar=socioCuota.anioCuota;
  this.mesCuotaAModificar=socioCuota.mesCuota;
  this.ids=Object.values(socioCuota.id);
  this.id_cuotaAModificar=this.ids[0];
  this.documentoSocioAModificar=this.ids[1];
  this.precioAModificar = socioCuota.precio;
  this.medioPagoAModificar = socioCuota.medioPago;


  this.display= !this.display;
 
}


mostrarSocios(){
  this.scService.mostrarSocios().subscribe(res =>{
    
      this.socios = res;
    
  });

}

mostrarSociosCuotas(){
  this.scService.mostrarSocioCuota().subscribe(res =>{
    
      this.sociosCuotas = res;
      let socio:Array<any>;
      let documento:any;
      let ids:Array<number>;

      this.sociosCuotas.forEach(socioCuota => {
        
      socioCuota.anioCuota = socioCuota.cuota?.anio?.toString();
      socioCuota.mesCuota = socioCuota.cuota?.mes?.toString();
      ids=Object.values(socioCuota.id);
      documento=ids[1];
      socioCuota.documento=documento;
       
      /*
      this.scService.buscarSocioPorDocumento(documento).subscribe(res =>{

        socio = Object.values(res);
        socioCuota.apellido = socio[2];
        socioCuota.nombre = socio[1];
  
      });
  */
      
      
    
      });
        
    
    
  });

}

modificarSocioCuota(){

  if(this.formularioModificarSocioCuota.valid){

    let precio:number;
    let fechaPago:String;
    //let medio:String;
 
    //let nombre:any;
    //let apellido:any;
    let control = false;
   
    precio = this.formularioModificarSocioCuota.get('precio')?.value;
    fechaPago = this.formularioModificarSocioCuota.get('fechaPago')?.value;
    this.medioPagoModificar = this.formularioModificarSocioCuota.get('medioPagoModificar')?.value;

    this.scService.crearSocioCuota(this.id_cuotaAModificar, this.documentoSocioAModificar, this.nombreSocioAModificar, this.apellidoSocioAModificar, precio, this.medioPagoModificar, fechaPago).subscribe(res =>{
        this.display = !this.display;
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pago de cuota actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      control = true;
      this.mostrarSociosCuotas();

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

mostrarCuotaPorParametros(año:number, mes:number){

  this.scService.mostrarCuotaPorParametros(año, mes).subscribe(res =>{
    if(res!=null){ 
      this.id_cuota=res.id_cuota;
      console.log(this.id_cuota);
       }
       else{
        this.id_cuota=undefined;
       }
  })
}

mostrarTabla(){
  this.mostrarSociosCuotas();
  setTimeout(()=>{

  let tabla = document.getElementById('listadoPagosCuotasSocios')
  if(tabla)  tabla.style.display = "block"; 
},1000);
}

eliminarSocioCuota(socioCuota:SocioCuota){
  let id_cuota:any = socioCuota.cuota?.id_cuota;
  let documentoSocio:any = socioCuota.documento;
  let medio:any = socioCuota.medioPago;
  let importe:any = socioCuota.precio;

  this.scService.eliminarSocioCuota(id_cuota, documentoSocio).subscribe(res =>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pago de cuota eliminado con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarSociosCuotas();
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

    onSearchSocioName(searchName:string){
      this.searchName =searchName;
       
    }
    
    onSearchSocioApellido(searchApellido:string){
      this.searchApellido = searchApellido;
    }
    
    onSearchSocioDocumento(searchDocumento:string){
      this.searchDocumento = searchDocumento;
    }

    onSearchSocioAnio(searchAnio:string){
      this.searchAnio =searchAnio;
       
    }
    
    onSearchSocioMes(searchMes:string){
      this.searchMes = searchMes;
    }

    onSearchSocioMedioPago(searchMedioPago:string){
      this.searchMedioPago = searchMedioPago;
    }

    cerrar(){
      this.display = !this.display;
    }

}