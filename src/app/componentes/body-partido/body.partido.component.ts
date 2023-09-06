import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/modelo/Categoria';
import { Partido } from 'src/app/modelo/Partido';
import { Transaccion } from 'src/app/modelo/Transaccion';
import { CategoriaServicio } from 'src/app/servicio/categoria.servicio';
import { CuentaServicio } from 'src/app/servicio/cuenta.servicio';
import { PartidoServicio } from 'src/app/servicio/partido.servicio';
import { ReporteServicio } from 'src/app/servicio/reporte.servicio';
import { TransaccionServicio } from 'src/app/servicio/transaccion.servicio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-body-partido',
  templateUrl: './body.partido.component.html',
  styleUrls: ['./body.partido.component.css']
})
export class BodyPartidoComponent {

  formularioPartido: FormGroup;
  formularioModificarPartido: FormGroup;
  display:boolean;
  categoriasPorParametros:Array<Categoria>;
  id_categoria:any;
  partidos: Array<Partido>;
  nombreCategoria:String="default";
  nombreCategoriaModificar:any;
  cancha:String="default";
  canchaModificar:any;
  tipo:String="default";
  tipoModificar:any
  deporte:String="default";
  deporteModificar:any;
  categorias: Array<Categoria>;
  id_partido:any;
  descripcionAModificar:any;
  tipoAModificar:any
  deporteAModificar:any
  nombreCategoriaAModificar:any
  fechaAModificar:any
  canchaAModificar:any
  ingresoEntradadasAModificar:any;
  gastoSeguridadAModificar:any;
  gastoArbitrosAModificar:any;
  gastoMedicosAModificar:any;
  gastoExtraAModificar:any;
  observacionesAModificar:any;
  filterPropertyDescripcion="";
  filterPropertyCancha="";
  filterPropertyCategoria:any;
  filterPropertyTipoCategoria="";
  filterPropertyDeporte="";
  filterPropertyFecha="";
  searchDescripcion:string="";
  searchCancha:string="";
  searchCategoria:string="";
  searchTipoCategoria:string="";
  searchDeporte:string="";
  searchFecha:string="";
  generarPdf:boolean=false;
  idTransaccion:any;
  transacciones:Array<Transaccion>;


