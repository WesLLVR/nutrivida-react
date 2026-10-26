import BotonEnlace from "../componentes/atomos/BotonEnlace";
import { formatearPrecio } from "../datos/servicios";
import type { Boleta as DatosBoleta } from "../datos/boletas";

interface BoletaProps {
    boleta: DatosBoleta | null;
}

function Boleta({ boleta }: BoletaProps) {
    if (boleta === null) {
        return (
            <div className="container mt-4">
                <h1>Boleta</h1>
                <p>Todavía no has realizado ninguna compra.</p>
                <BotonEnlace ruta="/servicios" texto="Ver servicios" color="success" />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="card p-4">

                        <h1 className="h3">Boleta N° {boleta.numero}</h1>
                        <p className="text-muted">Documento ficticio de prueba, sin validez tributaria.</p>

                        <p className="mb-1"><strong>Clínica Nutricional NutriVida</strong> - Temuco</p>
                        <p>Fecha: {boleta.fecha}</p>

                        <h2 className="h5">Cliente</h2>
                        <p className="mb-1">{boleta.cliente} - RUN {boleta.run}</p>
                        <p>{boleta.correo} - {boleta.telefono}</p>

                        <h2 className="h5">Detalle</h2>

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Servicio</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boleta.detalle.map(linea => (
                                        <tr key={linea.nombre}>
                                            <td>{linea.nombre}</td>
                                            <td>{linea.cantidad}</td>
                                            <td>{formatearPrecio(linea.precio)}</td>
                                            <td>{formatearPrecio(linea.subtotal)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="mb-1">Neto: {formatearPrecio(boleta.neto)}</p>
                        <p className="mb-1">IVA (19%): {formatearPrecio(boleta.iva)}</p>
                        <p className="h5">Total: {formatearPrecio(boleta.total)}</p>

                        <p>
                            Pagado con tarjeta de {boleta.tipoTarjeta.toLowerCase()} {boleta.tarjeta}
                            {boleta.cuotas > 1 ? " en " + boleta.cuotas + " cuotas" : ""}
                        </p>

                        <div>
                            <BotonEnlace ruta="/" texto="Volver al inicio" color="success" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Boleta;
