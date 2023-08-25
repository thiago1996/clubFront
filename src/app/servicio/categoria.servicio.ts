import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../modelo/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServicio {

  rutaglobal = 'http://localhost:8080/categoria/';
  constructor(private http:HttpClient) {

   }

   //Crear categoria
   crearCategoria(categoria: Categoria){

    return this.http.post<Categoria>(this.rutaglobal + 'nuevo', categoria, {
      observe: 'response'
    });
  }

   //Obtener categorias
mostrarCategorias(){
  return this.http.get<Categoria[]>(this.rutaglobal + 'mostrar');
}

//Obtener categorias por todos los parametros
mostrarCategoriasPorParametros(nombre:String, tipo:String, deporte:String){
  return this.http.get<Categoria[]>(this.rutaglobal + 'mostrar/'+nombre+'/'+tipo+'/'+deporte);
}

   //Actualizar categoria
modificarCategoria(categoria: Categoria){

  return this.http.post<Categoria>(this.rutaglobal + 'modificar', categoria, {
    observe: 'response'
  });
}

existeCategoria(id_categoria:number){
  return this.http.get<Boolean>(this.rutaglobal + 'buscarPorId/'+id_categoria);
}

   //Eliminar categoria
   eliminarCategoria(id: number){

    return this.http.post<Boolean>(this.rutaglobal + id, {
      observe:'response'
    });
   }
}