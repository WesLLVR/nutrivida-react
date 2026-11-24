export interface ItemReserva {
    codigo: string;
    nombre: string;
    precio: number;
    cantidad: number;
}

export function agregarItem(lista: ItemReserva[], servicio: { codigo: string; nombre: string; precio: number }): ItemReserva[] {
    const existe = lista.find(item => item.codigo === servicio.codigo);

    if (existe === undefined) {
        return [...lista, { codigo: servicio.codigo, nombre: servicio.nombre, precio: servicio.precio, cantidad: 1 }];
    }

    return lista.map(item => {
        if (item.codigo === servicio.codigo) {
            return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
    });
}

export function quitarItem(lista: ItemReserva[], codigo: string): ItemReserva[] {
    return lista.filter(item => item.codigo !== codigo);
}

export function contarItems(lista: ItemReserva[]): number {
    let total = 0;

    for (let i = 0; i < lista.length; i++) {
        total = total + lista[i].cantidad;
    }

    return total;
}

export function calcularTotal(lista: ItemReserva[]): number {
    let total = 0;

    for (let i = 0; i < lista.length; i++) {
        total = total + lista[i].precio * lista[i].cantidad;
    }

    return total;
}

const CLAVE_RESERVA = "nutrivida-reserva";

export function guardarReserva(lista: ItemReserva[]) {
    localStorage.setItem(CLAVE_RESERVA, JSON.stringify(lista));
}

export function leerReserva(): ItemReserva[] {
    const texto = localStorage.getItem(CLAVE_RESERVA);

    if (texto === null) {
        return [];
    }

    return JSON.parse(texto);
}
