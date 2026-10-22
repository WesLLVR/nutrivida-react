export function correoValido(correo: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

export function runSinPuntos(run: string): boolean {
    return /^[0-9]+[0-9K]$/.test(run.trim().toUpperCase());
}

export function runValido(run: string): boolean {
    const texto = run.trim().toUpperCase();

    if (texto.length < 8 || texto.length > 9) {
        return false;
    }

    const cuerpo = texto.substring(0, texto.length - 1);
    const digito = texto.substring(texto.length - 1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma = suma + Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador + 1;

        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    const resto = 11 - (suma % 11);
    let esperado = String(resto);

    if (resto === 11) {
        esperado = "0";
    }
    if (resto === 10) {
        esperado = "K";
    }

    return esperado === digito;
}

export function telefonoValido(telefono: string): boolean {
    return /^9[0-9]{8}$/.test(telefono.trim());
}

export function formatoVencimiento(fecha: string): boolean {
    return /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(fecha.trim());
}

export function tarjetaVencida(fecha: string, hoy: Date): boolean {
    const mes = Number(fecha.substring(0, 2));
    const anio = 2000 + Number(fecha.substring(3, 5));

    const mesActual = hoy.getMonth() + 1;
    const anioActual = hoy.getFullYear();

    if (anio < anioActual) {
        return true;
    }
    if (anio === anioActual && mes < mesActual) {
        return true;
    }
    return false;
}
