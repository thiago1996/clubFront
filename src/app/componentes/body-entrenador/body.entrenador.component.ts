import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { Entrenador } from 'src/app/modelo/Entrenador';
import { Categoria } from 'src/app/modelo/Categoria';
import { EntrenadorServicio } from 'src/app/servicio/entrenador.servicio';
import { CategoriaServicio } from 'src/app/servicio/categoria.servicio';
import { SocioCuota } from 'src/app/modelo/SocioCuota';
import { TitleStrategy } from '@angular/router';
import Swal from 'sweetalert2';
import { ReporteServicio } from 'src/app/servicio/reporte.servicio';

@Component({
  selector: 'app-body-entrenador',
  templateUrl: './body.entrenador.component.html',
  styleUrls: ['./body.entrenador.component.css']
})
export class BodyEntrenadorComponent {

  entrenadores: Array<Entrenador>;
  entrenador:Entrenador= new Entrenador();
  formularioEntrenador: FormGroup;
  formularioModificarEntrenador:FormGroup;
  formularioAgregarCategoria: FormGroup;
  formularioEliminarCategoriaEntrenador:FormGroup;
  display:boolean;
  displayAddCategoria:boolean;
  displayEliminarCategoria:boolean;
  categorias:Array<Categoria>;
  nombreCategoria:any = "default";
  nombreEntrenador:any = "default";
  documentoAModificar:any;
  id_categoria:any;
  id_entrenador:any;
  filterPropertyName="";
  filterPropertyApellido="";
  filterPropertyDocumento="";
  filterPropertyCategoria="";
  searchDocumento:string="";
  searchName:string="";
  searchApellido:string="";
  searchCategoria:string="";
  categoriasAsignadas:Array<any>;
  catAsig: Array<number>;
  categoriasAsignadasAEliminar:Array<number>;
  entrenadorAEliminarCategoria:Entrenador;
  categoriaAEliminar:string="default";
  generarPdf:boolean=false;


constructor(private fb:FormBuilder, private eService: EntrenadorServicio, private cService: CategoriaServicio, private rService:ReporteServicio){

  this.entrenadores = new Array<Entrenador>();
  this.catAsig = new Array<number>();
  this.categoriasAsignadas = new Array<number>();
  this.display=false;
  this.displayAddCategoria=false;
  this.displayEliminarCategoria=false;
  this.categorias=[];
  this.categoriasAsignadasAEliminar=[];
  this.entrenadorAEliminarCategoria= new Entrenador();
 

  this.formularioEntrenador = fb.group({
    documento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required), 
    apellido: new FormControl('', Validators.required),
    domicilio: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    fechaAlta: new FormControl('', Validators.required)
    

  });
    

  this.formularioModificarEntrenador= fb.group({
    nombre: new FormControl('', Validators.required), 
    apellido: new FormControl('', Validators.required),
    domicilio: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    fechaAlta: new FormControl('', Validators.required)
    
  });
    
    this.formularioEliminarCategoriaEntrenador= fb.group({
      categoriaAEliminar: new FormControl('', Validators.required)
      
    });

  this.formularioAgregarCategoria = fb.group({ 

    nombreCategoria: new FormControl('', Validators.required),
    nombreEntrenador: new FormControl('', Validators.required)
  });
}

//Crear entrenador
crearEntrenador(){
  console.log(this.formularioEntrenador);
if(this.formularioEntrenador.valid){

  let entrenador = new Entrenador();

 // let docu = 39394793;
  entrenador.documento = this.formularioEntrenador.get('documento')?.value;
  entrenador.nombre = this.formularioEntrenador.get('nombre')?.value;
  entrenador.apellido = this.formularioEntrenador.get('apellido')?.value;
  entrenador.domicilio = this.formularioEntrenador.get('domicilio')?.value;
  entrenador.telefono = this.formularioEntrenador.get('telefono')?.value;
  entrenador.fechaNacimiento = this.formularioEntrenador.get('fechaNacimiento')?.value;
  entrenador.fechaAlta = this.formularioEntrenador.get('fechaAlta')?.value;
 
  this.eService.buscarEntrenadorPorDocumento(entrenador.documento).subscribe(res =>{

    if(res){
      Swal.fire({
        icon: 'error',
        title: 'Registro fallido',
        text: 'Ya existe un entrenador registrado con ese numero de Dni!',
        footer: 'Verifique los datos ingresados'
      })
    }
    else{

  this.eService.crearEntrenador(entrenador).subscribe(res =>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Entrenador creado con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarEntrenadores();
    
    this.formularioEntrenador.reset(); 
    this.mostrarTabla();
    /*
    let tabla = document.getElementById('listadoEntrenadores')
    if(tabla)  tabla.style.display = "block"; 
  */});

  }

  });
}
}

