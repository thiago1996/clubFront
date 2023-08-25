import { Categoria } from "./Categoria"

export class Jugador {
    documento!: string
    nombre?: string
    apellido?: string
    categoria?: Categoria
    domicilio?: string
    fechaNacimiento?: Date
    fechaAlta?: Date
    telefono?: number
    // el ? es porque es posible que no llegue nada, el ! seria para que llegue si o si
}