import { buscarServicio } from "./servicios";
import { calcularTotal } from "./reserva";
import type { ItemReserva } from "./reserva";

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
    nombre: string;
    cantidad: number;
    precio: number;
    subtotal: number;
}

export interface Boleta {
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
}

let siguienteNumero = 1001;

export function ocultarTarjeta(numero: string): string {
    const digitos = numero.replace(/ /g, "");
    return "**** **** **** " + digitos.substring(digitos.length - 4);
}

export function crearBoleta(items: ItemReserva[], datos: DatosPago): Boleta {
    const detalle: DetalleBoleta[] = [];

    for (let i = 0; i < items.length; i++) {
        const servicio = buscarServicio(items[i].codigo);

        if (servicio !== undefined) {
            detalle.push({
                nombre: servicio.nombre,
                cantidad: items[i].cantidad,
                precio: servicio.precio,
                subtotal: servicio.precio * items[i].cantidad
            });
        }
    }

    const total = calcularTotal(items);
    const neto = Math.round(total / 1.19);
    const iva = total - neto;

    const boleta: Boleta = {
        numero: siguienteNumero,
        fecha: new Date().toLocaleDateString("es-CL"),
        cliente: datos.nombre,
        run: datos.run,
        correo: datos.correo,
        telefono: datos.telefono,
        tipoTarjeta: datos.tipoTarjeta,
        tarjeta: ocultarTarjeta(datos.numeroTarjeta),
        cuotas: datos.cuotas,
        detalle: detalle,
        neto: neto,
        iva: iva,
        total: total
    };

    siguienteNumero = siguienteNumero + 1;

    return boleta;
}
