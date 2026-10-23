// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CardServicio from "../componentes/moleculas/CardServicio";

test("la tarjeta muestra los datos recibidos por props", () => {
    render(
        <MemoryRouter>
            <CardServicio
                codigo="CN001"
                nombre="Primera consulta nutricional"
                duracion="50 min"
                precio={35000}
                imagen="/img/servicio-consulta.png"
                alAgregar={() => {}}
            />
        </MemoryRouter>
    );

    expect(screen.getByText("Primera consulta nutricional")).toBeInTheDocument();
    expect(screen.getByText("50 min")).toBeInTheDocument();
    expect(screen.getByText("$35.000")).toBeInTheDocument();
});
