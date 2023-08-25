import { Component } from '@angular/core';
import { AlquilerBufeServicio } from 'src/app/servicio/alquilerBufe.servicio';
import { AlquilerBufe } from 'src/app/modelo/AlquilerBufe';
import { Bufe } from 'src/app/modelo/Bufe';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import { BufeServicio } from 'src/app/servicio/bufe.servicio';

@Component({
  selector: 'app-body.alquilerBufe',
  templateUrl: './body.alquilerBufe.component.html',
  styleUrls: ['./body.alquilerBufe.component.css']
})
export class BodyAlquilerBufeComponent { 

  formularioAlquilerBufe: FormGroup;
  formularioModificarAlquilerBufe: FormGroup;
  numeroBufe:String="default";
  numeroBufeModificar:any;
  alquileresBufe:Array<AlquilerBufe>;
  display:boolean;
  bufes:Array<Bufe>=[];
  medioPago:String="default";
  idAlquilerBufeAModificar:any;
  medioPagoModificar:any;
  medioPagoAModificar:any;
  numeroBufeAModificar:any;
  importeAModificar:any;
  filterPropertyFecha="";
  filterPropertyNumeroBufe="";
  filterPropertyMedioPago="";
  searchFecha:string="";
  searchNumeroBufe:string="";
  searchMedioPago:string="";

  constructor(private fb:FormBuilder, private abService: AlquilerBufeServicio, private bService: BufeServicio, private cService: CuentaServicio ){

      this.alquileresBufe=[];
      this.display = false;
      this.mostrarBufes();
      this.mostrarAlquileresBufe();
      this.numeroBufeModificar = "";

      this.formularioAlquilerBufe = fb.group({
      numeroBufe: new FormControl('', Validators.required),
      importe: new FormControl('', Validators.required), 
      medioPago: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required)
  
    });
  
