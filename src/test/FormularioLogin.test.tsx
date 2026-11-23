// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { crearSesion } from "./datosPrueba";

vi.mock("../api/usuarios", () => ({
    iniciarSesion: vi.fn()
}));

import { iniciarSesion } from "../api/usuarios";
import FormularioLogin from "../componentes/organismos/FormularioLogin";

function llenarYEnviar(correo: string, clave: string) {
    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: correo } });
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: clave } });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));
}

test("muestra el error que responde el backend si la contraseña no coincide", async () => {
    vi.mocked(iniciarSesion).mockRejectedValue(new Error("El correo o la contraseña no coinciden"));
    render(
        <MemoryRouter>
            <FormularioLogin alIniciar={vi.fn()} />
        </MemoryRouter>
    );

    llenarYEnviar("admin@nutrivida.cl", "9999");

    expect(await screen.findByText("El correo o la contraseña no coinciden")).toBeInTheDocument();
});

test("con datos correctos entrega la sesión con el token al componente padre", async () => {
    const sesion = crearSesion("ADMINISTRADOR");
    vi.mocked(iniciarSesion).mockResolvedValue(sesion);
    const alIniciar = vi.fn();
    render(
        <MemoryRouter>
            <FormularioLogin alIniciar={alIniciar} />
        </MemoryRouter>
    );

    llenarYEnviar("admin@nutrivida.cl", "1234");

    await waitFor(() => expect(alIniciar).toHaveBeenCalledWith(sesion));
});
