import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/Usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioServicio {

  rutaglobal = 'http://localhost:8080/usuario/';
  constructor(private http:HttpClient) {
}

//Crear usuario
crearUsuario(usuario: Usuario){

  return this.http.post<Usuario>(this.rutaglobal + 'nuevo', usuario, {
    observe: 'response'
  });
}

 //Obtener usuarios
mostrarUsuarios(){
return this.http.get<Usuario[]>(this.rutaglobal + 'mostrar');
}

//Obtener usuarios por nombre
mostrarUsuariosPorNombre(nombre:String){
  return this.http.get<Usuario[]>(this.rutaglobal + 'mostrar/'+nombre);
}

//buscar si existe usuario
buscarUsuario(nombre:String, contrasenia:String){
  return this.http.get<boolean>(this.rutaglobal + 'buscar/'+nombre+'/'+contrasenia);
}

//Eliminar usuario
eliminarUsuario(id: number){

return this.http.post<void>(this.rutaglobal + id, {
  observe:'response'
});
}

  //Actualizar usuario
modificarUsuario(usuario: Usuario){

return this.http.post<Usuario>(this.rutaglobal + 'modificar', usuario, {
  observe: 'response'
});
}

}
