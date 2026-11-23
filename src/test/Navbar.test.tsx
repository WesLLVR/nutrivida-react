// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../componentes/organismos/Navbar";
import { crearSesion } from "./datosPrueba";

test("el nutricionista ve su agenda y fichas, pero no el panel ni la reserva", () => {
    render(
        <MemoryRouter>
            <Navbar cantidadReserva={0} usuario={crearSesion("NUTRICIONISTA")} alCerrarSesion={vi.fn()} />
        </MemoryRouter>
    );

    expect(screen.getByText("Agenda")).toBeInTheDocument();
    expect(screen.getByText("Fichas")).toBeInTheDocument();
    expect(screen.queryByText("Admin")).toBeNull();
    expect(screen.queryByText("Mi reserva")).toBeNull();
});

test("sin sesión el menú muestra Ingresar y no muestra opciones privadas", () => {
    render(
        <MemoryRouter>
            <Navbar cantidadReserva={2} usuario={null} alCerrarSesion={vi.fn()} />
        </MemoryRouter>
    );

    expect(screen.getByText("Ingresar")).toBeInTheDocument();
    expect(screen.queryByText("Mis citas")).toBeNull();
    expect(screen.queryByText("Salir")).toBeNull();
});
