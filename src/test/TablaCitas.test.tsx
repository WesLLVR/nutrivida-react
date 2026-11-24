// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TablaCitas from "../componentes/organismos/TablaCitas";
import type { Cita } from "../api/citas";

const citas: Cita[] = [
    { id: 1, fecha: "2026-11-20", hora: "10:00", motivo: "Control", estado: "PENDIENTE", pacienteId: 2, paciente: "Matías Vergara", nutricionistaId: 1, nutricionista: "Carolina Fuentes" },
    { id: 2, fecha: "2026-11-21", hora: "11:00", motivo: "Primera consulta", estado: "CONFIRMADA", pacienteId: 2, paciente: "Matías Vergara", nutricionistaId: 1, nutricionista: "Carolina Fuentes" }
];

test("el botón Confirmar solo aparece en las citas pendientes", () => {
    const alConfirmar = vi.fn();
    render(<TablaCitas citas={citas} mostrarPaciente={true} mostrarNutricionista={false} alConfirmar={alConfirmar} />);

    expect(screen.getAllByText("Confirmar").length).toBe(1);

    fireEvent.click(screen.getByText("Confirmar"));
    expect(alConfirmar).toHaveBeenCalledWith(1);
});

test("si no se entrega la acción, el botón no se muestra", () => {
    render(<TablaCitas citas={citas} mostrarPaciente={false} mostrarNutricionista={true} />);

    expect(screen.queryByText("Confirmar")).toBeNull();
    expect(screen.queryByText("Cancelar")).toBeNull();
    expect(screen.getAllByText("Carolina Fuentes").length).toBe(2);
});
