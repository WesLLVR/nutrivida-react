// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Boton from "../componentes/atomos/Boton";

test("el botón muestra su texto y llama a la función al hacer click", () => {
    const funcion = vi.fn();

    render(<Boton texto="Guardar" color="success" alHacerClick={funcion} />);

    const boton = screen.getByText("Guardar");
    fireEvent.click(boton);

    expect(boton.textContent).toBe("Guardar");
    expect(boton.className).toContain("btn-success");
    expect(funcion).toHaveBeenCalledTimes(1);
});
