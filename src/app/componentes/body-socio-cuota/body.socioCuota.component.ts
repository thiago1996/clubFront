import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { SocioCuotaServicio } from 'src/app/servicio/socioCuota.servicio';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import { Socio } from '../../modelo/Socio';
import { Cuota } from '../../modelo/Cuota';
import { SocioCuota } from 'src/app/modelo/SocioCuota';
import Swal from 'sweetalert2';
import { ReporteServicio } from 'src/app/servicio/reporte.servicio';
import { Router } from '@angular/router';
import { TransaccionServicio } from 'src/app/servicio/transaccion.servicio';
import { Transaccion } from 'src/app/modelo/Transaccion';
import { SocioServicio } from 'src/app/servicio/socio.service';


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
  cuota:Cuota;
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
  generarPdf:boolean=false;
  idTransaccion:any;
  cuotaModificar:any;
  socioPorDocumento:Socio;


constructor(private fb:FormBuilder, private scService: SocioCuotaServicio, private sService: SocioServicio, private cService: CuentaServicio, private rService:ReporteServicio, private tService:TransaccionServicio, private router:Router){

  //this.display=false;
    this.socios=[];
    this.sociosCuotas=[];
    this.mostrarSocios();
    this.mes=0;
    this.cuotaPorParametros = new Cuota();
    this.cuota=new Cuota();
    this.socioPorDocumento = new Socio();

 
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
 
  nombre=socio.nombre?.trim();
  apellido=socio.apellido?.trim();

  let transaccion:Transaccion;
  transaccion = new Transaccion();

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

    transaccion.descripcion = this.documento+" "+nombre+" "+apellido+ " "+this.mes+"/"+anio;
    transaccion.fecha=fecha;
    transaccion.importe=precio;
    transaccion.medioPago=this.medioPago;
    transaccion.tipo="Ingreso";
    transaccion.socio=socio;
    transaccion.cuota=this.cuota;
   
    this.tService.crearTransaccion(transaccion).subscribe(res =>{
 
    })
    
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
  this.cuotaModificar=socioCuota.cuota;

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
    let transaccion:Transaccion;
    transaccion = new Transaccion();
    let control = false;
   
this.buscarSocioPorDocumento(this.documentoSocioAModificar);

    precio = this.formularioModificarSocioCuota.get('precio')?.value;
    fechaPago = this.formularioModificarSocioCuota.get('fechaPago')?.value;
    this.medioPagoModificar = this.formularioModificarSocioCuota.get('medioPagoModificar')?.value;

    this.idTransaccionPorDocumentoSocioIdCuota(this.documentoSocioAModificar, this.id_cuotaAModificar); 

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
        
      
      transaccion.tipo="Ingreso";
      transaccion.id=this.idTransaccion;
      transaccion.cuota=this.cuotaModificar;
      transaccion.socio=this.socioPorDocumento;
      transaccion.medioPago=this.medioPagoModificar;
      transaccion.importe=precio;
      transaccion.fecha=fechaPago;
      transaccion.descripcion=this.documentoSocioAModificar+" "+this.nombreSocioAModificar+" "+this.apellidoSocioAModificar+" "+transaccion.cuota?.mes+"/"+transaccion.cuota?.anio;

      this.tService.crearTransaccion(transaccion).subscribe(res=>{
  
      });
    }, 300);
  
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
      this.cuota=res;
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
  this.generarPdf=true;
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

    this.idTransaccionPorDocumentoSocioIdCuota(documentoSocio, id_cuota);
   
   setTimeout(() => {
     console.log(this.idTransaccion);
    this.tService.eliminarTransaccion(this.idTransaccion).subscribe(res => {
    });

   }, 300);
   
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

    imprimir(){

      const encabezado = ["Documento", "Nombre", "Año", "Mes", "Precio", "Medio", "Fecha de pago"];
    
      let socioCuotaFiltrado: Array<SocioCuota>;
      socioCuotaFiltrado = new Array<SocioCuota>();
     
      socioCuotaFiltrado= this.filtroSocioCuota(this.sociosCuotas, this.searchName, this.searchApellido, this.searchDocumento, this.searchAnio, this.searchMes, this.searchMedioPago);
    
     const cuerpo =  socioCuotaFiltrado.map(
    
      (obj : SocioCuota) => {
        const datos = [
          obj.documento,
          obj.nombre + " " + obj.apellido,
          obj.anioCuota,
          obj.mesCuota,
          obj.precio,
          obj.medioPago,
          obj.fechaPago
        ]
        return datos;
      }
     )
    
    this.rService.imprimir(encabezado, cuerpo, "Listado de pago de cuotas de socios", true);
    
    }
    
    filtroSocioCuota(values: SocioCuota[], searchName: string, searchApellido:string,searchDocumento: string, searchAnio:string, searchMes:string, searchMedioPago:string): any[] {

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

        if(this.router.url=="/homeAdministrador/socioCuota/nuevo"){ 
          this.router.navigate(['/homeAdministrador']);
          }
          else{
            this.router.navigate(['/homeInvitado']);
          }
      }

      idTransaccionPorDocumentoSocioIdCuota(documento:number,idCuota:number){

        this.tService.mostrarTransaccionesPorSocioYCuota(documento, idCuota).subscribe(res=>{
                    
         this.idTransaccion=res[0].id;
        });
      }

      buscarSocioPorDocumento(documento:number)
      {

       this.sService.obtenerSocioPorDocumento(documento).subscribe(res=>{
      
        this.socioPorDocumento=res;
   
       });
}
    
}