import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { Jugador } from 'src/app/modelo/Jugador';
import { Categoria } from 'src/app/modelo/Categoria';
import { JugadorServicio } from 'src/app/servicio/jugador.servicio';
import Swal from 'sweetalert2';
import { ReporteServicio } from 'src/app/servicio/reporte.servicio';

@Component({
  selector: 'app-body-jugador',
  templateUrl: './body.jugador.component.html',
  styleUrls: ['./body.jugador.component.css']
})
export class BodyJugadorComponent {

  jugadores:Array<Jugador>;
  formularioJugador: FormGroup;
  formularioModificarJugador: FormGroup;
  display:boolean;
  categorias:Array<Categoria>;
  categoria:Categoria;
  nombreCategoriaAModificar:any;
  nombreCategoria:any = "default"
  filterPropertyName="";
  filterPropertyApellido="";
  filterPropertyDocumento="";
  filterPropertyCategoria="";
  searchName:string="";
  searchApellido:string="";
  searchDocumento:string="";
  searchCategoria:string="";
  documentoAModificar:any;
  generarPdf:boolean=false;


constructor(private fb:FormBuilder, private jService: JugadorServicio, private rService:ReporteServicio){

  this.display=false;
  this.categoria=new Categoria();
 this.categorias=[];
 this.jugadores=[];
  
 this.mostrarCategorias();
 
  this.nombreCategoriaAModificar="";
 
  this.formularioJugador = fb.group({
    documento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required), 
    apellido: new FormControl('', Validators.required),
    nombreCategoria: new FormControl('', Validators.required),
    domicilio: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    fechaAlta: new FormControl('', Validators.required)
    

  });

  this.formularioModificarJugador = fb.group({
    
    nombre: new FormControl('', Validators.required), 
    apellido: new FormControl('', Validators.required),
    nombreCategoriaAModificar: new FormControl('', Validators.required),
    domicilio: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    fechaAlta: new FormControl('', Validators.required)
    

  });

}

//Crear jugador
crearJugador(){
if(this.formularioJugador.valid){

  let jugador = new Jugador();
  let documentoJugador:any;

  jugador.documento = this.formularioJugador.get('documento')?.value;
  jugador.nombre = this.formularioJugador.get('nombre')?.value;
  jugador.apellido = this.formularioJugador.get('apellido')?.value;
  jugador.domicilio = this.formularioJugador.get('domicilio')?.value;
  jugador.telefono = this.formularioJugador.get('telefono')?.value;
  jugador.fechaNacimiento = this.formularioJugador.get('fechaNacimiento')?.value;
  jugador.fechaAlta = this.formularioJugador.get('fechaAlta')?.value;
 
  documentoJugador = +jugador.documento;

  this.mostrarCategorias();

  this.categorias.forEach(element => {
    if(element.nombre==this.nombreCategoria)
    {
      this.categoria.id=element.id;
      this.categoria.tipo=element.tipo;
      this.categoria.nombre=element.nombre;
    }
    
  });
 jugador.categoria=this.categoria;

 this.jService.buscarJugadorPorDocumento(documentoJugador).subscribe(res =>{

  if(res){
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'Ya existe un jugador registrado con ese numero de Dni!',
      footer: 'Verifique los datos ingresados'
    })
  }
  else{

  this.jService.crearJugador(jugador).subscribe(res =>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Jugador creado con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarJugadores();
    console.log(this.jugadores);
    this.formularioJugador.reset(); 
    let tabla = document.getElementById('listadoJugadores')
    if(tabla)  tabla.style.display = "block"; 
  });

  }
  
 });

}

}

//Mostrar jugadores
mostrarJugadores(){

  this.jService.mostrarJugadores().subscribe(res =>{
    console.log(res);
    this.jugadores = res;
  })
}

//Eliminar entrenador
eliminarJugador(idJugador:number){
this.jService.eliminarJugador(idJugador).subscribe(res =>{
this.mostrarJugadores();
});
}

