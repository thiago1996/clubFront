import { style } from '@angular/animations';
import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/Usuario';
import { UsuarioServicio } from 'src/app/servicio/usuario.servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

contrasenia:String="";

  formularioInicioSesion: FormGroup;

  constructor(private fb:FormBuilder, private uServicio: UsuarioServicio, private router:Router){

 

    this.formularioInicioSesion = fb.group({
  
      nombre: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required)
    });
  }

  ingresar(){ 

  let nombre="";
  let contrasenia="";
  let usuarios:Array<Usuario>;
  let control=false;
  usuarios= new Array<Usuario>();
  
  nombre=this.formularioInicioSesion.get('nombre')?.value;
  contrasenia=this.formularioInicioSesion.get('contrasenia')?.value;

  this.uServicio.buscarUsuario(nombre,contrasenia).subscribe(res =>{
          
    control = res;

  });



  setTimeout(() => {
    

  if(control==true){

    this.uServicio.mostrarUsuariosPorNombre(nombre).subscribe(res =>{
      usuarios = res;
    });
  
 
    setTimeout(() => {
      console.log(usuarios[0]);
  if(usuarios[0].tipoUsuario=="Administrador"){

   this.router.navigate(['/homeAdministrador']);
  }
  if(usuarios[0].tipoUsuario=="Invitado"){

    this.router.navigate(['/homeInvitado']);
   }
}, 500);
}
else{
  Swal.fire({
    icon: 'error',
    title: 'Intento fallido',
    text: 'Usuario y/o contraseña incorrectos!',
    footer: 'Verifique los datos ingresados'
  })
}

}, 500);


}

}
