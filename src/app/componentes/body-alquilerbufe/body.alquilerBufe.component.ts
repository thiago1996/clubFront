import { Component } from '@angular/core';
import { AlquilerBufeServicio } from 'src/app/servicio/alquilerBufe.servicio';
import { AlquilerBufe } from 'src/app/modelo/AlquilerBufe';
import { Bufe } from 'src/app/modelo/Bufe';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import { BufeServicio } from 'src/app/servicio/bufe.servicio';
import { ReporteServicio } from 'src/app/servicio/reporte.servicio';
import { Router } from '@angular/router';
import { TransaccionServicio } from 'src/app/servicio/transaccion.servicio';
import { Transaccion } from 'src/app/modelo/Transaccion';

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
  fechaAlquilerBufeModificar:any;
  filterPropertyFecha="";
  filterPropertyNumeroBufe="";
  filterPropertyMedioPago="";
  searchFecha:string="";
  searchNumeroBufe:string="";
  searchMedioPago:string="";
  generarPdf:boolean=false;
  idTransaccion:any;

  constructor(private fb:FormBuilder, private abService: AlquilerBufeServicio, private bService: BufeServicio, private cService: CuentaServicio,  private rService: ReporteServicio, private tService:TransaccionServicio, private router:Router){

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
      let fecha:Date;
      let id_bufe:any;
      let transaccion:Transaccion;
      let fechaString="";
      let mesFecha:String="";
      let diaFecha:String="";
      let numeroMesFecha:number;
      let numeroDiaFecha:number;
      let bufes:Array<Bufe>=[];

      transaccion = new Transaccion();
     
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
 
      numeroMesFecha=fecha.getMonth()+1;
      mesFecha= numeroMesFecha.toString();
      numeroDiaFecha=fecha.getDate();
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
    
    
      fechaString=fecha.getFullYear()+'-'+mesFecha+'-'+diaFecha;
  
console.log(numeroBufe);
     this.bService.mostrarBufesPorNumero(numeroBufe).subscribe(res =>{
    
       bufes = res;
     
      });

      setTimeout(() => {
        
      alquilerBufe.bufe=bufes[0];
     // alquilerBufe.numero=this.bufes[0].numero;
      alquilerBufe.fecha=fechaString;
      alquilerBufe.importe=importe;
      alquilerBufe.medioPago=this.medioPago;

      console.log(bufes);
      console.log(bufes[0]);
      
      id_bufe = bufes[0].id;

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

        setTimeout(() => {
          
        this.abService.buscarPorParametros(alquilerBufe.fecha, id_bufe).subscribe( res=> {

          alquilerBufe.id = res[0].id;
        });

        setTimeout(() => {   

       
        transaccion.tipo="Ingreso";
        transaccion.alquilerBufe=alquilerBufe;
        transaccion.fecha=alquilerBufe.fecha;
        transaccion.medioPago=alquilerBufe.medioPago;
        transaccion.importe=importe;
        transaccion.descripcion="Bufé "+" "+alquilerBufe.bufe?.numeroBufe;
        
        this.tService.crearTransaccion(transaccion).subscribe(res=>{
    
        });

      }, 300);

      this.formularioAlquilerBufe.reset();

    }, 500);
      });

    }, 700);

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
  this.generarPdf=true;
}

