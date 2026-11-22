// @vitest-environment jsdom
import { test, expect, beforeEach } from "vitest";
import { guardarSesion, leerSesion, rutaInicio, tokenPorVencer } from "../datos/sesion";
import { crearSesion, crearToken } from "./datosPrueba";

beforeEach(() => {
    localStorage.clear();
});

test("la sesión guardada se mantiene al recargar mientras el token esté vigente", () => {
    guardarSesion(crearSesion("PACIENTE"));

    const sesion = leerSesion();

    expect(sesion?.nombre).toBe("Matías");
});

test("si el token expiró, la sesión se borra y no se puede usar", () => {
    guardarSesion({ ...crearSesion("PACIENTE"), token: crearToken(-5) });

    expect(leerSesion()).toBeNull();
    expect(localStorage.getItem("nutrivida-sesion")).toBeNull();
});

test("tokenPorVencer avisa cuando quedan menos de 10 minutos", () => {
    expect(tokenPorVencer(crearToken(5))).toBe(true);
    expect(tokenPorVencer(crearToken(50))).toBe(false);
});

test("rutaInicio lleva a cada rol a su pantalla principal", () => {
    expect(rutaInicio("ADMINISTRADOR")).toBe("/admin");
    expect(rutaInicio("NUTRICIONISTA")).toBe("/agenda");
    expect(rutaInicio("PACIENTE")).toBe("/");
});