//Activa el dialogo, ! significa lo contrario a lo que tenia la variable
activador(jugador: Jugador){

  this.documentoAModificar=jugador.documento;
  this.formularioModificarJugador.get('nombre')?.setValue(jugador.nombre);
  this.formularioModificarJugador.get('apellido')?.setValue(jugador.apellido);
  this.formularioModificarJugador.get('domicilio')?.setValue(jugador.domicilio);
  this.formularioModificarJugador.get('telefono')?.setValue(jugador.telefono);
  this.formularioModificarJugador.get('fechaNacimiento')?.setValue(jugador.fechaNacimiento);
  this.formularioModificarJugador.get('fechaAlta')?.setValue(jugador.fechaAlta);

  this.nombreCategoriaAModificar=jugador.categoria?.nombre;
  //this.nombreCategoria = jugador.categoria?.nombre;
  this.formularioModificarJugador.get('nombreCategoriaAModificar')?.setValue(this.nombreCategoriaAModificar);
  //console.log(this.nombreCategoria);
  
  this.display= !this.display;
}

//Actualizar jugador
modificarJugador(){

  if(this.formularioModificarJugador.valid){

    let jugador = new Jugador();
  
    jugador.documento = this.documentoAModificar;
    jugador.nombre = this.formularioModificarJugador.get('nombre')?.value;
    jugador.apellido = this.formularioModificarJugador.get('apellido')?.value;
    jugador.domicilio = this.formularioModificarJugador.get('domicilio')?.value;
    jugador.telefono = this.formularioModificarJugador.get('telefono')?.value;
    jugador.fechaNacimiento = this.formularioModificarJugador.get('fechaNacimiento')?.value;
    jugador.fechaAlta = this.formularioModificarJugador.get('fechaAlta')?.value;

    this.categorias.forEach(element => {
      
      
      if(element.nombre==this.nombreCategoriaAModificar){
        this.categoria.id = element.id;
        this.categoria.nombre=element.nombre;
        this.categoria.tipo=element.tipo;
        
      }
    });
    jugador.categoria=this.categoria;

    this.jService.modificarJugador(jugador).subscribe(res =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Socio actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.mostrarJugadores();
     
      this.display = !this.display;
    });
  }
}

//Mostrar categorias
mostrarCategorias(){

  this.jService.mostrarCategorias().subscribe(res =>{
    this.categorias = res;
    
  });
}

mostrarTabla(){
  this.mostrarJugadores();
  let tabla = document.getElementById('listadoJugadores')
  if(tabla)  tabla.style.display = "block"; 
  this.generarPdf=true;
}

onSearchJugadorName(searchName:string){
  this.searchName =searchName;
   
}

onSearchJugadorApellido(searchApellido:string){
  this.searchApellido = searchApellido;
}

onSearchJugadorDocumento(searchDocumento:string){
  this.searchDocumento = searchDocumento;
}

onSearchJugadorCategoria(searchCategoria:string){
  this.searchCategoria = searchCategoria;
}

cerrar(){
  this.display = !this.display;
}

imprimir(){


  const encabezado = ["Documento", "Nombre", "Categoría", "Deporte", "Domicilio", "Teléfono", "Fecha de Nacimiento", "Fecha de Incorporación"];
  //const cuerpo = ["1111", "Luis", "2657231231", "Luis@gmail.com"];
  let jugadoresFiltrado: Array<Jugador>;
  jugadoresFiltrado = new Array<Jugador>();
 
  jugadoresFiltrado= this.filtroJugadores(this.jugadores, this.searchName, this.searchApellido, this.searchDocumento, this.searchCategoria);

 const cuerpo =  jugadoresFiltrado.map(

  (obj : Jugador) => {
    const datos = [
      obj.documento,
      obj.nombre + " " + obj.apellido,
      obj.categoria?.nombre,
      obj.categoria?.deporte,
      obj.domicilio,
      obj.telefono,
      obj.fechaNacimiento,
      obj.fechaAlta
    ]
    return datos;
  }
 )

this.rService.imprimir(encabezado, cuerpo, "Listado de jugadores", true);

}

filtroJugadores(values: any[], searchName: string, searchApellido:string, searchDocumento:string, searchCategoria:string) {

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

      filterValues=filterValues.filter(value => value.categoria?.nombre.includes(searchCategoria));
      
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
