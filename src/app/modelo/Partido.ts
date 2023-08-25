import { Categoria } from "./Categoria";

export class Partido {
    id?:number;
    descripcion!: string;
    categoria!:Categoria;
    cancha!:string;
    fecha!:string;
    ingresoEntradas?:number;
    gastoSeguridad?:number;
    gastoMedicos?:number;
    gastoArbitros?:number;
    gastoExtra?:number;
    observaciones?:string;
}