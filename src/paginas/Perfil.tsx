import { useEffect, useState } from "react";
import TarjetaPerfil from "../componentes/organismos/TarjetaPerfil";
import MensajeError from "../componentes/atomos/MensajeError";
import { obtenerPerfil } from "../api/usuarios";
import type { Usuario } from "../api/usuarios";

function Perfil() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        obtenerPerfil()
            .then(datos => setUsuario(datos))
            .catch(err => setError(err.message));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">

                    <MensajeError mensaje={error} />

                    {usuario === null ? (
                        error === "" && <p>Cargando perfil...</p>
                    ) : (
                        <TarjetaPerfil usuario={usuario} />
                    )}

                </div>
            </div>
        </div>
    );
}

export default Perfil;
