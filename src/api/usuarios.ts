import { peticion } from "./cliente";
import type { Sesion } from "../datos/sesion";

export interface Usuario {
    id: number;
    run: string;
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: string;
    direccion: string;
    activo: boolean;
    comuna: { id: number; nombre: string; region: { id: number; nombre: string } };
    rol: { id: number; nombre: string };
}

export interface DatosUsuario {
    run: string;
    nombre: string;
    apellidos: string;
    correo: string;
    clave: string;
    telefono: string;
    comuna: string;
    direccion: string;
    rol: string;
}

export function iniciarSesion(correo: string, clave: string): Promise<Sesion> {
    return peticion<Sesion>("/auth/login", "POST", { correo, clave });
}

export function registrarPaciente(datos: DatosUsuario): Promise<Usuario> {
    return peticion<Usuario>("/auth/registro", "POST", datos);
}

export function renovarToken(): Promise<Sesion> {
    return peticion<Sesion>("/auth/renovar", "POST");
}

export function obtenerPerfil(): Promise<Usuario> {
    return peticion<Usuario>("/usuarios/perfil");
}

export function listarUsuarios(): Promise<Usuario[]> {
    return peticion<Usuario[]>("/usuarios");
}

export function crearUsuario(datos: DatosUsuario): Promise<Usuario> {
    return peticion<Usuario>("/usuarios", "POST", datos);
}

export function actualizarUsuario(id: number, datos: DatosUsuario): Promise<Usuario> {
    return peticion<Usuario>("/usuarios/" + id, "PUT", datos);
}

export function cambiarEstadoUsuario(id: number): Promise<Usuario> {
    return peticion<Usuario>("/usuarios/" + id + "/estado", "PUT");
}

export function eliminarUsuario(id: number): Promise<null> {
    return peticion<null>("/usuarios/" + id, "DELETE");
}
