export interface Sesion {
    token: string;
    id: number;
    nombre: string;
    apellidos: string;
    correo: string;
    rol: string;
}

const CLAVE_SESION = "nutrivida-sesion";

export function guardarSesion(sesion: Sesion): void {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
}

export function borrarSesion(): void {
    localStorage.removeItem(CLAVE_SESION);
}

export function leerDatosToken(token: string): { exp: number; rol: string; sub: string } | null {
    const partes = token.split(".");

    if (partes.length !== 3) {
        return null;
    }

    try {
        const texto = atob(partes[1].replace(/-/g, "+").replace(/_/g, "/"));
        return JSON.parse(texto);
    } catch {
        return null;
    }
}

export function segundosRestantes(token: string): number {
    const datos = leerDatosToken(token);

    if (datos === null) {
        return 0;
    }

    return datos.exp - Math.floor(Date.now() / 1000);
}

export function tokenExpirado(token: string): boolean {
    return segundosRestantes(token) <= 0;
}

export function tokenPorVencer(token: string): boolean {
    return segundosRestantes(token) < 600;
}

export function leerSesion(): Sesion | null {
    const texto = localStorage.getItem(CLAVE_SESION);

    if (texto === null) {
        return null;
    }

    const sesion: Sesion = JSON.parse(texto);

    if (tokenExpirado(sesion.token)) {
        borrarSesion();
        return null;
    }

    return sesion;
}

export function tieneRol(sesion: Sesion | null, roles: string[]): boolean {
    return sesion !== null && roles.includes(sesion.rol);
}

export function rutaInicio(rol: string): string {
    if (rol === "ADMINISTRADOR") {
        return "/admin";
    }
    if (rol === "NUTRICIONISTA") {
        return "/agenda";
    }
    return "/";
}
