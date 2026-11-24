// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FormularioCita from "../componentes/organismos/FormularioCita";

const nutricionistas = [
    { id: 1, codigo: "NUT001", nombre: "Carolina Fuentes", especialidad: "Obesidad", diasAtencion: "Lunes", horario: "09:00 a 17:00", correo: "carolina.fuentes@nutrivida.cl" }
];

test("no permite pedir una cita en una fecha pasada", () => {
    const alEnviar = vi.fn();
    render(<FormularioCita nutricionistas={nutricionistas} citaReprogramar={null} alEnviar={alEnviar} alCancelar={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Nutricionista"), { target: { value: "Carolina Fuentes" } });
    fireEvent.change(screen.getByLabelText("Fecha"), { target: { value: "2020-01-10" } });
    fireEvent.change(screen.getByLabelText("Hora"), { target: { value: "10:00" } });
    fireEvent.change(screen.getByLabelText("Motivo de la consulta"), { target: { value: "Control" } });
    fireEvent.click(screen.getByRole("button", { name: "Solicitar" }));

    expect(screen.getByText("La fecha no puede ser anterior a hoy")).toBeInTheDocument();
    expect(alEnviar).not.toHaveBeenCalled();
});

test("con datos correctos entrega el id del nutricionista elegido", () => {
    const alEnviar = vi.fn();
    render(<FormularioCita nutricionistas={nutricionistas} citaReprogramar={null} alEnviar={alEnviar} alCancelar={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Nutricionista"), { target: { value: "Carolina Fuentes" } });
    fireEvent.change(screen.getByLabelText("Fecha"), { target: { value: "2099-01-10" } });
    fireEvent.change(screen.getByLabelText("Hora"), { target: { value: "10:00" } });
    fireEvent.change(screen.getByLabelText("Motivo de la consulta"), { target: { value: "Control" } });
    fireEvent.click(screen.getByRole("button", { name: "Solicitar" }));

    expect(alEnviar).toHaveBeenCalledWith({ nutricionistaId: 1, fecha: "2099-01-10", hora: "10:00", motivo: "Control" });
});
