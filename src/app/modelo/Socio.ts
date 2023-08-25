export class Socio {
    documento!: number
    nombre?: string
    apellido?: string
    domicilio?: string
    fechaNacimiento?: Date
    fechaAsociacion?: Date
    telefono?: number
    [key: string]: any;
    // el ? es porque es posible que no llegue nada, el ! seria para que llegue si o si
}