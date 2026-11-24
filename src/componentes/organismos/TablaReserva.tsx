import Boton from "../atomos/Boton";
import { formatearPrecio } from "../../datos/servicios";
import type { ItemReserva } from "../../datos/reserva";

interface TablaProps {
    items: ItemReserva[];
    alQuitar: (codigo: string) => void;
}

function TablaReserva({ items, alQuitar }: TablaProps) {
    return (
        <div className="table-responsive">
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Valor</th>
                        <th>Cantidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.codigo}>
                            <td>{item.nombre}</td>
                            <td>{formatearPrecio(item.precio)}</td>
                            <td>{item.cantidad}</td>
                            <td>
                                <Boton
                                    texto="Quitar"
                                    color="outline-danger"
                                    alHacerClick={() => alQuitar(item.codigo)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaReserva;
