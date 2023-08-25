import { Categoria } from "./Categoria"

export class Entrenador {
    documento!: number
    nombre!: string
    apellido!: string
    domicilio?: string
    fechaNacimiento?: Date
    fechaAlta?: Date
    telefono?: number
    categorias!:Categoria[];
    categoriasAsignadas!:Array<number>;
    // el ? es porque es posible que no llegue nada, el ! seria para que llegue si o si
}