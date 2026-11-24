import { useEffect, useState } from "react";
import FormularioCita from "../componentes/organismos/FormularioCita";
import TablaCitas from "../componentes/organismos/TablaCitas";
import MensajeError from "../componentes/atomos/MensajeError";
import { listarNutricionistas } from "../api/catalogo";
import type { Nutricionista } from "../api/catalogo";
import { cancelarCita, listarMisCitas, reprogramarCita, solicitarCita } from "../api/citas";
import type { Cita, DatosCita } from "../api/citas";

function MisCitas() {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [nutricionistas, setNutricionistas] = useState<Nutricionista[]>([]);
    const [citaReprogramar, setCitaReprogramar] = useState<Cita | null>(null);
    const [error, setError] = useState("");
    const [recargar, setRecargar] = useState(0);

    useEffect(() => {
        listarNutricionistas().then(lista => setNutricionistas(lista)).catch(err => setError(err.message));
    }, []);

    useEffect(() => {
        listarMisCitas().then(lista => setCitas(lista)).catch(err => setError(err.message));
    }, [recargar]);

    const enviar = async (datos: DatosCita) => {
        try {
            if (citaReprogramar === null) {
                await solicitarCita(datos);
                alert("Cita solicitada. El nutricionista la confirmará pronto");
            } else {
                await reprogramarCita(citaReprogramar.id, datos.fecha, datos.hora);
                alert("Cita reprogramada");
                setCitaReprogramar(null);
            }
            setError("");
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

            <h1>Mis citas</h1>

            <MensajeError mensaje={error} />

            <div className="row g-4">
                <div className="col-12 col-lg-4">
                    <div className="card p-3">
                        <FormularioCita
                            key={citaReprogramar ? citaReprogramar.id : "nueva"}
                            nutricionistas={nutricionistas}
                            citaReprogramar={citaReprogramar}
                            alEnviar={enviar}
                            alCancelar={() => setCitaReprogramar(null)}
                        />
                    </div>
                </div>

                <div className="col-12 col-lg-8">
                    <TablaCitas
                        citas={citas}
                        mostrarPaciente={false}
                        mostrarNutricionista={true}
                        alCancelar={cancelar}
                        alReprogramar={setCitaReprogramar}
                    />
                </div>
            </div>

        </div>
    );
}

export default MisCitas;
