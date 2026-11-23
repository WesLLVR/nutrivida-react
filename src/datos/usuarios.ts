export interface Region {
    nombre: string;
    comunas: string[];
}

export const regiones: Region[] = [
    { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
    { nombre: "Metropolitana", comunas: ["Santiago", "Providencia", "Maipú", "Puente Alto"] },
    { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles"] },
    { nombre: "La Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"] },
    { nombre: "Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro"] }
];

export const roles = ["ADMINISTRADOR", "NUTRICIONISTA", "PACIENTE"];

export function obtenerComunas(nombreRegion: string): string[] {
    const region = regiones.find(region => region.nombre === nombreRegion);

    if (region === undefined) {
        return [];
    }

    return region.comunas;
}
