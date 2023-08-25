import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { onErrorResumeNextWith } from 'rxjs';
import { Cuenta } from 'src/app/modelo/Cuenta';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body-cuenta',
  templateUrl: './body.cuenta.component.html',
  styleUrls: ['./body.cuenta.component.css']
})
export class BodyCuentaComponent {

  formularioCuenta: FormGroup;
  formularioModificarCuenta: FormGroup;
  cuentas: Array<Cuenta>;
  display:boolean;

  constructor(private fb:FormBuilder, private cService: CuentaServicio){
  
this.mostrarTabla();

    this.formularioCuenta = fb.group({

    ingresoEfectivo: new FormControl('',), 
    egresoEfectivo: new FormControl('',),
    ingresoDebito: new FormControl('',), 
    egresoDebito: new FormControl('',)
  });

  this.cuentas= new Array<Cuenta>();
  this.display=false;

  this.formularioModificarCuenta = fb.group({

    ingresoEfectivo: new FormControl('',), 
    egresoEfectivo: new FormControl('',),
    ingresoDebito: new FormControl('',), 
    egresoDebito: new FormControl('',)

    
  });

  }

activador(cuenta:Cuenta){
this.display = !this.display;
}

mostrarTabla(){
  this.mostrarCuentas();
  let tabla = document.getElementById('listadoCuentas')
  if(tabla)  tabla.style.display = "block"; 
}

mostrarCuentas(){

  this.cService.mostrarCuentas().subscribe(res =>{
    this.cuentas = res;
  })
}

  actualizarMovimiento(){

    let ingresoEfectivo = this.formularioModificarCuenta.get('ingresoEfectivo')?.value;
    let egresoEfectivo = this.formularioModificarCuenta.get('egresoEfectivo')?.value;
    let ingresoDebito = this.formularioModificarCuenta.get('ingresoDebito')?.value;
    let egresoDebito = this.formularioModificarCuenta.get('egresoDebito')?.value;
    let control = false;
    let error= false;
    
    if(ingresoEfectivo!=""){ 
    if(isNaN(+ingresoEfectivo)|| ingresoEfectivo<0){
    
      console.log("hola")
      error = true;
    }
    }
    if(egresoEfectivo!=""){ 
      if(isNaN(+egresoEfectivo)|| egresoEfectivo<0){
        console.log("que")
        error = true;
      }
      }
        if(ingresoDebito!=""){ 
          if(isNaN(+ingresoDebito)|| ingresoDebito<0){
            console.log("tal")
            error = true;
          }
          }
          if(egresoDebito!=""){ 
            if(isNaN(+egresoDebito)|| egresoDebito<0){
              console.log("como estas")
              error = true;
            }
            }
      
    
    
    if(ingresoEfectivo!="" && error ==false){
    
      control = true;
        console.log("sadasds");
        console.log(+ingresoEfectivo);
      this.cService.ingresoEfectivo(+ingresoEfectivo).subscribe(res => {
        });
    
    }
    setTimeout(() => {
    
    if(egresoEfectivo!="" && error ==false){
      
        control = true;
    
        this.cService.egresoEfectivo(+egresoEfectivo).subscribe(res => {
        });
     
      }
    }, 200);
    setTimeout(() => {
    
    if(ingresoDebito!="" && error ==false){
      
        control = true;
       
        this.cService.ingresoDebito(+ingresoDebito).subscribe(res => {
      
    });
    
    }
    }, 400);
    
    setTimeout(() => {
    if(egresoDebito!="" && error ==false) {
      
        control = true;
     
        this.cService.egresoDebito(+egresoDebito).subscribe(res => {
        });
     
    }
    }, 600);
    
    setTimeout(() => {
    if(error == true){
      this.display = !this.display;
      Swal.fire({
        icon: 'error',
        title: 'Actualización fallida',
        text: 'El valor ingresado debe ser númerico mayor a 0!',
        footer: 'Verifique los datos ingresados'
      })
      this.formularioModificarCuenta.reset();
    }
    else{
    if(control == false){
      this.display = !this.display;
      Swal.fire({
        icon: 'error',
        title: 'Actualización fallida',
        text: 'No se ha ingresado ningún valor en el formulario!',
        footer: 'Verifique los datos ingresados'
      })
      this.formularioModificarCuenta.reset();
    
    }
    else{
      this.display = !this.display;
      Swal.fire({
        position:'center',
        icon: 'success',
        title: 'Saldo actualizado con éxito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.mostrarCuentas();
      this.formularioModificarCuenta.reset();
    }
    }
    }, 1500);

  }

  cerrar(){
    this.display = !this.display;
  }

} 
