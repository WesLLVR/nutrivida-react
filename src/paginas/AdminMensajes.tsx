import { useEffect, useState } from "react";
import TablaMensajes from "../componentes/organismos/TablaMensajes";
import BotonEnlace from "../componentes/atomos/BotonEnlace";
import MensajeError from "../componentes/atomos/MensajeError";
import { eliminarMensaje, listarMensajes, marcarLeido } from "../api/contactos";
import type { Mensaje } from "../api/contactos";

function AdminMensajes() {
    const [mensajes, setMensajes] = useState<Mensaje[]>([]);
    const [error, setError] = useState("");
    const [recargar, setRecargar] = useState(0);

    useEffect(() => {
        listarMensajes().then(lista => setMensajes(lista)).catch(err => setError(err.message));
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

            <h1>Mensajes de contacto</h1>

            <div className="mb-3">
                <BotonEnlace ruta="/admin" texto="Volver al panel" color="secondary" />
            </div>

            <MensajeError mensaje={error} />

            <TablaMensajes
                mensajes={mensajes}
                alMarcar={(id) => ejecutar(() => marcarLeido(id))}
                alEliminar={(id) => {
                    if (confirm("¿Seguro que desea eliminar este mensaje?")) {
                        ejecutar(() => eliminarMensaje(id));
                    }
                }}
            />

        </div>
    );
}

export default AdminMensajes;
