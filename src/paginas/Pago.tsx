import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioPago from "../componentes/organismos/FormularioPago";
import BotonEnlace from "../componentes/atomos/BotonEnlace";
import MensajeError from "../componentes/atomos/MensajeError";
import { calcularTotal } from "../datos/reserva";
import type { ItemReserva } from "../datos/reserva";
import { formatearPrecio } from "../datos/servicios";
import { comprar } from "../api/ventas";
import type { Boleta, DatosPago } from "../datos/boletas";

interface PagoProps {
    items: ItemReserva[];
    alFinalizar: (boleta: Boleta) => void;
}

function Pago({ items, alFinalizar }: PagoProps) {
    const navegar = useNavigate();
    const [error, setError] = useState("");

    if (items.length === 0) {
        return (
            <div className="container">
                <h1>Pago</h1>
                <p>No hay servicios en tu reserva para pagar.</p>
                <BotonEnlace ruta="/servicios" texto="Ver servicios" color="success" />
            </div>
        );
    }

    const pagar = async (datos: DatosPago) => {
        try {
            const boleta = await comprar(datos, items.map(item => ({ codigo: item.codigo, cantidad: item.cantidad })));
            alFinalizar(boleta);
            navegar("/boleta");
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="container">

            <h1>Pago</h1>

            <p className="alert alert-info">Pago simulado: no se realiza ningún cobro real.</p>

            <MensajeError mensaje={error} />

            <div className="row g-3">

                <div className="col-12 col-lg-8">
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
                                    {item.nombre} x {item.cantidad}
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