//Mostrar entrenadores
mostrarEntrenadores(){
  
  this.eService.mostrarEntrenadores().subscribe(res =>{
    this.entrenadores = res;
  
    res.forEach(entrenador => {
      
      entrenador.categorias.forEach(categoria => {
      
        this.catAsig.push((+categoria.nombre));
        
      });
      entrenador.categoriasAsignadas=this.catAsig;
     
      entrenador.categoriasAsignadas.sort(function(a, b){return a - b});
      this.catAsig=[];
    });

});

}

//Eliminar entrenador
eliminarEntrenador(idEntrenador:number){
this.eService.eliminarEntrenador(idEntrenador).subscribe(res =>{
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Entrenador eliminado con éxito!',
    showConfirmButton: false,
    timer: 1500
  })
this.mostrarEntrenadores();
});
}

//Activa el dialogo, ! significa lo contrario a lo que tenia la variable
activador(entrenador: Entrenador){

  this.documentoAModificar=entrenador.documento;
  this.formularioModificarEntrenador.get('nombre')?.setValue(entrenador.nombre);
  this.formularioModificarEntrenador.get('apellido')?.setValue(entrenador.apellido);
  this.formularioModificarEntrenador.get('domicilio')?.setValue(entrenador.domicilio);
  this.formularioModificarEntrenador.get('telefono')?.setValue(entrenador.telefono);
  this.formularioModificarEntrenador.get('fechaNacimiento')?.setValue(entrenador.fechaNacimiento);
  this.formularioModificarEntrenador.get('fechaAlta')?.setValue(entrenador.fechaAlta);
  
console.log(entrenador instanceof Entrenador);
console.log(entrenador instanceof Categoria);
  this.display= !this.display;
}
activadorCategoria(entrenador:Entrenador){

this.displayAddCategoria = !this.displayAddCategoria;
this.nombreEntrenador=entrenador.nombre;
console.log(this.nombreEntrenador);
//this.mostrarEntrenadores();
this.mostrarCategorias();


}

//Actualizar entrenador
modificarEntrenador(){

  console.log(this.formularioModificarEntrenador.valid);

  if(this.formularioModificarEntrenador.valid){

    
    let entrenador = new Entrenador();
  
    entrenador.documento = this.documentoAModificar;
    entrenador.nombre = this.formularioModificarEntrenador.get('nombre')?.value;
    entrenador.apellido = this.formularioModificarEntrenador.get('apellido')?.value;
    entrenador.domicilio = this.formularioModificarEntrenador.get('domicilio')?.value;
    entrenador.telefono = this.formularioModificarEntrenador.get('telefono')?.value;
    entrenador.fechaNacimiento = this.formularioModificarEntrenador.get('fechaNacimiento')?.value;
    entrenador.fechaAlta = this.formularioModificarEntrenador.get('fechaAlta')?.value;
    console.log(entrenador);
    this.eService.modificarEntrenador(entrenador).subscribe(res =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Entrenador actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.mostrarEntrenadores();
      this.formularioModificarEntrenador.reset(); 
      this.display = !this.display;
    });
  }
}

