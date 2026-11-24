export const horasAtencion = ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00", "17:00"];

export function horasDeAtencion(horario: string): string[] {
    const partes = horario.match(/(\d{2}):\d{2} a (\d{2}):\d{2}/);

    if (partes === null) {
        return horasAtencion;
    }

    const horas: string[] = [];
    for (let h = Number(partes[1]); h < Number(partes[2]); h++) {
        horas.push(String(h).padStart(2, "0") + ":00");
    }
    return horas;
}

export function colorEstado(estado: string): string {
    if (estado === "CONFIRMADA") {
        return "success";
    }
    if (estado === "CANCELADA") {
        return "secondary";
    }
    return "warning";
}

export function fechaDeHoy(): string {
    const hoy = new Date();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return hoy.getFullYear() + "-" + mes + "-" + dia;
}
