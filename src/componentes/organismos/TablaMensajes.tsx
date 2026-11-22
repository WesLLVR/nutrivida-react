import Boton from "../atomos/Boton";
import Etiqueta from "../atomos/Etiqueta";
import { formatearFecha } from "../../datos/servicios";
import type { Mensaje } from "../../api/contactos";

interface TablaMensajesProps {
    mensajes: Mensaje[];
    alMarcar: (id: number) => void;
    alEliminar: (id: number) => void;
}

function TablaMensajes({ mensajes, alMarcar, alEliminar }: TablaMensajesProps) {
    if (mensajes.length === 0) {
        return <p>No hay mensajes recibidos.</p>;
    }

    return (
        <div className="table-responsive">
            <table className="table table-bordered align-middle">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Mensaje</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mensajes.map(m => (
                        <tr key={m.id}>
                            <td>{formatearFecha(m.fecha)}</td>
                            <td>{m.nombre}</td>
                            <td>{m.correo}</td>
                            <td>{m.mensaje}</td>
                            <td><Etiqueta texto={m.leido ? "Leído" : "Nuevo"} color={m.leido ? "secondary" : "warning"} /></td>
                            <td>
                                <Boton texto={m.leido ? "Marcar nuevo" : "Marcar leído"} color="outline-primary" alHacerClick={() => alMarcar(m.id)} />
                                <Boton texto="Eliminar" color="outline-danger" alHacerClick={() => alEliminar(m.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaMensajes;
