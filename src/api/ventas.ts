import { peticion } from "./cliente";
import type { Boleta, DatosPago } from "../datos/boletas";

export function comprar(datos: DatosPago, items: { codigo: string; cantidad: number }[]): Promise<Boleta> {
    return peticion<Boleta>("/ventas", "POST", { ...datos, items });
}

export function listarMisCompras(): Promise<Boleta[]> {
    return peticion<Boleta[]>("/ventas/mis-compras");
}

export function listarVentas(): Promise<Boleta[]> {
    return peticion<Boleta[]>("/ventas");
}

export function anularVenta(id: number): Promise<Boleta> {
    return peticion<Boleta>("/ventas/" + id + "/anular", "PUT");
}
