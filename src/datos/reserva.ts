import { buscarServicio } from "./servicios";

export interface ItemReserva {
    codigo: string;
    cantidad: number;
}

export function agregarItem(lista: ItemReserva[], codigo: string): ItemReserva[] {
    const existe = lista.find(item => item.codigo === codigo);

    if (existe === undefined) {
        return [...lista, { codigo: codigo, cantidad: 1 }];
    }

    return lista.map(item => {
        if (item.codigo === codigo) {
            return { codigo: item.codigo, cantidad: item.cantidad + 1 };
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
        const servicio = buscarServicio(lista[i].codigo);

        if (servicio !== undefined) {
            total = total + servicio.precio * lista[i].cantidad;
        }
    }

    return total;
}
