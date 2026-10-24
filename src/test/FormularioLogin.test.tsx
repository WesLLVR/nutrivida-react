// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FormularioLogin from "../componentes/organismos/FormularioLogin";

test("muestra un error si la contraseña no coincide", () => {
    render(
        <MemoryRouter>
            <FormularioLogin />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Correo electrónico"), { target: { value: "admin@nutrivida.cl" } });
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "9999" } });
    fireEvent.click(screen.getByRole("button", { name: "Ingresar" }));

    expect(screen.getByText("El correo o la contraseña no coinciden")).toBeInTheDocument();
});
