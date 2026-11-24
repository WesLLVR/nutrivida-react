import { test, expect } from "vitest";
import { horasDeAtencion } from "../datos/citas";

test("horasDeAtencion arma las horas según el horario del nutricionista", () => {
    expect(horasDeAtencion("14:00 a 19:00")).toEqual(["14:00", "15:00", "16:00", "17:00", "18:00"]);
    expect(horasDeAtencion("08:00 a 13:00")[0]).toBe("08:00");
});
