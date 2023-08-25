import { NONE_TYPE } from '@angular/compiler';
import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { Categoria } from 'src/app/modelo/Categoria';
import { CategoriaServicio } from 'src/app/servicio/categoria.servicio';
import { ReporteServicio } from 'src/app/servicio/reporte.servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body-categoria',
  templateUrl: './body.categoria.component.html',
  styleUrls: ['./body.categoria.component.css']
})
export class BodyCategoriaComponent {

  categorias: Array<Categoria>;
  formularioCategoria: FormGroup;
  display:boolean;
  categoria:Categoria;
  categoriasPorParametros:Array<Categoria>;
  nombreAModificar:any;
  tipoAModificar:any;
  deporteAModificar:any;
  tipo:string="default";
  deporte:string="default";
  filterPropertyName="";
  filterPropertyType="";
  filterPropertyDeporte="";
  searchName:string="";
  searchType:string="";
  searchDeporte:string="";
  id_categoria:any;
  generarPdf:boolean=false;

  

constructor(private fb:FormBuilder, private cService: CategoriaServicio, private rService:ReporteServicio){

  this.categorias= new Array<Categoria>();
  this.display=false;
  this.categoria=new Categoria();
  this.categoriasPorParametros=[];
  this.nombreAModificar="";
  this.nombreAModificar="";
  this.deporteAModificar="";

  
  //this.mostrarCategorias();
  //console.log(this.categorias);

  this.formularioCategoria = fb.group({

    nombre: new FormControl('', Validators.required), 
    tipo: new FormControl('', Validators.required),
    deporte: new FormControl('', Validators.required)

    
  });
}

//Crear categoria
crearCategoria(){
if(this.formularioCategoria.valid){

  this.categoria.nombre = this.formularioCategoria.get('nombre')?.value;
  this.categoria.tipo = this.formularioCategoria.get('tipo')?.value;
  this.categoria.deporte = this.formularioCategoria.get('deporte')?.value;
  let tipo:any;
  tipo = this.categoria.tipo;
  let deporte:any;
  deporte = this.categoria.deporte;

  console.log(this.categoria.nombre);
  console.log(tipo);
  console.log(deporte);
   this.buscarIdCategoria(this.categoria.nombre, tipo, deporte);

setTimeout(() => {
  console.log(this.id_categoria);
if(this.id_categoria!=undefined){
 
  Swal.fire({
    icon: 'error',
    title: 'Registro fallido',
    text: 'Ya existe una categoria registrada con los datos registrados!',
    footer: 'Verifique los datos ingresados'
  })

}
else{


  this.cService.crearCategoria(this.categoria).subscribe(res =>{
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Categoria creada con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarCategorias();
    this.id_categoria=undefined;
    this.formularioCategoria.reset(); 
    let tabla = document.getElementById('listadoCategorias');

   if(tabla)  tabla.style.display = "block"; 
    
  });
  
}

}, 500);
   //this.mostrarCategorias();
   //console.log(this.categorias);
    
   // console.log(this.categoria);
  //console.log(this.categoria.id_categoria);
}

}

//Mostrar categorias
mostrarCategorias(){

  this.cService.mostrarCategorias().subscribe(res =>{
    this.categorias = res;
  })
}

//Eliminar categoria
eliminarCategoria(categoria:Categoria){

    let id:any;
    let nombre:any = categoria.nombre;
    let tipo:any = categoria.tipo;
    let deporte:any = categoria.deporte;
    let control = false;

    
        this.buscarIdCategoria(nombre, tipo, deporte);
        setTimeout(() => {
          
          console.log(this.id_categoria);

        this.cService.eliminarCategoria(this.id_categoria).subscribe(res =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Categoria eliminada con éxito!',
            showConfirmButton: false,
            timer: 1500
          })
        control = true;
        this.mostrarCategorias();
        this.categoriasPorParametros=[];
        this.id_categoria=undefined;
          });
        
      }, 500);
     
      setTimeout(() => {
        
      if(control ==false){

        Swal.fire({
          icon: 'error',
          title: 'Eliminación fallida',
          text: 'La categoria esta asociada a un jugador y/o a un entrenador!',
          footer: 'Verifique las categorias asociadas a jugadores y/o entrenadores'
        })
      }

    }, 500);

      control = false;
     // });
  //  },1000);
    

/*
let id:any;

this.categorias.forEach(element => {
      
  if(element.nombre==categoria.nombre){
    id = element.id_categoria; 
  }
  
});
this.cService.eliminarCategoria(id).subscribe(res =>{
this.mostrarCategorias();
});
*/
}

//Activa el dialogo, ! significa lo contrario a lo que tenia la variable
activador(categoria: Categoria){

  this.formularioCategoria.get('nombre')?.setValue(categoria.nombre);
  this.formularioCategoria.get('tipo')?.setValue(categoria.tipo);
  this.formularioCategoria.get('deporte')?.setValue(categoria.deporte);
  this.nombreAModificar=categoria.nombre;
  this.tipoAModificar=categoria.tipo;
  this.deporteAModificar=categoria.deporte;
 
//this.mostrarCategoriasPorParametros(this.nombreAModificar, this.tipoAModificar, this.deporteAModificar);

  this.display= !this.display;
  
}

