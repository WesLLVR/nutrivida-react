export interface DatosPago {
    nombre: string;
    run: string;
    correo: string;
    telefono: string;
    tipoTarjeta: string;
    numeroTarjeta: string;
    cuotas: number;
}

export interface DetalleBoleta {
    codigo: string;
    nombre: string;
    cantidad: number;
    precio: number;
    subtotal: number;
}

export interface Boleta {
    id: number;
    numero: number;
    fecha: string;
    cliente: string;
    run: string;
    correo: string;
    telefono: string;
    tipoTarjeta: string;
    tarjeta: string;
    cuotas: number;
    detalle: DetalleBoleta[];
    neto: number;
    iva: number;
    total: number;
    estado: string;
}
