import type { Sesion } from "../datos/sesion";

export function crearToken(minutos: number): string {
    const datos = { sub: "prueba@correo.cl", rol: "PACIENTE", exp: Math.floor(Date.now() / 1000) + minutos * 60 };
    return "e30." + btoa(JSON.stringify(datos)) + ".firma";
}

export function crearSesion(rol: string): Sesion {
    return { token: crearToken(60), id: 2, nombre: "Matías", apellidos: "Vergara", correo: "usuario@correo.cl", rol: rol };
}
