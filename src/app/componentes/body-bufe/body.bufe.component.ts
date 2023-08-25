import { NONE_TYPE } from '@angular/compiler';
import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { Bufe } from 'src/app/modelo/Bufe';
import { BufeServicio } from 'src/app/servicio/bufe.servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body-bufe',
  templateUrl: './body.bufe.component.html',
  styleUrls: ['./body.bufe.component.css']
})
export class BodyBufeComponent {

  bufes: Array<Bufe>;
  formularioBufe: FormGroup;
  formularioModificarBufe: FormGroup;
  bufe:Bufe;
  id_bufe:any;
  bufesPorNumero:Array<Bufe>;
  display:boolean;
  numeroAModificar:any;

  constructor(private fb:FormBuilder, private bService: BufeServicio){

    this.bufes= new Array<Bufe>();
    this.bufesPorNumero = new Array<Bufe>();
    this.display=false;
    this.bufe=new Bufe();
    this.numeroAModificar
  
  
    this.formularioBufe = fb.group({
  
      numero: new FormControl('', Validators.required)
      
    });
  
    this.formularioModificarBufe = fb.group({
  
      numero: new FormControl('', Validators.required)
      
    });
  }

  crearBufe(){
    if(this.formularioBufe.valid){
    
      let bufe:Bufe;
      bufe = new Bufe();
      bufe.numero = this.formularioBufe.get('numero')?.value;
      
      let numero:any;
      numero = bufe.numero;
   
       this.buscarIdBufe(numero);
    
    setTimeout(() => {
      
    if(this.id_bufe!=undefined){
     
      Swal.fire({
        icon: 'error',
        title: 'Registro fallido',
        text: 'Ya existe un bufé registrado con el número ingresado!',
        footer: 'Verifique los datos ingresados'
      })
    
    }
    else{
    
      this.bService.crearBufe(bufe).subscribe(res =>{
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bufé creado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.mostrarBufes();
        this.id_bufe=undefined;
        this.formularioBufe.reset(); 
        let tabla = document.getElementById('listadoBufes');
    
       if(tabla)  tabla.style.display = "block"; 
        
      });
      
    }
    
    }, 500);
      
    }
    
    }
  
    mostrarTabla(){
      this.mostrarBufes();
      let tabla = document.getElementById('listadoBufes')
      if(tabla)  tabla.style.display = "block"; 
    }
  
    mostrarBufes(){
  
      this.bService.mostrarBufes().subscribe(res =>{
        this.bufes = res;
      })
    }

    buscarIdBufe(numero:number){
      
        this.bService.mostrarBufesPorNumero(numero).subscribe(res =>{
          
    
          this.bufesPorNumero = res;
      
        });
        
        setTimeout(() => {
          
       
       if(this.bufesPorNumero.length>0)
       {
    
       this.id_bufe= this.bufesPorNumero[0].id;
        
       }
       else{
      
       this.id_bufe=undefined;
       }
      
       
      }, 200);
      
        }

eliminarBufe(bufe:Bufe){

 
  let numero:any = bufe.numero;

      this.buscarIdBufe(numero);
      setTimeout(() => {

      this.bService.eliminarBufe(this.id_bufe).subscribe(res =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bufe eliminado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
    
      this.mostrarBufes();
      this.bufesPorNumero=[];
      this.id_bufe=undefined;
        });
      
    }, 500);
 
}

activador(bufe: Bufe){

this.formularioModificarBufe.get('numero')?.setValue(bufe.numero);

this.numeroAModificar = bufe.numero;
this.display= !this.display;

}

modificarBufe(){

if(this.formularioModificarBufe.valid){

  this.bufe.numero = this.formularioModificarBufe.get('numero')?.value;
 
  let numero :any;
  numero = this.bufe.numero;
 
 this.buscarIdBufe(numero);

setTimeout(() => {

if(this.id_bufe!=undefined){

this.display = !this.display;
Swal.fire({
  icon: 'error',
  title: 'Registro fallido',
  text: 'Ya existe un bufe registrado con el numero ingresado!',
  footer: 'Verifique los datos ingresados'
})

}
else{

this.buscarIdBufe(this.numeroAModificar);
 setTimeout(() => {

 this.bufe.id=this.id_bufe;

  this.bService.modificarBufe(this.bufe).subscribe(res =>{
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bufe actualizado con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarBufes();
    this.display = !this.display;
    this.numeroAModificar="";
  
    this.id_bufe=undefined;
   
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
