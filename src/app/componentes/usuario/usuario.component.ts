import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/Usuario';
import { UsuarioServicio } from 'src/app/servicio/usuario.servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  usuarios: Array<Usuario>;
  formularioUsuario: FormGroup;
  formularioModificarUsuario: FormGroup;
  usuario:Usuario;
  id_usuario:any;
  display:boolean;
  nombreAModificar:any;
  usuariosPorNombre:Array<Usuario>;
  tipoUsuario:any;
  tipoUsuarioModificar:any;

  constructor(private fb:FormBuilder, private uService: UsuarioServicio, private router:Router){

    this.usuarios= new Array<Usuario>();
    this.usuariosPorNombre = new Array<Usuario>();
    this.display=false;
    this.usuario=new Usuario();
  
  
    this.formularioUsuario = fb.group({
  
      nombre: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required),
      tipoUsuario: new FormControl('', Validators.required)
      
    });
  
    this.formularioModificarUsuario = fb.group({
  
      nombre: new FormControl('', Validators.required),
      contrasenia: new FormControl('', Validators.required),
      tipoUsuario: new FormControl('', Validators.required)
      
    });
  }

  crearUsuario(){
    if(this.formularioUsuario.valid){
    
      let usuario:Usuario;
      usuario = new Usuario();
      usuario.nombre = this.formularioUsuario.get('nombre')?.value;
      usuario.contrasenia = this.formularioUsuario.get('contrasenia')?.value;
      usuario.tipoUsuario = this.formularioUsuario.get('tipoUsuario')?.value;
      
      let nombre:any;
      nombre = usuario.nombre;
   
       this.buscarIdUsuario(nombre);
    
    setTimeout(() => {
      
    if(this.id_usuario!=undefined){
     
      Swal.fire({
        icon: 'error',
        title: 'Registro fallido',
        text: 'Ya existe un usuario registrado con el nombre de usuario ingresado!',
        footer: 'Verifique los datos ingresados'
      })
    
    }
    else{
    
      console.log(usuario);
      this.uService.crearUsuario(usuario).subscribe(res =>{
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario creado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.mostrarUsuarios();
        this.id_usuario=undefined;
        this.formularioUsuario.reset(); 
        let tabla = document.getElementById('listadoUsuarios');
    
       if(tabla)  tabla.style.display = "block"; 
        
      });
      
    }
    
    }, 500);
      
    }
    
    }
  
    mostrarTabla(){
      this.mostrarUsuarios();
      let tabla = document.getElementById('listadoUsuarios')
      if(tabla)  tabla.style.display = "block"; 
    }
  
    mostrarUsuarios(){
  
      this.uService.mostrarUsuarios().subscribe(res =>{
        this.usuarios = res;
      })
    }

    buscarIdUsuario(nombre:string){
      
        this.uService.mostrarUsuariosPorNombre(nombre).subscribe(res =>{
          
    
          this.usuariosPorNombre = res;
      
        });
        
        setTimeout(() => {
          
       
       if(this.usuariosPorNombre.length>0)
       {
    
       this.id_usuario= this.usuariosPorNombre[0].id;
        
       }
       else{
      
       this.id_usuario=undefined;
       }
      
       
      }, 200);
      
        }

eliminarUsuario(usuario:Usuario){

 
  let nombre:any = usuario.nombre;

      this.buscarIdUsuario(nombre);
      setTimeout(() => {

      this.uService.eliminarUsuario(this.id_usuario).subscribe(res =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario eliminado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
    
      this.mostrarUsuarios();
      this.usuariosPorNombre=[];
      this.id_usuario=undefined;
        });
      
    }, 500);
 
}

activador(usuario: Usuario){

this.formularioModificarUsuario.get('nombre')?.setValue(usuario.nombre);
this.formularioModificarUsuario.get('contrasenia')?.setValue(usuario.contrasenia);
this.formularioModificarUsuario.get('tipoUsuario')?.setValue(usuario.tipoUsuario);

this.nombreAModificar = usuario.nombre;
this.display= !this.display;

}

modificarUsuario(){

if(this.formularioModificarUsuario.valid){

  this.usuario.nombre = this.formularioModificarUsuario.get('nombre')?.value;
  this.usuario.contrasenia = this.formularioModificarUsuario.get('contrasenia')?.value;
  this.usuario.tipoUsuario = this.formularioModificarUsuario.get('tipoUsuario')?.value;
 
  let nombre:any;
  nombre = this.usuario.nombre;
 
 this.buscarIdUsuario(nombre);

setTimeout(() => {

if(this.id_usuario!=undefined && this.usuario.nombre!=this.nombreAModificar){

this.display = !this.display;
Swal.fire({
  icon: 'error',
  title: 'Registro fallido',
  text: 'Ya existe un usuario registrado con el nombre de usuario ingresado!',
  footer: 'Verifique los datos ingresados'
})

}
else{

this.buscarIdUsuario(this.nombreAModificar);
 setTimeout(() => {

 this.usuario.id=this.id_usuario;

  this.uService.modificarUsuario(this.usuario).subscribe(res =>{
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario actualizado con éxito!',
      showConfirmButton: false,
      timer: 1500
    })
    this.mostrarUsuarios();
    this.display = !this.display;
    this.nombreAModificar="";
  
    this.id_usuario=undefined;
   
  });
}, 500);

}
}, 500);
}

}

cerrar(){
  this.display = !this.display;
}

volver(){

  this.router.navigate(['/homeAdministrador']);
}

}
