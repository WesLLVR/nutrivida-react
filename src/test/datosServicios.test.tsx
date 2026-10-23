import { test, expect } from "vitest";
import {
    listarServicios,
    buscarServicio,
    crearServicio,
    actualizarServicio,
    eliminarServicio,
    filtrarServicios
} from "../datos/servicios";

test("listarServicios devuelve los 6 servicios iniciales", () => {
    const lista = listarServicios();

    expect(lista.length).toBe(6);
});

test("crearServicio agrega un servicio nuevo a la lista", () => {
    crearServicio({
        codigo: "TG002",
        tipo: "Taller",
        nombre: "Taller de colaciones",
        duracion: "60 min",
        modalidad: "Grupal",
        precio: 12000,
        descripcion: "Ideas de colaciones para el colegio y el trabajo.",
        imagen: "/img/servicio-taller.png",
        destacado: false
    });

    expect(listarServicios().length).toBe(7);
    expect(buscarServicio("TG002")?.nombre).toBe("Taller de colaciones");
});

test("actualizarServicio cambia los datos del servicio", () => {
    const original = buscarServicio("CN002");

    actualizarServicio("CN002", { ...original!, precio: 27000 });

    expect(buscarServicio("CN002")?.precio).toBe(27000);
});

test("eliminarServicio quita el servicio de la lista", () => {
    const cantidadAntes = listarServicios().length;

    eliminarServicio("EV001");

    expect(buscarServicio("EV001")).toBeUndefined();
    expect(listarServicios().length).toBe(cantidadAntes - 1);
});

test("filtrarServicios encuentra servicios por nombre", () => {
    const resultado = filtrarServicios(listarServicios(), "PLAN", "");

    expect(resultado.length).toBe(2);
    expect(resultado[0].codigo).toBe("PL001");
});
