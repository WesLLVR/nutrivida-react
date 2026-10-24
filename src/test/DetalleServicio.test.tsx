// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import DetalleServicio from "../paginas/DetalleServicio";

test("muestra el servicio que corresponde al código de la URL", () => {
    render(
        <MemoryRouter initialEntries={["/servicio/PL003"]}>
            <Routes>
                <Route path="/servicio/:codigo" element={<DetalleServicio alAgregar={() => {}} />} />
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText("Plan nutrición deportiva")).toBeInTheDocument();
    expect(screen.getByText("Valor: $70.000")).toBeInTheDocument();
});