mostrarCategorias(){

  this.cService.mostrarCategorias().subscribe(res =>{
    this.categorias = res;

   
  });
}
/*
buscarEntrenadorPorDocumento(documento:number){

  this.eService.buscarEntrenadorPorDocumento(documento).subscribe(res =>{
    this.entrenador = res;
  });
}
*/
//Agregar categoria
agregarCategoria(){

  this.nombreCategoria = this.formularioAgregarCategoria.get('nombreCategoria')?.value;
  this.categorias.forEach(element => {
      
    
    console.log(this.nombreCategoria);
    if(element.nombre==this.nombreCategoria){
      this.id_categoria = element.id;
     
      
    }
  });
  this.nombreEntrenador = this.formularioAgregarCategoria.get('nombreEntrenador')?.value;
  this.entrenadores.forEach(element => {
      
    console.log(this.nombreEntrenador);
    if(element.nombre==this.nombreEntrenador){
      this.id_entrenador = element.documento;
      
    }
  
  });

  this.eService.agregarCategoria(this.id_entrenador, this.id_categoria).subscribe(res =>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Categoria agregada con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarEntrenadores();
    this.formularioAgregarCategoria.reset();
    this.nombreCategoria="default";
    this.nombreEntrenador="default";
    this.displayAddCategoria = !this.displayAddCategoria;

    //this.nombreEntrenador="default";
  });
  

}

activadorEliminarCategoriaEntrenador(entrenador:Entrenador){

this.mostrarCategorias();
this.categoriasAsignadasAEliminar=entrenador.categoriasAsignadas;
this.entrenadorAEliminarCategoria= entrenador;
this.displayEliminarCategoria= !this.displayEliminarCategoria;

}

eliminarCategoriaEntrenador(){

  this.id_entrenador=this.entrenadorAEliminarCategoria.documento;
console.log(this.categorias);
console.log(this.categoriaAEliminar);
  this.categoriaAEliminar = this.formularioEliminarCategoriaEntrenador.get('categoriaAEliminar')?.value;
  this.categorias.forEach(element => {
      
    if(element.nombre==this.categoriaAEliminar){
      this.id_categoria = element.id;
     
      
    }
  });

console.log(this.id_entrenador+" " +this.id_categoria);
  this.eService.eliminarCategoria(this.id_entrenador, this.id_categoria).subscribe(res =>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Categoria eliminada con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarEntrenadores();
    this.formularioEliminarCategoriaEntrenador.reset();
    this.displayEliminarCategoria= !this.displayEliminarCategoria;
  });

}

mostrarTabla(){

  this.mostrarEntrenadores();
  let tabla = document.getElementById('listadoEntrenadores')
  if(tabla)  tabla.style.display = "block"; 
  this.generarPdf=true;
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

onSearchEntrenadorCategoria(searchCategoria:string){
  this.searchCategoria = searchCategoria;
}

cerrar(){
  this.display = !this.display;
}

cerrarAgregarCategoria(){
  this.displayAddCategoria = !this.displayAddCategoria;
}

cerrarEliminarCategoria(){
  this.displayEliminarCategoria = !this.displayEliminarCategoria;
}

imprimir(){

  const encabezado = ["Documento", "Nombre", "Domicilio", "Teléfono", "Fecha de Nacimiento", "Fecha de Incorporación", "Categorias"];
  //const cuerpo = ["1111", "Luis", "2657231231", "Luis@gmail.com"];
  let entrenadoresFiltrado: Array<Entrenador>;
  entrenadoresFiltrado = new Array<Entrenador>();
 
  entrenadoresFiltrado= this.filtroEntrenadores(this.entrenadores, this.searchName, this.searchApellido, this.searchDocumento, this.searchCategoria);

 const cuerpo =  entrenadoresFiltrado.map(

  (obj : Entrenador) => {
    const datos = [
      obj.documento,
      obj.nombre + " " + obj.apellido,
      obj.domicilio,
      obj.telefono,
      obj.fechaNacimiento,
      obj.fechaAlta,
      obj.categoriasAsignadas
    ]
    return datos;
  }
 )

this.rService.imprimir(encabezado, cuerpo, "Listado de jugadores", true);

}

filtroEntrenadores(values: any[], searchName: string, searchApellido:string, searchDocumento:string, searchCategoria:string) {

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
    
    if(searchCategoria!=""){ 
      console.log(searchCategoria);
    
     filterValues.forEach(element => {
      
       filterValues= filterValues.filter(value => value.categoriasAsignadas.toString().includes(searchCategoria));
     
  
    });
  
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

 }
