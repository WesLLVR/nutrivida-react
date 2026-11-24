import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import CampoSelect from "../moleculas/CampoSelect";
import CampoArea from "../moleculas/CampoArea";
import MensajeError from "../atomos/MensajeError";
import { horasAtencion, horasDeAtencion, fechaDeHoy } from "../../datos/citas";
import type { Nutricionista } from "../../api/catalogo";
import type { Cita, DatosCita } from "../../api/citas";

interface FormularioCitaProps {
    nutricionistas: Nutricionista[];
    citaReprogramar: Cita | null;
    alEnviar: (datos: DatosCita) => void;
    alCancelar: () => void;
}

function FormularioCita({ nutricionistas, citaReprogramar, alEnviar, alCancelar }: FormularioCitaProps) {
    const esNueva = citaReprogramar === null;

    const [nutricionista, setNutricionista] = useState(citaReprogramar ? citaReprogramar.nutricionista : "");
    const [fecha, setFecha] = useState(citaReprogramar ? citaReprogramar.fecha : "");
    const [hora, setHora] = useState(citaReprogramar ? citaReprogramar.hora : "");
    const [motivo, setMotivo] = useState(citaReprogramar ? citaReprogramar.motivo : "");
    const [error, setError] = useState("");

    const seleccionado = nutricionistas.find(n => n.nombre === nutricionista);
    const horas = seleccionado ? horasDeAtencion(seleccionado.horario) : horasAtencion;

    const cambiarNutricionista = (valor: string) => {
        setNutricionista(valor);
        setHora("");
    };

    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (esNueva && seleccionado === undefined) {
            setError("Seleccione un nutricionista");
            return;
        }
        if (fecha === "") {
            setError("Seleccione la fecha");
            return;
        }
        if (fecha < fechaDeHoy()) {
            setError("La fecha no puede ser anterior a hoy");
            return;
        }
        if (hora === "") {
            setError("Seleccione la hora");
            return;
        }
        if (motivo.trim() === "") {
            setError("Indique el motivo de la consulta");
            return;
        }
        if (motivo.length > 300) {
            setError("El motivo no puede tener más de 300 caracteres");
            return;
        }

        setError("");
        alEnviar({
            nutricionistaId: seleccionado ? seleccionado.id : citaReprogramar!.nutricionistaId,
            fecha: fecha,
            hora: hora,
            motivo: motivo.trim()
        });
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>
            <h2 className="h5">{esNueva ? "Solicitar cita" : "Reprogramar cita"}</h2>

            {esNueva ? (
                <CampoSelect
                    etiqueta="Nutricionista"
                    nombre="nutricionista"
                    valor={nutricionista}
                    opciones={nutricionistas.map(n => n.nombre)}
                    alCambiar={cambiarNutricionista}
                />
            ) : (
                <p>Nutricionista: <strong>{nutricionista}</strong></p>
            )}

            <CampoFormulario etiqueta="Fecha" tipo="date" nombre="fecha" valor={fecha} alCambiar={setFecha} />
            <CampoSelect etiqueta="Hora" nombre="hora" valor={hora} opciones={horas} alCambiar={setHora} />

            {esNueva && (
                <CampoArea etiqueta="Motivo de la consulta" nombre="motivo" valor={motivo} alCambiar={setMotivo} />
            )}

            <MensajeError mensaje={error} />

            <button type="submit" className="btn btn-success me-2">
                {esNueva ? "Solicitar" : "Guardar cambio"}
            </button>

            {!esNueva && (
                <button type="button" className="btn btn-secondary" onClick={alCancelar}>
                    Cancelar
                </button>
            )}
        </form>
    );
}

export default FormularioCita;