eliminarAlquilerBufe(alquilerBufe:AlquilerBufe){

  let id:any;
  let importe:any;
  importe = alquilerBufe.importe;
  id=alquilerBufe.id;

  this.idTransaccionPorIdAlquilerBufe(id);
   
  setTimeout(() => {
 
    console.log(this.idTransaccion);
   this.tService.eliminarTransaccion(this.idTransaccion).subscribe(res => {
      setTimeout(() => {
        
      
this.abService.eliminarAlquilerBufe(id) .subscribe(res => {

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

}, 300);

   });

  }, 300);
  
  }

modificarAlquilerBufe(){

  if(this.formularioModificarAlquilerBufe.valid){
    
    let importe:number;
    let medioPago:String;
    let numeroBufe:number;
    let fecha:string;
    let control=false;
    let alquilerBufe:AlquilerBufe;
    let transaccion:Transaccion;
    
    alquilerBufe= new AlquilerBufe();
    transaccion = new Transaccion();

    importe=this.formularioModificarAlquilerBufe.get('importe')?.value;
    medioPago=this.formularioModificarAlquilerBufe.get('medioPagoModificar')?.value;
    fecha= this.formularioModificarAlquilerBufe.get('fecha')?.value;
  
    numeroBufe=+this.numeroBufeModificar;

    this.idTransaccionPorIdAlquilerBufe(this.idAlquilerBufeAModificar);   

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

      transaccion.tipo="Ingreso";
      transaccion.id=this.idTransaccion;
      transaccion.alquilerBufe=alquilerBufe;
      transaccion.fecha=alquilerBufe.fecha;
      transaccion.medioPago=alquilerBufe.medioPago;
      transaccion.importe=importe;
      transaccion.descripcion="Bufé "+" "+alquilerBufe.bufe?.numeroBufe;
      
     console.log(transaccion.alquilerBufe.id)
      this.tService.crearTransaccion(transaccion).subscribe(res=>{
  
      });
   
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

  this.numeroBufeModificar= alquilerBufe.bufe?.numeroBufe;
  this.numeroBufeAModificar = alquilerBufe.bufe?.numeroBufe;

  fecha = alquilerBufe.fecha;
  
  this.formularioModificarAlquilerBufe.get('fecha')?.setValue(fecha);

  this.formularioModificarAlquilerBufe.get('medioPagoModificar')?.setValue(alquilerBufe.medioPago);
  this.formularioModificarAlquilerBufe.get('importe')?.setValue(alquilerBufe.importe);
  
  this.idAlquilerBufeAModificar=alquilerBufe.id;
  this.medioPagoModificar=alquilerBufe.medioPago;
  this.medioPagoAModificar=alquilerBufe.medioPago;
  this.numeroBufeAModificar=alquilerBufe.bufe?.numeroBufe;
  this.importeAModificar=alquilerBufe.importe;
  this.fechaAlquilerBufeModificar=alquilerBufe.fecha;
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

imprimir(){

  const encabezado = ["Bufe", "Fecha", "Importe", "Medio de pago",];

  let alquilerBufeFiltrado: Array<AlquilerBufe>;
  alquilerBufeFiltrado = new Array<AlquilerBufe>();
 
  alquilerBufeFiltrado= this.filtroAlquilerBufe(this.alquileresBufe, this.searchFecha, this.searchNumeroBufe, this.searchMedioPago);

 const cuerpo =  alquilerBufeFiltrado.map(

  (obj : AlquilerBufe) => {
    const datos = [
      obj.bufe?.numeroBufe,
      obj.fecha,
      obj.importe,
      obj.medioPago
    ]
    return datos;
  }
 )

this.rService.imprimir(encabezado, cuerpo, "Listado de alquileres de bufé", true);

}

filtroAlquilerBufe(values: AlquilerBufe[], searchFecha: string, searchNumeroBufe:string, searchMedioPago:string): any[] {

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
 
  filterValues= filterValues.filter(value => value.bufe?.numeroBufe.toString().includes(searchNumeroBufe));
}

if(searchMedioPago!=""){
  searchMedioPago=searchMedioPago.toLowerCase();
  values.forEach(value =>
    {
  let medioPago:any=value.medioPago;
  value.medioPago= medioPago.toLowerCase();
}
  );
//searchHoraInicio=searchHoraInicio.toLowerCase();
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

volver(){

  if(this.router.url=="/homeAdministrador/alquilerBufe/nuevo"){ 
    this.router.navigate(['/homeAdministrador']);
    }
    else{
      this.router.navigate(['/homeInvitado']);
    }
}

idTransaccionPorIdAlquilerBufe(idAlquilerBufe:number){

  this.tService.mostrarTransaccionesPorIdAlquilerBufe(idAlquilerBufe).subscribe(res=>{
              
   this.idTransaccion=res[0].id;
  });
}

}