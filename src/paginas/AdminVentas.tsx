import { useEffect, useState } from "react";
import TablaVentas from "../componentes/organismos/TablaVentas";
import BotonEnlace from "../componentes/atomos/BotonEnlace";
import MensajeError from "../componentes/atomos/MensajeError";
import { anularVenta, listarVentas } from "../api/ventas";
import type { Boleta } from "../datos/boletas";

function AdminVentas() {
    const [ventas, setVentas] = useState<Boleta[]>([]);
    const [error, setError] = useState("");
    const [recargar, setRecargar] = useState(0);

    useEffect(() => {
        listarVentas().then(lista => setVentas(lista)).catch(err => setError(err.message));
    }, [recargar]);

    const anular = async (id: number) => {
        if (!confirm("¿Seguro que desea anular esta venta?")) {
            return;
        }
        try {
            await anularVenta(id);
            setRecargar(recargar + 1);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="container">

            <h1>Ventas</h1>

            <div className="mb-3">
                <BotonEnlace ruta="/admin" texto="Volver al panel" color="secondary" />
            </div>

            <MensajeError mensaje={error} />

            <TablaVentas ventas={ventas} mostrarCliente={true} alAnular={anular} />

        </div>
    );
}

export default AdminVentas;
