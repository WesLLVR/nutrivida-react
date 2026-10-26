// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Reserva from "../paginas/Reserva";

test("muestra los servicios agregados y el total", () => {
    render(
        <MemoryRouter>
            <Reserva
                items={[{ codigo: "CN001", cantidad: 2 }, { codigo: "TG001", cantidad: 1 }]}
                alQuitar={() => {}}
                alVaciar={() => {}}
            />
        </MemoryRouter>
    );

    expect(screen.getByText("Primera consulta nutricional")).toBeInTheDocument();
    expect(screen.getByText("Taller de alimentación saludable")).toBeInTheDocument();
    expect(screen.getByText("Total: $85.000")).toBeInTheDocument();
});
