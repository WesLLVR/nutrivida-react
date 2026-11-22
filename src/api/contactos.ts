import { peticion } from "./cliente";

export interface Mensaje {
    id: number;
    nombre: string;
    correo: string;
    mensaje: string;
    fecha: string;
    leido: boolean;
}

export function enviarMensaje(nombre: string, correo: string, mensaje: string): Promise<Mensaje> {
    return peticion<Mensaje>("/contactos", "POST", { nombre, correo, mensaje });
}

export function listarMensajes(): Promise<Mensaje[]> {
    return peticion<Mensaje[]>("/contactos");
}

export function marcarLeido(id: number): Promise<Mensaje> {
    return peticion<Mensaje>("/contactos/" + id + "/leido", "PUT");
}

export function eliminarMensaje(id: number): Promise<null> {
    return peticion<null>("/contactos/" + id, "DELETE");
}
