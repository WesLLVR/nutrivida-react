// @vitest-environment jsdom
import { test, expect, vi, beforeEach } from "vitest";
import { peticion } from "../api/cliente";
import { guardarSesion } from "../datos/sesion";
import { crearSesion } from "./datosPrueba";

beforeEach(() => {
    localStorage.clear();
});

test("peticion envía el token JWT en el encabezado Authorization", async () => {
    const sesion = crearSesion("PACIENTE");
    guardarSesion(sesion);
    const falsoFetch = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ id: 1 }) });
    vi.stubGlobal("fetch", falsoFetch);

    await peticion("/usuarios/perfil");

    const opciones = falsoFetch.mock.calls[0][1];
    expect(falsoFetch.mock.calls[0][0]).toBe("http://localhost:8080/api/v1/usuarios/perfil");
    expect(opciones.headers.Authorization).toBe("Bearer " + sesion.token);

    vi.unstubAllGlobals();
});

test("si el backend responde 401 se borra la sesión y se muestra su mensaje", async () => {
    guardarSesion(crearSesion("PACIENTE"));
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ mensaje: "Token inválido o expirado" })
    }));

    await expect(peticion("/citas/mis-citas")).rejects.toThrow("Token inválido o expirado");
    expect(localStorage.getItem("nutrivida-sesion")).toBeNull();

    vi.unstubAllGlobals();
});
