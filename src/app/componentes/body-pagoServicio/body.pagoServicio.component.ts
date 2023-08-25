import { Component } from '@angular/core';
import { PagoServicioServicio } from 'src/app/servicio/pagoServicio.servicio';
//import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { PagoServicio } from 'src/app/modelo/PagoServicio';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';

@Component({
  selector: 'app-body-pagoServicio',
  templateUrl: './body.pagoServicio.component.html',
  styleUrls: ['./body.pagoServicio.component.css']
})
export class BodyPagoServicioComponent {

  formularioPagoServicio: FormGroup;
  formularioModificarPagoServicio: FormGroup;
  id_pagoServicio:any;
  id_pagoServicioModificar:any;
  pagoServicioPorDescripcionYFecha:Array<PagoServicio>;
  pagoServicioPorParametros:Array<PagoServicio>;
  pagosServicio: Array<PagoServicio>;
  display:boolean;
  medioPago:String="default";
  medioPagoModificar:String="default";
  medioPagoAModificar:any;
  importeAModificar:any;
  descripcionAModificar:any;
  fechaAModificar:any;
  filterPropertyDescripcion="";
  filterPropertyFecha="";
  filterPropertyMedioPago="";
  searchDescripcion:string="";
  searchFecha:string="";
  searchMedioPago:string="";

  constructor(private fb:FormBuilder, private psService: PagoServicioServicio, private cService: CuentaServicio ){
  
    this.formularioPagoServicio = fb.group({

    
    descripcion: new FormControl('', Validators.required),
    importe: new FormControl('', Validators.required), 
    medioPago: new FormControl('', Validators.required), 
    fecha: new FormControl('', Validators.required), 
  });

  this.pagosServicio= new Array<PagoServicio>();
  this.pagoServicioPorDescripcionYFecha=[];
  this.pagoServicioPorParametros=[];
  this.display=false;

  this.formularioModificarPagoServicio = fb.group({

    descripcion: new FormControl('', Validators.required),
    importe: new FormControl('', Validators.required), 
    medioPagoModificar: new FormControl('', Validators.required), 
    fecha: new FormControl('', Validators.required),

    
  });

  }