    this.formularioModificarAlquilerBufe = fb.group({
      
      numeroBufeModificar: new FormControl('', Validators.required),
      importe: new FormControl('', Validators.required), 
      medioPagoModificar: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required)
  
    });

  }

  crearAlquilerBufe(){
    if(this.formularioAlquilerBufe.valid){
    
      
      let numeroBufe:number;
      let importe:number;
      let fecha:string;
      
     
      //let control:Boolean=false;
      let alquilerBufe:AlquilerBufe;
     
    
      alquilerBufe = new AlquilerBufe();
    
     numeroBufe= +this.numeroBufe;
     importe= this.formularioAlquilerBufe.get('importe')?.value;
     this.medioPago= this.formularioAlquilerBufe.get('medioPago')?.value;
     fecha= this.formularioAlquilerBufe.get('fecha')?.value;
   
    
     if(this.numeroBufe =="default")
     {
        Swal.fire({
          icon: 'error',
          title: 'Registro fallido',
          text: 'Los datos son incorrectos!',
          footer: 'Debe seleccionar un bufé'
        })
        
     }
    
     else{
 
    
     this.bService.mostrarBufesPorNumero(numeroBufe).subscribe(res =>{
    
       this.bufes = res;
     
      });

      setTimeout(() => {
        
      alquilerBufe.bufe=this.bufes[0];
     // alquilerBufe.numero=this.bufes[0].numero;
      alquilerBufe.fecha=fecha;
      alquilerBufe.importe=importe;
      alquilerBufe.medioPago=this.medioPago;

      this.abService.crearAlquilerBufe(alquilerBufe).subscribe(res =>{
    
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alquiler registrado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
       
         if(this.medioPago == "Efectivo"){
    
          this.cService.ingresoEfectivo(importe).subscribe(res=>{
    
          });
         }
         else{
          this.cService.ingresoDebito(importe).subscribe(res=>{
    
          });
         }
        this.mostrarAlquileresBufe();
        
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
mostrarAlquileresBufe(){

  this.abService.mostrarAlquileresBufe().subscribe(res =>{
    this.alquileresBufe = res;
  })

}
mostrarBufes(){

  this.bService.mostrarBufes().subscribe(res =>{
    this.bufes = res;
  })
}

mostrarTabla(){
  this.mostrarAlquileresBufe();
  let tabla = document.getElementById('listadoAlquileresBufe');
  if(tabla)  tabla.style.display = "block"; 
}

eliminarAlquilerBufe(alquilerBufe:AlquilerBufe){

  let id:any;
  id = alquilerBufe.bufe?.id;
  let importe:any;
  importe = alquilerBufe.importe;
  let alquilerDeBufe:AlquilerBufe;
  let fecha:any;
  fecha=alquilerBufe.fecha;
  
  alquilerDeBufe = new AlquilerBufe();
  let idAlquilerBufe:any;

  this.abService.buscarPorParametros(fecha, id).subscribe( res=> {

    alquilerDeBufe.id = res[0].id;
  });
  
  setTimeout(() => {
      
idAlquilerBufe = alquilerDeBufe.id;
this.abService.eliminarAlquilerBufe(idAlquilerBufe).subscribe( res=>{

  Swal.fire({
    position:'center',
    icon: 'success',
    title: 'Alquiler eliminado con éxito!',
    showConfirmButton: false,
    timer: 1500
  })
 
  this.mostrarAlquileresBufe();

  if(alquilerBufe.medioPago=="Efectivo"){
    this.cService.egresoEfectivo(importe).subscribe(res => {
    });
  }
  else{
    this.cService.egresoDebito(importe).subscribe(res => {
    });
  
  }

});
}, 500);
  
}
modificarAlquilerBufe(){

  if(this.formularioModificarAlquilerBufe.valid){
    
    let importe:number;
    let medioPago:String;
  
    let numeroBufe:number;

    let fecha:string;
  
    let control=false;

    let alquilerBufe:AlquilerBufe;
    
    alquilerBufe= new AlquilerBufe();

    importe=this.formularioModificarAlquilerBufe.get('importe')?.value;
    medioPago=this.formularioModificarAlquilerBufe.get('medioPagoModificar')?.value;
    fecha= this.formularioModificarAlquilerBufe.get('fecha')?.value;
  
    numeroBufe=+this.numeroBufeModificar;

    this.bService.mostrarBufesPorNumero(numeroBufe).subscribe(res =>{
    
      this.bufes = res;
    
     });

     setTimeout(() => {
    
     alquilerBufe.id = this.idAlquilerBufeAModificar;  
     alquilerBufe.bufe=this.bufes[0];
    // alquilerCancha.numeroCancha=this.canchas[0].numero;
    
     alquilerBufe.fecha=fecha;
     alquilerBufe.importe=importe;
     alquilerBufe.medioPago=medioPago;

     this.abService.modificarAlquilerBufe(alquilerBufe).subscribe(res =>{
    
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Alquiler actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      control = true; 
      this.display = !this.display;
      this.mostrarAlquileresBufe();
      //this.formularioModificarAlquilerCancha.reset();
      this.mostrarBufes();


      if(this.medioPagoAModificar == medioPago){
        if(this.importeAModificar!=importe){
          if(this.medioPagoAModificar == "Efectivo"){
          
          this.cService.egresoEfectivo(this.importeAModificar).subscribe(res=> {
            this.cService.ingresoEfectivo(importe).subscribe(res=>{
             })
           })  
          

          }
          else{
          
            this.cService.egresoDebito(this.importeAModificar).subscribe(res=> {
              this.cService.ingresoDebito(importe).subscribe(res=>{
               })
             })
            
          }
        }
      }

      else{
      
        if(this.medioPagoAModificar=="Efectivo"){

          if(this.importeAModificar!=importe){
             
            this.cService.egresoEfectivo(this.importeAModificar).subscribe(res=> {
             this.cService.ingresoDebito(importe).subscribe(res=> { 
             }) 
            })
            
            }
            else{
              
              this.cService.egresoEfectivo(this.importeAModificar).subscribe(res=> {
                this.cService.ingresoDebito(this.importeAModificar).subscribe(res=> { 
                 })
               })
              
            }
        }
        else{
          if(this.importeAModificar!=importe){
      
            this.cService.egresoDebito(this.importeAModificar).subscribe(res=> {
              this.cService.ingresoEfectivo(importe).subscribe(res=> { 
               })
             })
            
            }
            else{
                  
              this.cService.egresoDebito(this.importeAModificar).subscribe(res=> {
                this.cService.ingresoEfectivo(this.importeAModificar).subscribe(res=> {  
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

activador(alquilerBufe:AlquilerBufe){

  let fecha:String;
  let numeroBufe:any;

  this.numeroBufeModificar= alquilerBufe.bufe?.numero;
  this.numeroBufeAModificar = alquilerBufe.bufe?.numero;

  fecha = alquilerBufe.fecha;
  
  this.formularioModificarAlquilerBufe.get('fecha')?.setValue(fecha);

  this.formularioModificarAlquilerBufe.get('medioPagoModificar')?.setValue(alquilerBufe.medioPago);
  this.formularioModificarAlquilerBufe.get('importe')?.setValue(alquilerBufe.importe);
  
  this.idAlquilerBufeAModificar=alquilerBufe.id;
  this.medioPagoModificar=alquilerBufe.medioPago;
  this.medioPagoAModificar=alquilerBufe.medioPago;
  this.numeroBufeAModificar=alquilerBufe.bufe?.numero;
  this.importeAModificar=alquilerBufe.importe;

  this.display= !this.display;

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

cerrar(){
  this.display = !this.display;
}

}