//Actualizar categoria
modificarCategoria(){

  if(this.formularioCategoria.valid){

    this.categoria.nombre = this.formularioCategoria.get('nombre')?.value;
    this.categoria.tipo = this.formularioCategoria.get('tipo')?.value;
    this.categoria.deporte = this.formularioCategoria.get('deporte')?.value;
    let nombre:any = this.categoria.nombre;
    let tipo:any = this.categoria.tipo;
    let deporte:any = this.categoria.deporte;
   
   this.buscarIdCategoria(nombre,tipo,deporte);

setTimeout(() => {
  console.log(this.id_categoria);
if(this.id_categoria!=undefined){
  
  this.display = !this.display;
  Swal.fire({
    icon: 'error',
    title: 'Registro fallido',
    text: 'Ya existe una categoria registrada con los datos ingresados!',
    footer: 'Verifique los datos ingresados'
  })

}
else{

  this.buscarIdCategoria(this.nombreAModificar, this.tipoAModificar, this.deporteAModificar);
   setTimeout(() => {
    
 
   this.categoria.id=this.id_categoria;
   console.log(this.categoria);
    this.cService.modificarCategoria(this.categoria).subscribe(res =>{
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Categoria actualizada con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.mostrarCategorias();
      this.display = !this.display;
      this.nombreAModificar="";
      this.tipoAModificar="";
      this.deporteAModificar="";
      this.id_categoria=undefined;
     
    });
  }, 500);
  
}
}, 500);
  }
  
}

mostrarTabla(){
  this.mostrarCategorias();
  let tabla = document.getElementById('listadoCategorias')
  if(tabla)  tabla.style.display = "block"; 
  this.generarPdf=true;
}

buscarIdCategoria(nombre:string, tipo:string, deporte:string){

//let id_categoria:any;

  this.cService.mostrarCategoriasPorParametros(nombre, tipo, deporte).subscribe(res =>{
    
    this.categoriasPorParametros = res;

  });
  
  setTimeout(() => {
    
 
 if(this.categoriasPorParametros.length>0)
 {
  
  
 this.id_categoria= this.categoriasPorParametros[0].id;
  
 }
 else{

 this.id_categoria=undefined;
 }

 
}, 200);

  }

 

 // return undefined;

//}

onSearchCategoriaName(searchName:string){
  this.searchName =searchName;
   
}

onSearchCategoriaType(searchType:string){
  this.searchType = searchType;
}

onSearchCategoriaDeporte(searchDeporte:string){
  this.searchDeporte = searchDeporte;
}

cerrar(){
  this.display = !this.display;
}

imprimir(){

  const encabezado = ["Nombre", "Tipo", "Deporte"];
  //const cuerpo = ["1111", "Luis", "2657231231", "Luis@gmail.com"];
  let categoriasFiltrado: Array<Categoria>;
  categoriasFiltrado = new Array<Categoria>();
 
  categoriasFiltrado= this.filtroCategorias(this.categorias, this.searchName, this.searchType, this.searchDeporte);

 const cuerpo =  categoriasFiltrado.map(

  (obj : Categoria) => {
    const datos = [
      obj.nombre,
      obj.tipo,
      obj.deporte
    ]
    return datos;
  }
 )

this.rService.imprimir(encabezado, cuerpo, "Listado de categorias", true);

}

filtroCategorias(values: Categoria[], searchName: string, searchType:string, searchDeporte:string) {

  
  if(values.length>0){
    
    let filterValues;
  
    if(searchName!=""){ 
    values.forEach(value =>
      {
    let nombre:any=value.nombre;
    value.nombre= nombre.toLowerCase();
  
}
    );
    searchName=searchName.toLowerCase();
    filterValues= values.filter(value => value.nombre?.includes(searchName));
  }
    else{
     
     filterValues= values;
    }
    if(searchType!=""){
      values.forEach(value =>
        {
      let tipo:any=value.tipo;
      value.tipo= tipo.toLowerCase();
  }
      );
    searchType=searchType.toLowerCase();
    filterValues=filterValues.filter(value => value.tipo?.includes(searchType));
    }

    if(searchDeporte!=""){
      values.forEach(value =>
        {
      let deporte:any=value.deporte;
      value.deporte= deporte.toLowerCase();
  }
      );
    searchDeporte=searchDeporte.toLowerCase();
    filterValues=filterValues.filter(value => value.deporte?.includes(searchDeporte));
    }
 
    filterValues.forEach(element => {
      element.tipo = this.mayusculaPrimerLetra(element.tipo);
      element.deporte = this.mayusculaPrimerLetra(element.deporte);
   });

  return filterValues;

  }

  return values;
}
    mayusculaPrimerLetra(string:String) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

}