  //Crear pago de servicio
  crearPagoServicio(){
 if(this.formularioPagoServicio.valid){ 
  
    let pagoServicio:PagoServicio;
    pagoServicio = new PagoServicio();
    pagoServicio.descripcion = this.formularioPagoServicio.get('descripcion')?.value;
    pagoServicio.importe = this.formularioPagoServicio.get('importe')?.value;
    pagoServicio.medioPago= this.formularioPagoServicio.get('medioPago')?.value;
    pagoServicio.fecha = this.formularioPagoServicio.get('fecha')?.value;
    
   
    let descripcion:any;
    descripcion= pagoServicio.descripcion; 
    let fecha:any;
    fecha = pagoServicio.fecha;
    let importe:any;
    importe = pagoServicio.importe;
    let medioPago:any;
    medioPago = pagoServicio.medioPago;

 
     this.buscarIdPagoServicio(descripcion, fecha);
  
  setTimeout(() => {
    
  if(this.id_pagoServicio!=undefined){
   
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'Ya existe un pago servicio registrado con los datos registrados!',
      footer: 'Verifique los datos ingresados'
    })
  
  }
  else{
  
    this.psService.crearPagoServicio(pagoServicio).subscribe(res =>{
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cancha creada con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.mostrarPagosServicio();
      this.id_pagoServicio=undefined;
      this.formularioPagoServicio.reset(); 
      let tabla = document.getElementById('listadoPagosServicio');
  
     if(tabla)  tabla.style.display = "block"; 

     if(medioPago == "Efectivo"){

      this.cService.egresoEfectivo(importe).subscribe(res=>{
  
      });
     }
     else{
      this.cService.egresoDebito(importe).subscribe(res=>{
  
      });
     }
      
    });
    
  }
  
  }, 500);
    
  }

}
  buscarIdPagoServicio(descripcion:String, fecha:String){

    //let id_categoria:any;
    
      this.psService.mostrarPagosServicioPorDescripcionYFecha(descripcion, fecha).subscribe(res =>{
        
        this.pagoServicioPorDescripcionYFecha = res;
    
      });
      
      setTimeout(() => {
        
     
     if(this.pagoServicioPorDescripcionYFecha.length>0)
     {
      
      
     this.id_pagoServicio= this.pagoServicioPorDescripcionYFecha[0].id;
      
     }
     else{
    
     this.id_pagoServicio=undefined;
     }
    
     
    }, 200);
    
      }

      buscarIdPagoServicioPorParametros(descripcion:String, fecha:String, importe:number, medioPago:String){

        //let id_categoria:any;
        
          this.psService.mostrarPagosServicioPorDescripcionFechaImporteYMedioPago(descripcion, fecha, importe, medioPago).subscribe(res =>{
            
            this.pagoServicioPorParametros = res;
        
          });
          
          setTimeout(() => {
            
         
         if(this.pagoServicioPorParametros.length>0)
         {
          
          
         this.id_pagoServicioModificar= this.pagoServicioPorParametros[0].id;
          
         }
         else{
        
         this.id_pagoServicioModificar=undefined;
         }
        
         
        }, 200);
        
          }

      mostrarPagosServicio(){

        this.psService.mostrarPagosServicio().subscribe(res =>{
          this.pagosServicio = res;
        })
      }

      mostrarTabla(){
        this.mostrarPagosServicio();
        let tabla = document.getElementById('listadoPagosServicio')
        if(tabla)  tabla.style.display = "block"; 
      }

      activador(pagoServicio: PagoServicio ){

        this.formularioModificarPagoServicio.get('descripcion')?.setValue(pagoServicio.descripcion);
        this.formularioModificarPagoServicio.get('importe')?.setValue(pagoServicio.importe);
        this.formularioModificarPagoServicio.get('medioPagoModificar')?.setValue(pagoServicio.medioPago);
        this.formularioModificarPagoServicio.get('fecha')?.setValue(pagoServicio.fecha);
        
        //this.mostrarCategoriasPorParametros(this.nombreAModificar, this.tipoAModificar, this.deporteAModificar);
        this.descripcionAModificar = pagoServicio.descripcion;
        this.fechaAModificar = pagoServicio.fecha;
        this.importeAModificar = pagoServicio.importe;
        this.medioPagoAModificar = pagoServicio.medioPago;

        this.display= !this.display;
        
        }

        modificarPagoServicio(){

          if(this.formularioModificarPagoServicio.valid){
          
            let pagoServicio:PagoServicio;
            let importe:any;
            pagoServicio = new PagoServicio();
          
            pagoServicio.descripcion = this.formularioModificarPagoServicio.get('descripcion')?.value;
            pagoServicio.importe = this.formularioModificarPagoServicio.get('importe')?.value;
            pagoServicio.medioPago = this.formularioModificarPagoServicio.get('medioPagoModificar')?.value;
            pagoServicio.fecha = this.formularioModificarPagoServicio.get('fecha')?.value;
            this.medioPagoModificar = this.formularioModificarPagoServicio.get('medioPagoModificar')?.value;
            importe = this.formularioModificarPagoServicio.get('importe')?.value; 

            let descripcion :any;
            descripcion = pagoServicio.descripcion;
            let fecha :any;
            fecha = pagoServicio.fecha;
           
           //this.buscarIdPagoServicio(descripcion, fecha);
           this.buscarIdPagoServicioPorParametros(descripcion, fecha, importe, this.medioPagoModificar);
          
          setTimeout(() => {
          
          if(this.id_pagoServicioModificar!= undefined){
          
          this.display = !this.display;
          Swal.fire({
            icon: 'error',
            title: 'Registro fallido',
            text: 'Ya existe un pago servicio registrado con los datos ingresados!',
            footer: 'Verifique los datos ingresados'
          })
          
          }
          else{
          
          this.buscarIdPagoServicio(this.descripcionAModificar, this.fechaAModificar);
           setTimeout(() => {
            
          
           pagoServicio.id=this.id_pagoServicio;
          
           console.log(pagoServicio);
            this.psService.modificarPagoServicio(pagoServicio).subscribe(res =>{
              
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Pago de servicio actualizado con éxito!',
                showConfirmButton: false,
                timer: 1500
              })
              this.mostrarPagosServicio();
              this.display = !this.display;
              this.descripcionAModificar="";
              this.fechaAModificar="";
            
              this.id_pagoServicio=undefined;
              this.id_pagoServicioModificar=undefined;

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
                        console.log(res);
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

             
            });
          }, 500);
          
          }
          }, 500);
          }
          
          }

          eliminarPagoServicio(pagoServicio:PagoServicio){

            let descripcion:any = pagoServicio.descripcion;
            let fecha:any = pagoServicio.fecha;
            let importe:any = pagoServicio.importe;
          
                this.buscarIdPagoServicio(descripcion, fecha);
                setTimeout(() => {
          
                this.psService.eliminarPagoServicio(this.id_pagoServicio).subscribe(res =>{
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Pago de servicio eliminado con éxito!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                
                this.mostrarPagosServicio();
                this.pagoServicioPorDescripcionYFecha=[];
                this.id_pagoServicio=undefined;

                if(pagoServicio.medioPago== "Efectivo"){

                  this.cService.ingresoEfectivo(importe).subscribe(res=>{
              
                  });
                 }
                 else{
                  this.cService.ingresoDebito(importe).subscribe(res=>{
              
                  });
                 }
                  });
                
              }, 500);
           
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

          cerrar(){
            this.display = !this.display;
          }
  
  }

