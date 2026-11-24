import { useEffect, useState } from "react";
import TablaCitas from "../componentes/organismos/TablaCitas";
import MensajeError from "../componentes/atomos/MensajeError";
import { cancelarCita, confirmarCita, listarMisCitas } from "../api/citas";
import type { Cita } from "../api/citas";

function Agenda() {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [error, setError] = useState("");
    const [recargar, setRecargar] = useState(0);

    useEffect(() => {
        listarMisCitas().then(lista => setCitas(lista)).catch(err => setError(err.message));
    }, [recargar]);

    const confirmar = async (id: number) => {
        try {
            await confirmarCita(id);
            setRecargar(recargar + 1);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const cancelar = async (id: number) => {
        if (!confirm("¿Seguro que deseas cancelar esta cita?")) {
            return;
        }
        try {
            await cancelarCita(id);
            setRecargar(recargar + 1);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="container">

            <h1>Mi agenda</h1>
            <p>Citas que los pacientes solicitaron contigo. Confirma las pendientes para avisarles.</p>

            <MensajeError mensaje={error} />

            <TablaCitas
                citas={citas}
                mostrarPaciente={true}
                mostrarNutricionista={false}
                alConfirmar={confirmar}
                alCancelar={cancelar}
            />

        </div>
    );
}

export default Agenda;
