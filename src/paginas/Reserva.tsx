import TablaReserva from "../componentes/organismos/TablaReserva";
import BotonEnlace from "../componentes/atomos/BotonEnlace";
import Boton from "../componentes/atomos/Boton";
import { calcularTotal } from "../datos/reserva";
import type { ItemReserva } from "../datos/reserva";
import { formatearPrecio } from "../datos/servicios";

interface ReservaProps {
    items: ItemReserva[];
    alQuitar: (codigo: string) => void;
    alVaciar: () => void;
}

function Reserva({ items, alQuitar, alVaciar }: ReservaProps) {
    if (items.length === 0) {
        return (
            <div className="container mt-4">
                <h1>Mi reserva</h1>
                <p>Todavía no has seleccionado servicios.</p>
                <BotonEnlace ruta="/servicios" texto="Ver servicios" color="success" />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1>Mi reserva</h1>

            <TablaReserva items={items} alQuitar={alQuitar} />

            <p className="h5">Total: {formatearPrecio(calcularTotal(items))}</p>

            <BotonEnlace ruta="/pago" texto="Ir a pagar" color="success" />
            <Boton texto="Vaciar" color="secondary" alHacerClick={alVaciar} />
        </div>
    );
}

export default Reserva;
