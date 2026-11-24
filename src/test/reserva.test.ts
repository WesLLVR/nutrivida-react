// @vitest-environment jsdom
import { test, expect } from "vitest";
import { agregarItem, calcularTotal, contarItems, guardarReserva, leerReserva } from "../datos/reserva";

test("calcularTotal multiplica precio por cantidad", () => {
    const total = calcularTotal([
        { codigo: "CN001", nombre: "Primera consulta", precio: 35000, cantidad: 2 },
        { codigo: "TG001", nombre: "Taller", precio: 15000, cantidad: 1 }
    ]);

    expect(total).toBe(85000);
});

test("agregarItem suma la cantidad si el servicio ya estaba en la reserva", () => {
    const servicio = { codigo: "CN001", nombre: "Primera consulta", precio: 35000 };

    const lista = agregarItem(agregarItem([], servicio), servicio);

    expect(lista.length).toBe(1);
    expect(contarItems(lista)).toBe(2);
});

test("la reserva guardada se recupera al recargar la página", () => {
    localStorage.clear();
    guardarReserva([{ codigo: "PL001", nombre: "Plan pérdida de peso", precio: 65000, cantidad: 1 }]);

    const lista = leerReserva();

    expect(lista.length).toBe(1);
    expect(lista[0].codigo).toBe("PL001");
});
