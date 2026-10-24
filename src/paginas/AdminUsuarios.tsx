import { useState } from "react";
import TablaUsuarios from "../componentes/organismos/TablaUsuarios";
import BotonEnlace from "../componentes/atomos/BotonEnlace";
import { listarUsuarios, cambiarEstadoUsuario } from "../datos/usuarios";

function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState(listarUsuarios());

    const cambiarEstado = (run: string) => {
        cambiarEstadoUsuario(run);
        setUsuarios(listarUsuarios());
    };

    return (
        <div className="container mt-4">

            <h1>Usuarios</h1>

            <TablaUsuarios usuarios={usuarios} alCambiarEstado={cambiarEstado} />

            <BotonEnlace ruta="/admin" texto="Volver al panel" color="secondary" />

        </div>
    );
}

export default AdminUsuarios;
