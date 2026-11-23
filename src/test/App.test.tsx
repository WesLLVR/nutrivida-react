// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { guardarSesion } from "../datos/sesion";
import { crearSesion, serviciosPrueba } from "./datosPrueba";

vi.mock("../api/catalogo", () => ({
    listarServicios: vi.fn().mockResolvedValue(serviciosPrueba),
    listarNutricionistas: vi.fn().mockResolvedValue([])
}));

import App from "../App";

function mostrarEn(ruta: string) {
    render(
        <MemoryRouter initialEntries={[ruta]}>
            <App />
        </MemoryRouter>
    );
}

beforeEach(() => {
    localStorage.clear();
});

test("sin sesión, el panel de administración redirige al login", () => {
    mostrarEn("/admin");

    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeInTheDocument();
});

test("un paciente que entra a /admin ve la página de acceso restringido", () => {
    guardarSesion(crearSesion("PACIENTE"));

    mostrarEn("/admin");

    expect(screen.getByText("Acceso restringido")).toBeInTheDocument();
    expect(screen.queryByText("Admin")).toBeNull();
});

test("el administrador entra al panel y ve el enlace Admin en el menú", () => {
    guardarSesion(crearSesion("ADMINISTRADOR"));

    mostrarEn("/admin");

    expect(screen.getByText("Panel de administración")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
});

test("la sesión guardada se recupera al recargar y muestra el nombre del usuario", async () => {
    guardarSesion(crearSesion("PACIENTE"));

    mostrarEn("/");

    expect(screen.getByText("Hola, Matías")).toBeInTheDocument();
    expect(screen.getByText("Mis citas")).toBeInTheDocument();
    expect(await screen.findByText("Taller de alimentación saludable")).toBeInTheDocument();
});

test("una dirección que no existe muestra la página no encontrada", () => {
    mostrarEn("/pagina-inventada");

    expect(screen.getByText("Página no encontrada")).toBeInTheDocument();
});
