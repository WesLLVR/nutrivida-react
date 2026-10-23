// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ListaServicios from "../componentes/organismos/ListaServicios";
import { listarServicios } from "../datos/servicios";

test("muestra una tarjeta por cada servicio de la lista", () => {
    const servicios = listarServicios();

    render(
        <MemoryRouter>
            <ListaServicios servicios={servicios} alAgregar={() => {}} />
        </MemoryRouter>
    );

    expect(screen.getAllByText("Ver detalle").length).toBe(servicios.length);

    for (let i = 0; i < servicios.length; i++) {
        expect(screen.getByText(servicios[i].nombre)).toBeInTheDocument();
    }
});

test("muestra un mensaje cuando la lista está vacía", () => {
    render(
        <MemoryRouter>
            <ListaServicios servicios={[]} alAgregar={() => {}} />
        </MemoryRouter>
    );

    expect(screen.getByText("No se encontraron servicios.")).toBeInTheDocument();
    expect(screen.queryByText("Ver detalle")).toBeNull();
});
