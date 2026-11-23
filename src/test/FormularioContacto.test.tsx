// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("../api/contactos", () => ({
    enviarMensaje: vi.fn().mockResolvedValue({ id: 1 })
}));

import { enviarMensaje } from "../api/contactos";
import FormularioContacto from "../componentes/organismos/FormularioContacto";

test("muestra un error cuando el nombre está vacío", () => {
    render(<FormularioContacto />);

    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    expect(screen.getByText("Debe ingresar su nombre")).toBeInTheDocument();
    expect(enviarMensaje).not.toHaveBeenCalled();
});

test("con datos correctos envía el mensaje a la API y limpia el formulario", async () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<FormularioContacto />);

    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Lucas" } });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "lucas@correo.cl" } });
    fireEvent.change(screen.getByLabelText("Mensaje"), { target: { value: "Quiero agendar una hora" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    await waitFor(() => expect(alerta).toHaveBeenCalledWith("Gracias Lucas, recibimos tu mensaje"));
    expect(enviarMensaje).toHaveBeenCalledWith("Lucas", "lucas@correo.cl", "Quiero agendar una hora");
    expect(screen.getByLabelText("Nombre")).toHaveValue("");

    alerta.mockRestore();
});
