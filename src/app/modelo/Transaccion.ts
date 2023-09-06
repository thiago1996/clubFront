import { Socio } from "./Socio";
import { Jugador } from "./Jugador";
import { Entrenador } from "./Entrenador";
import { Cuota } from "./Cuota";
import { PagoServicio } from "./PagoServicio";
import { AlquilerCancha } from "./AlquilerCancha";
import { AlquilerBufe } from "./AlquilerBufe";
import { Partido } from "./Partido";

export class Transaccion {
    id?:number;
    descripcion!:any;
    fecha!:String;
    tipo!:string;
    importe!:number;
    medioPago!:String;
    socio?:Socio;
    jugador?:Jugador;
    entrenador?:Entrenador;
    cuota?:Cuota;
    pagoServicio?:PagoServicio;
    alquilerCancha?:AlquilerCancha;
    alquilerBufe?:AlquilerBufe;
    partido?:Partido;
    documentoJugador?:any;
    nombreJugador?:any;
    apellidoJugador?:any;
    anioCuota?:any;
    mesCuota?:any;
    documentoEntrenador?:any;
    nombreEntrenador?:any;
    apellidoEntrenador?:any;
    documentoSocio?:any;
    nombreSocio?:any;
    apellidoSocio?:any;
    cancha?:any;
    tipoCategoria?:any;
    deporte?:any;
    entradas?:any;
    nombreCategoria?:any;
    seguridad?:any;
    medicos?:any;
    arbitros?:any;
    extra?:any;
    gastoTotal?:any;
    observaciones?:any;
    numeroCancha?:any;
    horaInicio?:any;
    horaFin?:any;
    numeroBufe?:any;
    categoria?:any;
   
    
}