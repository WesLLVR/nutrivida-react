// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import FormularioContacto from "../componentes/organismos/FormularioContacto";

test("muestra un error cuando el nombre está vacío", () => {
    render(<FormularioContacto />);

    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.getByText("Debe ingresar su nombre")).toBeInTheDocument();
});

test("con datos correctos no muestra errores y llama a alert", () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<FormularioContacto />);

    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Lucas" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "lucas@correo.cl" } });
    fireEvent.change(screen.getByLabelText("Mensaje"), { target: { value: "Quiero agendar una hora" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.queryByRole("alert")).toBeNull();
    expect(alerta).toHaveBeenCalledWith("Gracias Lucas, recibimos tu mensaje");

    expect(screen.getByLabelText("Nombre")).toHaveValue("");

    alerta.mockRestore();
});