  constructor(private fb:FormBuilder, private pService: PartidoServicio, private cService:CuentaServicio, private caService: CategoriaServicio, private tService:TransaccionServicio, private rService:ReporteServicio, private router:Router){
  
    this.formularioPartido = fb.group({

    descripcion: new FormControl('', Validators.required),
    cancha: new FormControl('', Validators.required), 
    nombreCategoria: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required), 
    deporte: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required)
  });


  this.display=false;
  this.categoriasPorParametros=[];
  this.partidos= new Array<Partido>();
  this.categorias= new Array<Categoria>();
  this.transacciones = new Array<Transaccion>();

  this.mostrarCategorias();

  this.formularioModificarPartido = fb.group({

    descripcion: new FormControl('', Validators.required),
    canchaModificar: new FormControl('', Validators.required), 
    nombreCategoriaModificar: new FormControl('', Validators.required),
    tipoModificar: new FormControl('', Validators.required), 
    deporteModificar: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required)
    
  });

  }

  crearPartido(){
    if(this.formularioPartido.valid){
    
      let partido:Partido;
      partido = new Partido();
      let nombreCategoria:any;
      let tipo:any;
      let deporte:any;
      let categoria:Categoria;

      categoria = new Categoria();
  
      partido.descripcion = this.formularioPartido.get('descripcion')?.value;
      partido.cancha = this.formularioPartido.get('cancha')?.value;
      nombreCategoria= this.formularioPartido.get('nombreCategoria')?.value;
      partido.fecha = this.formularioPartido.get('fecha')?.value;
      tipo = this.formularioPartido.get('tipo')?.value;
      deporte = this.formularioPartido.get('deporte')?.value;

      this.buscarIdCategoria(nombreCategoria, tipo, deporte);
    
    setTimeout(() => {
      
      console.log("err  "+this.id_categoria);
    if(this.id_categoria==undefined){
        
      Swal.fire({
        icon: 'error',
        title: 'Registro fallido',
        text: 'No existe una categoria registrada con los datos ingresados!',
        footer: 'Verifique los datos ingresados'
      })
    
    }
    else{

      categoria.id=this.id_categoria;
      partido.categoria = categoria;

      this.pService.crearPartido(partido).subscribe(res =>{
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cancha creada con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.mostrarPartidos();
        this.id_categoria=undefined;
        this.formularioPartido.reset(); 
        let tabla = document.getElementById('listadoPartidos');
    
       if(tabla)  tabla.style.display = "block"; 
        
      });
      
    }
    
    }, 500);
      
    }
    
    }

    buscarIdCategoria(nombre:string, tipo:string, deporte:string){

      //let id_categoria:any;
      
        this.caService.mostrarCategoriasPorParametros(nombre, tipo, deporte).subscribe(res =>{
          
          this.categoriasPorParametros = res;
          
        });
        
        setTimeout(() => {
          
       
       if(this.categoriasPorParametros.length>0)
       {
        
        
       this.id_categoria= this.categoriasPorParametros[0].id;
       console.log(this.id_categoria);
       }
       else{
      
       this.id_categoria=undefined;
       }
      
       
      }, 200);
      
        }

        mostrarTabla(){
          
         
          
          this.mostrarPartidos();
          let tabla = document.getElementById('listadoPartidos')
          if(tabla)  tabla.style.display = "block";
          this.generarPdf=true;
       
        }

        mostrarPartidos(){

          setTimeout(() => {

          this.pService.mostrarPartidos().subscribe(res =>{
            this.partidos = res;
          })
        }, 300);
        }

        eliminarPartido(partido:Partido){

          let id:any;
         // let descripcion:any = partido.descripcion;
          //let id_categoria:any = partido.categoria?.id;
          //let cancha:any = partido.cancha;
          //let fecha:any = partido.fecha;
          let id_transaccion:any;
          let totalEgresos:number;
          let ingresoEntradas:any;
        
          id = partido.id;
          totalEgresos=partido.gastoArbitros+partido.gastoMedicos+partido.gastoSeguridad+partido.gastoExtra;
          ingresoEntradas=partido.ingresoEntradas;

          this.idTransaccionPorPartido(partido);
          
          setTimeout(() => {
  
          this.transacciones.forEach(element => {
          
          id_transaccion = element.id;
          this.tService.eliminarTransaccion(id_transaccion).subscribe(res =>{
          });
              });
            
            }, 300);
          //    this.buscarIdPartido(descripcion, id_categoria, cancha, fecha);
              setTimeout(() => {
   
              this.pService.eliminarPartido(id).subscribe(res =>{
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Partido eliminado con éxito!',
                  showConfirmButton: false,
                  timer: 1500
                })
             
              this.mostrarPartidos();

              this.cService.ingresoEfectivo(totalEgresos).subscribe(res =>{
              })
              setTimeout(() => {
              this.cService.egresoEfectivo(ingresoEntradas).subscribe(res =>{
              })
            }, 300);
            }, );
            //  this.id_partido=undefined;
         //       });
        }, 1000);
              
           
      
      }
      
      //Activa el dialogo, ! significa lo contrario a lo que tenia la variable
      activador(partido:Partido){
      
        this.formularioModificarPartido.get('descripcion')?.setValue(partido.descripcion);
        this.formularioModificarPartido.get('nombreCategoriaModificar')?.setValue(partido.categoria?.nombre);
        this.formularioModificarPartido.get('canchaModificar')?.setValue(partido.cancha);
        this.formularioModificarPartido.get('fecha')?.setValue(partido.fecha);
        this.formularioModificarPartido.get('tipoModificar')?.setValue(partido.categoria?.tipo);
        this.formularioModificarPartido.get('deporteModificar')?.setValue(partido.categoria?.deporte);
        
        this.descripcionAModificar=partido.descripcion;
        this.tipoAModificar=partido.categoria?.tipo;
        this.deporteAModificar=partido.categoria?.deporte;
        this.nombreCategoriaAModificar=partido.categoria?.nombre;
        this.fechaAModificar = partido.fecha;
        this.canchaAModificar = partido.cancha;
        this.ingresoEntradadasAModificar=partido.ingresoEntradas;
        this.gastoArbitrosAModificar=partido.gastoArbitros;
        this.gastoSeguridadAModificar=partido.gastoSeguridad;
        this.gastoMedicosAModificar=partido.gastoMedicos;
        this.gastoExtraAModificar=partido.gastoExtra;
        this.observacionesAModificar=partido.observaciones;
      
        this.display= !this.display;
        
      }
      
      modificarPartido(){
      
        if(this.formularioModificarPartido.valid){
      
         let partido:Partido;
         let fecha:any;
         partido = new Partido();
         let categoria:Categoria;
         categoria = new Categoria();

          partido.descripcion = this.formularioModificarPartido.get('descripcion')?.value;
          partido.cancha = this.formularioModificarPartido.get('canchaModificar')?.value;
          fecha = this.formularioModificarPartido.get('fecha')?.value;
          partido.fecha = fecha;
          partido.ingresoEntradas=this.ingresoEntradadasAModificar;
          partido.gastoMedicos=this.gastoMedicosAModificar;
          partido.gastoSeguridad=this.gastoSeguridadAModificar;
          partido.gastoArbitros=this.gastoArbitrosAModificar;
          partido.gastoExtra=this.gastoSeguridadAModificar;
          partido.observaciones=this.observacionesAModificar;

          let nombre:any = this.formularioModificarPartido.get('nombreCategoriaModificar')?.value;
          let tipo:any = this.formularioModificarPartido.get('tipoModificar')?.value;
          let deporte:any = this.formularioModificarPartido.get('deporteModificar')?.value;
         
         
         this.buscarIdCategoria(nombre,tipo,deporte);
      
      setTimeout(() => {
        
      if(this.id_categoria==undefined){
        
        this.display = !this.display;
        Swal.fire({
          icon: 'error',
          title: 'Actualización fallida',
          text: 'No existe una categoria registrada con los datos ingresados!',
          footer: 'Verifique los datos ingresados'
        })
      
      }
      else{
  
       
        categoria.id= this.id_categoria;
        partido.categoria = categoria;
        
        this.buscarIdCategoria(this.nombreCategoriaAModificar,this.tipoAModificar,this.deporteAModificar);
         setTimeout(() => {
          this.buscarIdPartido(this.descripcionAModificar, this.id_categoria, this.canchaAModificar, this.fechaAModificar)
         
         setTimeout(() => {
        
        partido.id=this.id_partido;
         
          this.pService.modificarPartido(partido).subscribe(res =>{
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Partido actualizado con éxito!',
              showConfirmButton: false,
              timer: 1500
            })
            this.mostrarPartidos();
            this.display = !this.display;
            this.descripcionAModificar="";
            this.nombreCategoriaAModificar="";
            this.tipoAModificar="";
            this.deporteAModificar="";
            this.fechaAModificar="";
            this.canchaAModificar="";
            this.id_categoria=undefined;
            this.id_partido=undefined;
          
          });
        }, 500);

        }, 500);
        
      }
      }, 500);
        }
        
      }

      mostrarCategorias(){

        this.caService.mostrarCategorias().subscribe(res =>{
          this.categorias = res;
        })
      }

      buscarIdPartido(descripcion:String, idCategoria:number, cancha:String, fecha:String){

        this.pService.mostrarPartidoPorParametros(descripcion, idCategoria, cancha, fecha).subscribe(res =>{
          this.id_partido = res.id;
        })
      }

      onSearchPartidoDescripcion(searchDescripcion:string){
        this.searchDescripcion =searchDescripcion;
         
      }
      
      onSearchPartidoCancha(searchCancha:string){
        this.searchCancha =searchCancha;
         
      }

      onSearchPartidoCategoria(searchCategoria:string){
        this.searchCategoria =searchCategoria
         
      }
      
      onSearchPartidoTipoCategoria(searchTipoCategoria:string){
        this.searchTipoCategoria =searchTipoCategoria;
         
      }
      onSearchPartidoDeporte(searchDeporte:string){
        this.searchDeporte =searchDeporte;
         
      }

      onSearchPartidoFecha(searchFecha:string){
        this.searchFecha = searchFecha;
      }
  
      cerrar(){
        this.display = !this.display;
      }

      imprimir(){

        const encabezado = ["Descripción", "Cancha", "Categoria", "Tipo Categoría", "Deporte", "Fecha"];
      
        let partidosFiltrado: Array<Partido>;
        partidosFiltrado = new Array<Partido>();
       
        partidosFiltrado= this.filtroPartidos(this.partidos, this.searchDescripcion, this.searchCancha, this.searchCategoria, this.searchTipoCategoria, this.searchDeporte, this.searchFecha);
      
       const cuerpo =  partidosFiltrado.map(
      
        (obj : Partido) => {
          const datos = [
            obj.descripcion,
            obj.cancha,
            obj.categoria.nombre,
            obj.categoria.tipo,
            obj.categoria.deporte,
            obj.fecha
          ]
          return datos;
        }
       )
      
      this.rService.imprimir(encabezado, cuerpo, "Listado de partidos", true);
      
      }
      
      filtroPartidos(values: Partido[], searchDescripcion: string, searchCancha:string,searchCategoria: string, searchTipoCategoria:string, searchDeporte:string, searchFecha:string): any[] {

        let filterValues=values;
    
      if(values.length>0){
      
        if(searchDescripcion!=""){ 
        values.forEach(value =>
          {
        let descripcion:any=value.descripcion;
        value.descripcion= descripcion.toLowerCase();
      
    }
        );
        searchDescripcion=searchDescripcion.toLowerCase();
        filterValues= filterValues.filter(value => value.descripcion?.includes(searchDescripcion));
      }
    
      
      if(searchCancha!=""){
        
        values.forEach(value =>
          {
        let cancha:any=value.cancha;
        value.cancha= cancha.toLowerCase();
    }
        );
      searchCancha=searchCancha.toLowerCase();
      filterValues=filterValues.filter(value => value.cancha?.includes(searchCancha));
    
    }
       
        if(searchCategoria!=""){
         
        filterValues=filterValues.filter(value => value.categoria.nombre.toString().includes(searchCategoria));
      
      }
    
      if(searchTipoCategoria!=""){
    
        values.forEach(value =>
          {
        let tipoCategoria:any=value.categoria.tipo;
        value.categoria.tipo= tipoCategoria.toLowerCase();
    }
        );
      searchTipoCategoria=searchTipoCategoria.toLowerCase();
      filterValues=filterValues.filter(value => value.categoria?.tipo.includes(searchTipoCategoria));
    
    }
    
    if(searchDeporte!=""){ 
      
      values.forEach(value =>
        {
      let deporte:any=value.categoria.deporte;
      value.categoria.deporte = deporte.toLowerCase();
    
    }
      );
      searchDeporte=searchDeporte.toLowerCase();
      filterValues= filterValues.filter(value => value.categoria.deporte?.includes(searchDeporte));
    }
     
    if(searchFecha!=""){ 
    
      values.forEach(value =>
        {
      let fecha:any=value.fecha;
      value.fecha = fecha.toLowerCase();
    
    }
      );
      searchFecha=searchFecha.toLowerCase();
      filterValues= filterValues.filter(value => value.fecha?.includes(searchFecha));
    }
    
    }
    
    filterValues.forEach(element => {
      element.descripcion = this.mayusculaPrimerLetra(element.descripcion);
      element.cancha = this.mayusculaPrimerLetra(element.cancha);
      //element.categoria.nombre = this.mayusculaPrimerLetra(element.categoria.nombre);
      element.categoria.tipo = this.mayusculaPrimerLetra(element.categoria.tipo);
      element.categoria.deporte = this.mayusculaPrimerLetra(element.categoria.deporte);
      element.fecha = this.mayusculaPrimerLetra(element.fecha);
    });
    
    return filterValues;
    
    }
    
    mayusculaPrimerLetra(string:String) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    volver(){

      if(this.router.url=="/homeAdministrador/partido/nuevo"){ 
        this.router.navigate(['/homeAdministrador']);
        }
        else{
          this.router.navigate(['/homeInvitado']);
        }
    }

    idTransaccionPorPartido(partido:Partido){

      this.tService.mostrarTransaccionesPorPartido(partido).subscribe(res=>{
                
       this.transacciones = res; 
       this.idTransaccion=res[0].id;
      });
    }
    
}


