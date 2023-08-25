import { Jugador } from "./Jugador";

export class Categoria {
    id?:number;
    nombre!: string;
    tipo!: string;
    deporte!:string;
   
    
  
    // el ? es porque es posible que no llegue nada, el ! seria para que llegue si o si
}