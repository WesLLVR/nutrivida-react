// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import FormularioPago from "../componentes/organismos/FormularioPago";

beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 20));
});

afterEach(() => {
    vi.useRealTimers();
});

function escribir(etiqueta: string, valor: string) {
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
}

function llenarFormulario() {
    escribir("Nombre completo", "Lucas Valderrama");
    escribir("RUN (sin puntos ni guion)", "212345679");
    escribir("Correo", "lucas@correo.cl");
    escribir("Teléfono (9 dígitos)", "912345678");
    escribir("Tipo de tarjeta", "Crédito");
    escribir("Número de tarjeta", "4111 1111 1111 1111");
    escribir("Nombre del titular", "Lucas Valderrama");
    escribir("Vencimiento (MM/AA)", "08/29");
    escribir("CVV", "123");
    escribir("Cuotas", "3");
}

function pagar() {
    fireEvent.click(screen.getByRole("button", { name: "Pagar" }));
}

test("muestra un error si la tarjeta está vencida", () => {
    const alPagar = vi.fn();
    render(<FormularioPago alPagar={alPagar} />);

    llenarFormulario();
    escribir("Vencimiento (MM/AA)", "09/26");
    pagar();

    expect(screen.getByText("La tarjeta está vencida")).toBeInTheDocument();
    expect(alPagar).not.toHaveBeenCalled();
});

test("el campo cuotas solo aparece con tarjeta de crédito", () => {
    render(<FormularioPago alPagar={() => {}} />);

    expect(screen.queryByLabelText("Cuotas")).toBeNull();

    escribir("Tipo de tarjeta", "Crédito");
    expect(screen.getByLabelText("Cuotas")).toBeInTheDocument();

    escribir("Tipo de tarjeta", "Débito");
    expect(screen.queryByLabelText("Cuotas")).toBeNull();
});

test("con datos correctos envía los datos del pago sin el CVV", () => {
    const alPagar = vi.fn();
    render(<FormularioPago alPagar={alPagar} />);

    llenarFormulario();
    pagar();

    expect(screen.queryByRole("alert")).toBeNull();
    expect(alPagar).toHaveBeenCalledWith({
        nombre: "Lucas Valderrama",
        run: "212345679",
        correo: "lucas@correo.cl",
        telefono: "912345678",
        tipoTarjeta: "Crédito",
        numeroTarjeta: "4111 1111 1111 1111",
        cuotas: 3
    });
});
