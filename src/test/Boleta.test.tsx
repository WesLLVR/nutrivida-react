// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Boleta from "../paginas/Boleta";

const boletaEjemplo = {
    numero: 1001,
    fecha: "20-10-2026",
    cliente: "Lucas Valderrama",
    run: "212345679",
    correo: "lucas@correo.cl",
    telefono: "912345678",
    tipoTarjeta: "Crédito",
    tarjeta: "**** **** **** 1111",
    cuotas: 3,
    detalle: [{ nombre: "Taller de alimentación saludable", cantidad: 1, precio: 15000, subtotal: 15000 }],
    neto: 12605,
    iva: 2395,
    total: 15000
};

test("muestra los datos de la boleta recibida por props", () => {
    render(
        <MemoryRouter>
            <Boleta boleta={boletaEjemplo} />
        </MemoryRouter>
    );

    expect(screen.getByText("Boleta N° 1001")).toBeInTheDocument();
    expect(screen.getByText("Taller de alimentación saludable")).toBeInTheDocument();
    expect(screen.getByText("IVA (19%): $2.395")).toBeInTheDocument();
    expect(screen.getByText("Total: $15.000")).toBeInTheDocument();
    expect(screen.getByText(/\*\*\*\* \*\*\*\* \*\*\*\* 1111 en 3 cuotas/)).toBeInTheDocument();
});
