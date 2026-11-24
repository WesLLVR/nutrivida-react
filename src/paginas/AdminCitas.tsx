import { useEffect, useState } from "react";
import TablaCitas from "../componentes/organismos/TablaCitas";
import BotonEnlace from "../componentes/atomos/BotonEnlace";
import MensajeError from "../componentes/atomos/MensajeError";
import { cancelarCita, confirmarCita, eliminarCita, listarTodasLasCitas } from "../api/citas";
import type { Cita } from "../api/citas";

function AdminCitas() {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [error, setError] = useState("");
    const [recargar, setRecargar] = useState(0);

    useEffect(() => {
        listarTodasLasCitas().then(lista => setCitas(lista)).catch(err => setError(err.message));
    }, [recargar]);

    const ejecutar = async (accion: () => Promise<unknown>) => {
        try {
            await accion();
            setRecargar(recargar + 1);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="container">

            <h1>Citas</h1>

            <div className="mb-3">
                <BotonEnlace ruta="/admin" texto="Volver al panel" color="secondary" />
            </div>

            <MensajeError mensaje={error} />

            <TablaCitas
                citas={citas}
                mostrarPaciente={true}
                mostrarNutricionista={true}
                alConfirmar={(id) => ejecutar(() => confirmarCita(id))}
                alCancelar={(id) => ejecutar(() => cancelarCita(id))}
                alEliminar={(id) => {
                    if (confirm("¿Seguro que desea eliminar esta cita?")) {
                        ejecutar(() => eliminarCita(id));
                    }
                }}
            />

        </div>
    );
}

export default AdminCitas;
