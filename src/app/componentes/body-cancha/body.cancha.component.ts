import { COMPILER_OPTIONS, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { Cancha } from 'src/app/modelo/Cancha';
import { CanchaServicio } from 'src/app/servicio/cancha.servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body-cancha',
  templateUrl: './body.cancha.component.html',
  styleUrls: ['./body.cancha.component.css']
})
export class BodyCanchaComponent {

  canchas: Array<Cancha>;
  formularioCancha: FormGroup;
  formularioModificarCancha: FormGroup;
  cancha:Cancha;
  id_cancha:any;
  canchasPorNumero:Array<Cancha>;
  display:boolean;
  numeroAModificar:any;
  

  constructor(private fb:FormBuilder, private cService: CanchaServicio){
  
    this.formularioCancha = fb.group({

    numero: new FormControl('', Validators.required), 
    descripcion: new FormControl('', Validators.required),
  });

  this.cancha=new Cancha();
  this.canchas= new Array<Cancha>();
  this.canchasPorNumero=[];
  this.display=false;

  this.formularioModificarCancha = fb.group({

    numero: new FormControl('', Validators.required), 
    descripcion: new FormControl('', Validators.required),

    
  });

  }

  //Crear categoria
crearCancha(){
  if(this.formularioCancha.valid){
  
    let cancha:Cancha;
    let numero:number;
    numero = +this.formularioCancha.get('numero')?.value;
    cancha = new Cancha();
    cancha.numero = numero;
    cancha.descripcion = this.formularioCancha.get('descripcion')?.value;
    
    
    let descripcion:any;
    descripcion= cancha.descripcion; 
 
     this.buscarIdCancha(numero);
  
  setTimeout(() => {
    
  if(this.id_cancha!=undefined){
   
    Swal.fire({
      icon: 'error',
      title: 'Registro fallido',
      text: 'Ya existe una cancha registrada con los datos registrados!',
      footer: 'Verifique los datos ingresados'
    })
  
  }
  else{
  
    console.log(cancha);
    this.cService.crearCancha(cancha).subscribe(res =>{
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cancha creada con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.mostrarCanchas();
      this.id_cancha=undefined;
      this.formularioCancha.reset(); 
      let tabla = document.getElementById('listadoCanchas');
  
     if(tabla)  tabla.style.display = "block"; 
      
    });
    
  }
  
  }, 500);
    
  }
  
  }

  mostrarTabla(){
    this.mostrarCanchas();
    let tabla = document.getElementById('listadoCanchas')
    if(tabla)  tabla.style.display = "block"; 
  }

  mostrarCanchas(){

    this.cService.mostrarCanchas().subscribe(res =>{
      this.canchas = res;
    })
  }

  buscarIdCancha(numero:number){

    //let id_categoria:any;
    
      this.cService.mostrarCanchasPorNumero(numero).subscribe(res =>{
        
        this.canchasPorNumero = res;
    
      });
      
      setTimeout(() => {
        
     
     if(this.canchasPorNumero.length>0)
     {
      
      
     this.id_cancha= this.canchasPorNumero[0].id;
      
     }
     else{
    
     this.id_cancha=undefined;
     }
    
     
    }, 200);
    
      }

      //Eliminar categoria
eliminarCancha(cancha:Cancha){

 
  let numero:any = cancha.numero;
  let descripcion:any = cancha.descripcion;

      this.buscarIdCancha(numero);
      setTimeout(() => {

      this.cService.eliminarCancha(this.id_cancha).subscribe(res =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cancha eliminada con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
    
      this.mostrarCanchas();
      this.canchasPorNumero=[];
      this.id_cancha=undefined;
        });
      
    }, 500);
 
}

//Activa el dialogo, ! significa lo contrario a lo que tenia la variable
activador(cancha: Cancha){

this.formularioModificarCancha.get('numero')?.setValue(cancha.numero);
this.formularioModificarCancha.get('descripcion')?.setValue(cancha.descripcion);

//this.mostrarCategoriasPorParametros(this.nombreAModificar, this.tipoAModificar, this.deporteAModificar);
this.numeroAModificar = cancha.numero;
this.display= !this.display;

}

//Actualizar categoria
modificarCancha(){

if(this.formularioModificarCancha.valid){

  this.cancha.numero = this.formularioModificarCancha.get('numero')?.value;
  this.cancha.descripcion = this.formularioModificarCancha.get('descripcion')?.value;
 
  let numero :any;
  numero = this.cancha.numero;
 
 this.buscarIdCancha(numero);


setTimeout(() => {

if(this.id_cancha!=undefined){

this.display = !this.display;
Swal.fire({
  icon: 'error',
  title: 'Registro fallido',
  text: 'Ya existe una cancha registrada con los datos ingresados!',
  footer: 'Verifique los datos ingresados'
})

}
else{

this.buscarIdCancha(this.numeroAModificar);
 setTimeout(() => {
  

 this.cancha.id=this.id_cancha;

 console.log(this.cancha);
  this.cService.modificarCancha(this.cancha).subscribe(res =>{
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cancha actualizada con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarCanchas();
    this.display = !this.display;
    this.numeroAModificar="";
  
    this.id_cancha=undefined;
   
  });
}, 500);

}
}, 500);
}

}

cerrar(){
  this.display = !this.display;
}

}

