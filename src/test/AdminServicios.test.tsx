// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AdminServicios from "../paginas/AdminServicios";

function mostrarAdmin() {
    render(
        <MemoryRouter>
            <AdminServicios />
        </MemoryRouter>
    );
}

test("CREATE: un servicio creado en el formulario aparece en la tabla", () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});
    mostrarAdmin();

    fireEvent.click(screen.getByText("Nuevo servicio"));

    fireEvent.change(screen.getByLabelText("Código"), { target: { value: "ON001" } });
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Consulta online" } });
    fireEvent.change(screen.getByLabelText("Tipo"), { target: { value: "Consulta" } });
    fireEvent.change(screen.getByLabelText("Duración"), { target: { value: "40 min" } });
    fireEvent.change(screen.getByLabelText("Modalidad"), { target: { value: "Online" } });
    fireEvent.change(screen.getByLabelText("Precio"), { target: { value: "30000" } });
    fireEvent.change(screen.getByLabelText("Descripción"), { target: { value: "Atención por videollamada." } });
    fireEvent.click(screen.getByText("Guardar"));

    expect(screen.getByText("Consulta online")).toBeInTheDocument();
    expect(alerta).toHaveBeenCalledWith("Servicio creado correctamente");

    alerta.mockRestore();
});

test("UPDATE: al editar un servicio la tabla muestra el nuevo precio", () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => {});
    mostrarAdmin();

    fireEvent.click(screen.getAllByText("Editar")[0]);

    expect(screen.getByLabelText("Precio")).toHaveValue(35000);

    fireEvent.change(screen.getByLabelText("Precio"), { target: { value: "40000" } });
    fireEvent.click(screen.getByText("Guardar"));

    expect(screen.getByText("$40.000")).toBeInTheDocument();
    expect(alerta).toHaveBeenCalledWith("Servicio actualizado correctamente");

    alerta.mockRestore();
});

test("DELETE: al confirmar, el servicio desaparece de la tabla", () => {
    const confirmar = vi.spyOn(window, "confirm").mockReturnValue(true);
    mostrarAdmin();

    expect(screen.getByText("Antropometría completa")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("Eliminar")[4]);

    expect(confirmar).toHaveBeenCalled();
    expect(screen.queryByText("Antropometría completa")).toBeNull();

    confirmar.mockRestore();
});
