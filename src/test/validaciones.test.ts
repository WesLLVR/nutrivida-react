import { test, expect } from "vitest";
import { correoValido, tarjetaVencida } from "../validaciones/validaciones";

test("correoValido acepta un correo correcto y rechaza los mal escritos", () => {
    expect(correoValido("paciente@correo.cl")).toBe(true);
    expect(correoValido("paciente.correo.cl")).toBe(false);
    expect(correoValido("paciente@correo")).toBe(false);
});

test("tarjetaVencida compara la fecha de la tarjeta con la fecha de hoy", () => {
    const hoy = new Date(2026, 9, 20);

    expect(tarjetaVencida("09/26", hoy)).toBe(true);
    expect(tarjetaVencida("10/26", hoy)).toBe(false);
    expect(tarjetaVencida("01/27", hoy)).toBe(false);
});
