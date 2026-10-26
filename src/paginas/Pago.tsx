import { useNavigate } from "react-router-dom";
import FormularioPago from "../componentes/organismos/FormularioPago";
import BotonEnlace from "../componentes/atomos/BotonEnlace";
import { calcularTotal } from "../datos/reserva";
import type { ItemReserva } from "../datos/reserva";
import { buscarServicio, formatearPrecio } from "../datos/servicios";
import { crearBoleta } from "../datos/boletas";
import type { Boleta, DatosPago } from "../datos/boletas";

interface PagoProps {
    items: ItemReserva[];
    alFinalizar: (boleta: Boleta) => void;
}

function Pago({ items, alFinalizar }: PagoProps) {
    const navegar = useNavigate();

    if (items.length === 0) {
        return (
            <div className="container mt-4">
                <h1>Pago</h1>
                <p>No hay servicios en tu reserva para pagar.</p>
                <BotonEnlace ruta="/servicios" texto="Ver servicios" color="success" />
            </div>
        );
    }

    const pagar = (datos: DatosPago) => {
        const boleta = crearBoleta(items, datos);
        alFinalizar(boleta);
        navegar("/boleta");
    };

    return (
        <div className="container mt-4">

            <h1>Pago</h1>

            <p className="alert alert-info">Pago simulado: no se realiza ningún cobro real.</p>

            <div className="row">

                <div className="col-12 col-lg-8 mb-3">
                    <div className="card p-3">
                        <FormularioPago alPagar={pagar} />
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="card p-3">
                        <h2 className="h5">Resumen</h2>

                        <ul className="list-group mb-2">
                            {items.map(item => (
                                <li className="list-group-item" key={item.codigo}>
                                    {buscarServicio(item.codigo)?.nombre} x {item.cantidad}
                                </li>
                            ))}
                        </ul>

                        <p className="h5 mb-0">Total: {formatearPrecio(calcularTotal(items))}</p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Pago;
