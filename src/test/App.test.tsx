// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../App";

test("flujo de compra: reserva, pago y boleta", () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
        <MemoryRouter initialEntries={["/servicios"]}>
            <App />
        </MemoryRouter>
    );

    fireEvent.click(screen.getAllByText("Agregar")[0]);
    fireEvent.click(screen.getByText("Mi reserva"));
    fireEvent.click(screen.getByText("Ir a pagar"));

    const escribir = (etiqueta: string, valor: string) => {
        fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
    };
    escribir("Nombre completo", "Lucas Valderrama");
    escribir("RUN (sin puntos ni guion)", "212345679");
    escribir("Correo", "lucas@correo.cl");
    escribir("Teléfono (9 dígitos)", "912345678");
    escribir("Tipo de tarjeta", "Débito");
    escribir("Número de tarjeta", "4111111111111111");
    escribir("Nombre del titular", "Lucas Valderrama");
    escribir("Vencimiento (MM/AA)", "12/30");
    escribir("CVV", "123");
    fireEvent.click(screen.getByRole("button", { name: "Pagar" }));

    expect(screen.getByText("Boleta N° 1001")).toBeInTheDocument();
    expect(screen.getByText("Total: $35.000")).toBeInTheDocument();
    expect(screen.getByText("Mi reserva").querySelector(".badge")).toHaveTextContent("0");

    alerta.mockRestore();
});
