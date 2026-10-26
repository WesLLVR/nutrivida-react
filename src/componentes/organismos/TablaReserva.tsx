import Boton from "../atomos/Boton";
import { buscarServicio, formatearPrecio } from "../../datos/servicios";
import type { ItemReserva } from "../../datos/reserva";

interface TablaProps {
    items: ItemReserva[];
    alQuitar: (codigo: string) => void;
}

function TablaReserva({ items, alQuitar }: TablaProps) {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Valor</th>
                        <th>Cantidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        const servicio = buscarServicio(item.codigo);

                        return (
                            <tr key={item.codigo}>
                                <td>{servicio?.nombre}</td>
                                <td>{formatearPrecio(servicio ? servicio.precio : 0)}</td>
                                <td>{item.cantidad}</td>
                                <td>
                                    <Boton
                                        texto="Quitar"
                                        color="outline-danger"
                                        alHacerClick={() => alQuitar(item.codigo)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TablaReserva;
