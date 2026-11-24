import { peticion } from "./cliente";

export interface Cita {
    id: number;
    fecha: string;
    hora: string;
    motivo: string;
    estado: string;
    pacienteId: number;
    paciente: string;
    nutricionistaId: number;
    nutricionista: string;
}

export interface DatosCita {
    nutricionistaId: number;
    fecha: string;
    hora: string;
    motivo: string;
}

export function solicitarCita(datos: DatosCita): Promise<Cita> {
    return peticion<Cita>("/citas", "POST", datos);
}

export function listarMisCitas(): Promise<Cita[]> {
    return peticion<Cita[]>("/citas/mis-citas");
}

export function listarTodasLasCitas(): Promise<Cita[]> {
    return peticion<Cita[]>("/citas");
}

export function confirmarCita(id: number): Promise<Cita> {
    return peticion<Cita>("/citas/" + id + "/confirmar", "PUT");
}

export function cancelarCita(id: number): Promise<Cita> {
    return peticion<Cita>("/citas/" + id + "/cancelar", "PUT");
}

export function reprogramarCita(id: number, fecha: string, hora: string): Promise<Cita> {
    return peticion<Cita>("/citas/" + id + "/reprogramar", "PUT", { fecha, hora });
}

export function eliminarCita(id: number): Promise<null> {
    return peticion<null>("/citas/" + id, "DELETE");
}
