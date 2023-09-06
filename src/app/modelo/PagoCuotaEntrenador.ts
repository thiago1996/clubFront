import { Cuota } from "./Cuota";

export class PagoCuotaEntrenador {

    id!:Array<any>;
    documento?:String;
    nombre!:String;
    apellido!:String;
    cuota?:Cuota;
    anioCuota?:String;
    mesCuota?:String;
    importe?:number;
    fechaPago?:String;
    medioPago!:String;
}