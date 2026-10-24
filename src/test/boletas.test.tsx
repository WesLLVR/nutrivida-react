import { test, expect } from "vitest";
import { crearBoleta } from "../datos/boletas";

const datos = {
    nombre: "Lucas Valderrama",
    run: "212345679",
    correo: "lucas@correo.cl",
    telefono: "912345678",
    tipoTarjeta: "Crédito",
    numeroTarjeta: "4111 1111 1111 1111",
    cuotas: 3
};

test("crearBoleta arma el detalle, separa el IVA y oculta la tarjeta", () => {
    const boleta = crearBoleta([{ codigo: "CN001", cantidad: 2 }, { codigo: "TG001", cantidad: 1 }], datos);

    expect(boleta.detalle.length).toBe(2);
    expect(boleta.detalle[0].subtotal).toBe(70000);
    expect(boleta.total).toBe(85000);
    expect(boleta.neto).toBe(71429);
    expect(boleta.iva).toBe(13571);
    expect(boleta.neto + boleta.iva).toBe(boleta.total);
    expect(boleta.tarjeta).toBe("**** **** **** 1111");
    expect(boleta.numero).toBe(1001);
});
