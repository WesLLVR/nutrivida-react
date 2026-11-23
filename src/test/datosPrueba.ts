import type { Servicio } from "../datos/servicios";
import type { Sesion } from "../datos/sesion";

function servicio(id: number, codigo: string, nombre: string, tipo: string, precio: number, destacado: boolean): Servicio {
    return {
        id: id,
        codigo: codigo,
        nombre: nombre,
        tipo: { id: id, nombre: tipo },
        duracion: "30 min",
        modalidad: "Presencial",
        precio: precio,
        descripcion: "Descripción de " + nombre,
        imagen: "/img/servicio-consulta.png",
        destacado: destacado
    };
}

export const serviciosPrueba: Servicio[] = [
    servicio(1, "CN001", "Primera consulta nutricional", "Consulta", 35000, true),
    servicio(2, "CN002", "Control nutricional", "Consulta", 25000, false),
    servicio(3, "PL001", "Plan pérdida de peso (1 mes)", "Plan", 65000, true),
    servicio(4, "PL003", "Plan nutrición deportiva", "Plan", 70000, false),
    servicio(5, "EV001", "Antropometría completa", "Evaluación", 18000, false),
    servicio(6, "TG001", "Taller de alimentación saludable", "Taller", 15000, true)
];

export function crearToken(minutos: number): string {
    const datos = { sub: "prueba@correo.cl", rol: "PACIENTE", exp: Math.floor(Date.now() / 1000) + minutos * 60 };
    return "e30." + btoa(JSON.stringify(datos)) + ".firma";
}

export function crearSesion(rol: string): Sesion {
    return { token: crearToken(60), id: 2, nombre: "Matías", apellidos: "Vergara", correo: "usuario@correo.cl", rol: rol };
}
