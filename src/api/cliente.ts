import { borrarSesion, leerSesion } from "../datos/sesion";

export const URL_API = "http://localhost:8080/api/v1";

export async function peticion<T>(ruta: string, metodo: string = "GET", datos?: unknown): Promise<T> {
    const encabezados: Record<string, string> = { "Content-Type": "application/json" };

    const sesion = leerSesion();
    if (sesion !== null) {
        encabezados["Authorization"] = "Bearer " + sesion.token;
    }

    let respuesta: Response;
    try {
        respuesta = await fetch(URL_API + ruta, {
            method: metodo,
            headers: encabezados,
            body: datos === undefined ? undefined : JSON.stringify(datos)
        });
    } catch {
        throw new Error("No se pudo conectar con el servidor");
    }

    if (respuesta.status === 204) {
        return null as T;
    }

    const json = await respuesta.json();

    if (!respuesta.ok) {
        if (respuesta.status === 401 && sesion !== null) {
            borrarSesion();
        }
        throw new Error(json.mensaje ? json.mensaje : "Ocurrió un error en el servidor");
    }

    return json as T;
}
