import { Cancha } from "./Cancha";

export class AlquilerCancha{

    id?:number;
    cancha?:Cancha;
    numeroCancha?:number;
    importe?:number;
    fecha!:String;
    horaInicio!:String;
    horaFin!:String;
    medioPago?:String;
    observaciones?:String;
}