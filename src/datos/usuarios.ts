export interface Usuario {
    run: string;
    nombre: string;
    apellidos: string;
    correo: string;
    clave: string;
    tipo: string;
    region: string;
    comuna: string;
    direccion: string;
    estado: string;
}

export interface Region {
    nombre: string;
    comunas: string[];
}

let usuarios: Usuario[] = [
    {
        run: "212345679",
        nombre: "Javiera",
        apellidos: "Contreras Núñez",
        correo: "admin@nutrivida.cl",
        clave: "1234",
        tipo: "Administrador",
        region: "La Araucanía",
        comuna: "Temuco",
        direccion: "Manuel Montt 210",
        estado: "Activo"
    },
    {
        run: "198765430",
        nombre: "Matías",
        apellidos: "Vergara Soto",
        correo: "usuario@correo.cl",
        clave: "1234",
        tipo: "Paciente",
        region: "La Araucanía",
        comuna: "Villarrica",
        direccion: "Los Robles 145",
        estado: "Activo"
    }
];

export const regiones: Region[] = [
    { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] },
    { nombre: "Metropolitana", comunas: ["Santiago", "Providencia", "Maipú", "Puente Alto"] },
    { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles"] },
    { nombre: "La Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"] },
    { nombre: "Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro"] }
];

export function listarUsuarios(): Usuario[] {
    return [...usuarios];
}

export function buscarUsuarioPorCorreo(correo: string): Usuario | undefined {
    return usuarios.find(usuario => usuario.correo === correo.trim());
}

export function buscarUsuarioPorRun(run: string): Usuario | undefined {
    return usuarios.find(usuario => usuario.run === run);
}

export function crearUsuario(nuevo: Usuario): void {
    usuarios.push(nuevo);
}

export function cambiarEstadoUsuario(run: string): void {
    usuarios = usuarios.map(usuario => {
        if (usuario.run === run) {
            if (usuario.estado === "Activo") {
                return { ...usuario, estado: "Inactivo" };
            }
            return { ...usuario, estado: "Activo" };
        }
        return usuario;
    });
}

export function obtenerComunas(nombreRegion: string): string[] {
    const region = regiones.find(region => region.nombre === nombreRegion);

    if (region === undefined) {
        return [];
    }

    return region.comunas;
}
