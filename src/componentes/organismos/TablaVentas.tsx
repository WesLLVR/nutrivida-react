import Boton from "../atomos/Boton";
import Etiqueta from "../atomos/Etiqueta";
import { formatearFecha, formatearPrecio } from "../../datos/servicios";
import type { Boleta } from "../../datos/boletas";

interface TablaVentasProps {
    ventas: Boleta[];
    mostrarCliente: boolean;
    alAnular?: (id: number) => void;
}

function TablaVentas({ ventas, mostrarCliente, alAnular }: TablaVentasProps) {
    if (ventas.length === 0) {
        return <p>No hay compras registradas.</p>;
    }

    return (
        <div className="table-responsive">
            <table className="table table-bordered align-middle">
                <thead>
                    <tr>
                        <th>Boleta</th>
                        <th>Fecha</th>
                        {mostrarCliente && <th>Cliente</th>}
                        <th>Servicios</th>
                        <th>Total</th>
                        <th>Estado</th>
                        {alAnular && <th>Acción</th>}
                    </tr>
                </thead>
                <tbody>
                    {ventas.map(venta => (
                        <tr key={venta.id}>
                            <td>N° {venta.numero}</td>
                            <td>{formatearFecha(venta.fecha)}</td>
                            {mostrarCliente && <td>{venta.cliente}</td>}
                            <td>{venta.detalle.map(d => d.nombre + " x" + d.cantidad).join(", ")}</td>
                            <td>{formatearPrecio(venta.total)}</td>
                            <td><Etiqueta texto={venta.estado} color={venta.estado === "PAGADA" ? "success" : "secondary"} /></td>
                            {alAnular && (
                                <td>
                                    {venta.estado === "PAGADA" && (
                                        <Boton texto="Anular" color="outline-danger" alHacerClick={() => alAnular(venta.id)} />
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaVentas;
