// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FormularioRegistro from "../componentes/organismos/FormularioRegistro";

test("muestra un error cuando el dígito verificador del RUN es incorrecto", () => {
    render(
        <MemoryRouter>
            <FormularioRegistro />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("RUN (sin puntos ni guion)"), { target: { value: "212345670" } });
    fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));

    expect(screen.getByText("El dígito verificador del RUN no es correcto")).toBeInTheDocument();
});
