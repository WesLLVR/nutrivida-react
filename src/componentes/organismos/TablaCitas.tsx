import Boton from "../atomos/Boton";
import Etiqueta from "../atomos/Etiqueta";
import { colorEstado } from "../../datos/citas";
import { formatearFecha } from "../../datos/servicios";
import type { Cita } from "../../api/citas";

interface TablaCitasProps {
    citas: Cita[];
    mostrarPaciente: boolean;
    mostrarNutricionista: boolean;
    alConfirmar?: (id: number) => void;
    alCancelar?: (id: number) => void;
    alReprogramar?: (cita: Cita) => void;
    alEliminar?: (id: number) => void;
}

function TablaCitas({ citas, mostrarPaciente, mostrarNutricionista, alConfirmar, alCancelar, alReprogramar, alEliminar }: TablaCitasProps) {
    if (citas.length === 0) {
        return <p>No hay citas registradas.</p>;
    }

    return (
        <div className="table-responsive">
            <table className="table table-bordered align-middle">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        {mostrarPaciente && <th>Paciente</th>}
                        {mostrarNutricionista && <th>Nutricionista</th>}
                        <th>Motivo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {citas.map(cita => {
                        const activa = cita.estado !== "CANCELADA";

                        return (
                            <tr key={cita.id}>
                                <td>{formatearFecha(cita.fecha)}</td>
                                <td>{cita.hora}</td>
                                {mostrarPaciente && <td>{cita.paciente}</td>}
                                {mostrarNutricionista && <td>{cita.nutricionista}</td>}
                                <td>{cita.motivo}</td>
                                <td><Etiqueta texto={cita.estado} color={colorEstado(cita.estado)} /></td>
                                <td>
                                    {alConfirmar && cita.estado === "PENDIENTE" && (
                                        <Boton texto="Confirmar" color="outline-success" alHacerClick={() => alConfirmar(cita.id)} />
                                    )}
                                    {alReprogramar && activa && (
                                        <Boton texto="Reprogramar" color="outline-primary" alHacerClick={() => alReprogramar(cita)} />
                                    )}
                                    {alCancelar && activa && (
                                        <Boton texto="Cancelar" color="outline-danger" alHacerClick={() => alCancelar(cita.id)} />
                                    )}
                                    {alEliminar && (
                                        <Boton texto="Eliminar" color="outline-secondary" alHacerClick={() => alEliminar(cita.id)} />
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TablaCitas;
