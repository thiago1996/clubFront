import { Cuota } from "./Cuota";

export class JugadorCuota {
    id!:Array<any>;
    documento?:String;
    nombre!:String;
    apellido!:String;
    cuota?:Cuota;
    anioCuota?:String;
    mesCuota?:String;
    precio?:number;
    fechaPago?:String;
    medioPago!:String;
}