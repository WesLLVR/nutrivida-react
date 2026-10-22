import { test, expect } from "vitest";
import { calcularTotal } from "../datos/reserva";

test("calcularTotal multiplica precio por cantidad", () => {
    const total = calcularTotal([{ codigo: "CN001", cantidad: 2 }, { codigo: "TG001", cantidad: 1 }]);

    expect(total).toBe(85000);
});
