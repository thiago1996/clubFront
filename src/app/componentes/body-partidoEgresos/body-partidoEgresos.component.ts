import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { Partido } from 'src/app/modelo/Partido';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import { PartidoServicio } from 'src/app/servicio/partido.servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body-partidoEgresos',
  templateUrl: './body-partidoEgresos.component.html',
  styleUrls: ['./body-partidoEgresos.component.css']
})
export class BodyPartidoEgresosComponent {

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
  display:boolean;
  formularioEgresosPartido:FormGroup;
  partido:Partido;
  egresoArbitrosAModificar:any;
  egresoSeguridadAModificar:any;
  egresoMedicosAModificar:any;
  egresoExtraAModificar:any;

  partidos: Array<Partido>;

  constructor(private fb:FormBuilder, private pService: PartidoServicio, private cService: CuentaServicio){
  
    this.partidos= new Array<Partido>();
    this.display = false;
    this.partido = new Partido();
    this.mostrarTabla();

    this.formularioEgresosPartido = fb.group({

      gastoSeguridad: new FormControl('', Validators.required),
      gastoArbitros: new FormControl('', Validators.required),
      gastoMedicos: new FormControl('', Validators.required),
      gastoExtra: new FormControl('', Validators.required),
      observaciones: new FormControl('')
    });

  }

  mostrarPartidos(){

    this.pService.mostrarPartidos().subscribe(res =>{
      this.partidos = res;
    })
  }

  modificarPartido(){

    if(this.formularioEgresosPartido.valid){

    let gastoArbitros:number;
    let gastoSeguridad:number;
    let gastoMedicos:number;
    let gastoExtra:number;
    let observaciones:any;
    let valorArestarDeCuenta=0;
    let valorASumarDeCuenta=0;
    
    gastoArbitros = +this.formularioEgresosPartido.get('gastoArbitros')?.value;
    gastoSeguridad = +this.formularioEgresosPartido.get('gastoSeguridad')?.value;
    gastoMedicos = +this.formularioEgresosPartido.get('gastoMedicos')?.value;
    gastoExtra = +this.formularioEgresosPartido.get('gastoExtra')?.value;
    observaciones = this.formularioEgresosPartido.get('observaciones')?.value;

if((!isNaN(gastoArbitros))||(!isNaN(gastoSeguridad))||(!isNaN(gastoMedicos))||(!isNaN(gastoExtra))){

  if((gastoArbitros<0)|| (gastoSeguridad<0) || (gastoMedicos<0) || (gastoExtra<0)){
    this.display = !this.display;
    Swal.fire({
      icon: 'error',
      title: 'Actualización fallida',
      text: 'Los valores de gastos deben ser mayor o igual a 0!',
      footer: 'Verifique los datos ingresados'
    })

  }
  else{

    this.partido.gastoArbitros = gastoArbitros;
    this.partido.gastoSeguridad = gastoSeguridad;
    this.partido.gastoMedicos = gastoMedicos;
    this.partido.gastoExtra = gastoExtra;
    this.partido.observaciones= observaciones;

    this.pService.modificarPartido(this.partido).subscribe(res =>{
            
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Partido actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.mostrarPartidos();
      this.display = !this.display;
      
      if((this.egresoArbitrosAModificar>0) &&(this.egresoArbitrosAModificar!=gastoArbitros)){

        valorASumarDeCuenta+=this.egresoArbitrosAModificar;
     
      }
  
        if(this.egresoArbitrosAModificar!=gastoArbitros){
          
      valorArestarDeCuenta+=gastoArbitros;
    }
  
    if((this.egresoMedicosAModificar>0) &&(this.egresoMedicosAModificar!=gastoMedicos)){
    
         valorASumarDeCuenta+=this.egresoMedicosAModificar;
    
    }
 
      if(this.egresoMedicosAModificar!=gastoMedicos){
      
       valorArestarDeCuenta+=gastoMedicos;
  }

  if((this.egresoSeguridadAModificar>0) &&(this.egresoSeguridadAModificar!=gastoSeguridad)){

    valorASumarDeCuenta+=this.egresoSeguridadAModificar;
  }

    if(this.egresoSeguridadAModificar!=gastoSeguridad){
     
  valorArestarDeCuenta+=gastoSeguridad;

    }

if((this.egresoExtraAModificar>0) &&(this.egresoExtraAModificar!=gastoExtra)){
 
valorASumarDeCuenta+=this.egresoExtraAModificar;

}

  if(this.egresoExtraAModificar!=gastoExtra){
   
valorArestarDeCuenta+=gastoExtra;

  }

console.log(valorASumarDeCuenta);
console.log(valorArestarDeCuenta);

  this.cService.ingresoEfectivo(valorASumarDeCuenta).subscribe(res=>{
              
  });

  setTimeout(() => {
    
  
  this.cService.egresoEfectivo(valorArestarDeCuenta).subscribe(res=>{
              
  });
}, 500);

    });

}
  }

  else{
    this.display = !this.display;
    Swal.fire({
      icon: 'error',
      title: 'Actualización fallida',
      text: 'Los valores de gastos deben ser numéricos!',
      footer: 'Verifique los datos ingresados'
    })
  }

  }

  else{
  this.display = !this.display;
  Swal.fire({
    icon: 'error',
    title: 'Actualización fallida',
    text: 'Debe completar todos los datos!',
    footer: 'Verifique los datos ingresados'
  })

  }
   
  }

  activador(partido:Partido){
    
    this.formularioEgresosPartido.get('gastoArbitros')?.setValue(partido.gastoArbitros);
    this.formularioEgresosPartido.get('gastoSeguridad')?.setValue(partido.gastoSeguridad);
    this.formularioEgresosPartido.get('gastoMedicos')?.setValue(partido.gastoMedicos);
    this.formularioEgresosPartido.get('gastoExtra')?.setValue(partido.gastoExtra);
    this.formularioEgresosPartido.get('observaciones')?.setValue(partido.observaciones);
    
    this.partido.id=partido.id;  
    this.partido.descripcion=partido.descripcion;
    this.partido.cancha=partido.cancha;
    this.partido.fecha=partido.fecha;
    this.partido.categoria=partido.categoria;
    this.partido.ingresoEntradas=partido.ingresoEntradas;
    /*this.partido.gastoArbitros=partido.gastoArbitros;
    this.partido.gastoExtra=partido.gastoExtra;
    this.partido.gastoMedicos=partido.gastoMedicos;
    this.partido.gastoSeguridad=partido.gastoSeguridad;
    this.partido.observaciones=partido.observaciones;
*/
    this.egresoArbitrosAModificar=partido.gastoArbitros;
    this.egresoSeguridadAModificar=partido.gastoSeguridad;
    this.egresoMedicosAModificar=partido.gastoMedicos;
    this.egresoExtraAModificar=partido.gastoExtra;

    this.display= !this.display;

  }

  mostrarTabla(){
    this.mostrarPartidos();
    let tabla = document.getElementById('listadoEgresoPartidos')
    if(tabla)  tabla.style.display = "block"; 
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

  cerrar(){
    this.display = !this.display;
  }

}