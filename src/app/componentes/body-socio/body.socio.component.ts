import { style } from '@angular/animations';
import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Socio } from 'src/app/modelo/Socio';
import { ReporteServicio } from 'src/app/servicio/reporte.servicio';
import { SocioServicio } from 'src/app/servicio/socio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-body-socio',
  templateUrl: './body.socio.component.html',
  styleUrls: ['./body.socio.component.css']
})
export class BodySocioComponent {

  socios: Array<Socio>;
  formularioSocio: FormGroup;
  formularioModificarSocio: FormGroup;
  display:boolean;
  properties: string="";
  filterPropertyName="";
  filterPropertyApellido="";
  filterPropertyDocumento="";
  searchName:string="";
  searchApellido:string="";
  searchDocumento:string="";
  documentoAModificar:any;
  generarPdf:boolean=false;

constructor(private fb:FormBuilder, private sService: SocioServicio, private rService:ReporteServicio, private router:Router){

  this.socios = new Array<Socio>();
  this.display=false;
  this.formularioSocio = fb.group({
    
    documento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required), 
    apellido: new FormControl('', Validators.required),
    domicilio: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    fechaAsociacion: new FormControl('', Validators.required)
  
  });

  this.formularioModificarSocio = fb.group({
    
    nombre: new FormControl('', Validators.required), 
    apellido: new FormControl('', Validators.required),
    domicilio: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    fechaAsociacion: new FormControl('', Validators.required)

  });
}

//Crear socio
crearSocio(){
if(this.formularioSocio.valid){

  let socio = new Socio();

  socio.documento = this.formularioSocio.get('documento')?.value;
  socio.nombre = this.formularioSocio.get('nombre')?.value;
  socio.apellido = this.formularioSocio.get('apellido')?.value;
  socio.domicilio = this.formularioSocio.get('domicilio')?.value;
  socio.telefono = this.formularioSocio.get('telefono')?.value;
  socio.fechaNacimiento = this.formularioSocio.get('fechaNacimiento')?.value;
  socio.fechaAsociacion = this.formularioSocio.get('fechaAsociacion')?.value;

  
  this.sService.buscarSocioPorDocumento(socio.documento).subscribe(res =>{

  if(res){
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'Ya existe un socio registrado con ese numero de Dni!',
      footer: 'Verifique los datos ingresados'
    })
  }
  else{

  this.sService.crearSocio(socio).subscribe(res =>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Socio creado con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarSocios();
    this.formularioSocio.reset(); 
    let tabla = document.getElementById('listadoSocios')
    if(tabla)  tabla.style.display = "block"; 
  });

  }
});
}
}

//Mostrar socios
mostrarSocios(){

  this.sService.mostrarSocios().subscribe(res =>{
    this.socios = res;
  })
}

//Eliminar socio
eliminarSocio(idSocio:number){
this.sService.eliminarSocio(idSocio).subscribe(res =>{
this.mostrarSocios();
});
}

//Activa el dialogo, ! significa lo contrario a lo que tenia la variable
activador(socio: Socio){

  this.documentoAModificar=socio.documento;
  this.formularioModificarSocio.get('nombre')?.setValue(socio.nombre);
  this.formularioModificarSocio.get('apellido')?.setValue(socio.apellido);
  this.formularioModificarSocio.get('domicilio')?.setValue(socio.domicilio);
  this.formularioModificarSocio.get('telefono')?.setValue(socio.telefono);
  this.formularioModificarSocio.get('fechaNacimiento')?.setValue(socio.fechaNacimiento);
  this.formularioModificarSocio.get('fechaAsociacion')?.setValue(socio.fechaAsociacion);
  

 

  this.display= !this.display;
}

//Actualizar socio
modificarSocio(){

  if(this.formularioModificarSocio.valid){

    let socio = new Socio();
  
    socio.documento = this.documentoAModificar;
    socio.nombre = this.formularioModificarSocio.get('nombre')?.value;
    socio.apellido = this.formularioModificarSocio.get('apellido')?.value;
    socio.domicilio = this.formularioModificarSocio.get('domicilio')?.value;
    socio.telefono = this.formularioModificarSocio.get('telefono')?.value;
    socio.fechaNacimiento = this.formularioModificarSocio.get('fechaNacimiento')?.value;
    socio.fechaAsociacion = this.formularioModificarSocio.get('fechaAsociacion')?.value;
    this.sService.modificarSocio(socio).subscribe(res =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Socio actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.mostrarSocios();
      this.formularioSocio.reset(); 
      this.display = !this.display;
    });
  }
}

mostrarTabla(){
  this.mostrarSocios();
  setTimeout(()=>{

  let tabla = document.getElementById('listadoSocios')
  if(tabla)  tabla.style.display = "block"; 
},1000);
this.generarPdf = true;
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

cerrar(){
  this.display = !this.display;
}

imprimir(){


  const encabezado = ["Documento", "Nombre", "Domicilio", "Teléfono", "Fecha de Nacimiento", "Fecha de Asociacion"];
  //const cuerpo = ["1111", "Luis", "2657231231", "Luis@gmail.com"];
  let sociosFiltrado: Array<Socio>;
  sociosFiltrado = new Array<Socio>();
 
  sociosFiltrado= this.filtroSocios(this.socios, this.searchName, this.searchApellido, this.searchDocumento);

 const cuerpo =  sociosFiltrado.map(

  (obj : Socio) => {
    const datos = [
      obj.documento,
      obj.nombre + " " + obj.apellido,
      obj.domicilio,
      obj.telefono,
      obj.fechaNacimiento,
      obj.fechaAsociacion
    ]
    return datos;
  }
 )

this.rService.imprimir(encabezado, cuerpo, "Listado de socios", true);
}

filtroSocios(values: any[], searchName: string, searchApellido:string, searchDocumento:string) {

let filterValues = values;

  if(values.length>0){
  
    if(searchName!=""){ 
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
   
    filterValues= filterValues.filter(value => value.documento?.toString().includes(searchDocumento));
  }
  

  }

  filterValues.forEach(element => {
    element.nombre = this.mayusculaPrimerLetra(element.nombre);
    element.apellido = this.mayusculaPrimerLetra(element.apellido);
 });

  return filterValues;
  
  }

  mayusculaPrimerLetra(string:String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

volver(){
  if(this.router.url=="/homeAdministrador/socio/nuevo"){ 
  this.router.navigate(['/homeAdministrador']);
  }
  else{
    this.router.navigate(['/homeInvitado']);
  }
}

}

