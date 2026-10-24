import { useState } from "react";
import TablaServicios from "../componentes/organismos/TablaServicios";
import FormularioServicio from "../componentes/organismos/FormularioServicio";
import Boton from "../componentes/atomos/Boton";
import BotonEnlace from "../componentes/atomos/BotonEnlace";
import {
    listarServicios,
    buscarServicio,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} from "../datos/servicios";
import type { Servicio } from "../datos/servicios";

function AdminServicios() {
    const [servicios, setServicios] = useState(listarServicios());

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [servicioEditar, setServicioEditar] = useState<Servicio | null>(null);

    const nuevo = () => {
        setServicioEditar(null);
        setMostrarFormulario(true);
    };

    const editar = (codigo: string) => {
        const servicio = buscarServicio(codigo);

        if (servicio !== undefined) {
            setServicioEditar(servicio);
            setMostrarFormulario(true);
        }
    };

    const guardar = (servicio: Servicio, esNuevo: boolean) => {
        if (esNuevo) {
            crearServicio(servicio);
            alert("Servicio creado correctamente");
        } else {
            actualizarServicio(servicio.codigo, servicio);
            alert("Servicio actualizado correctamente");
        }

        setServicios(listarServicios());
        setMostrarFormulario(false);
    };

    const eliminar = (codigo: string) => {
        if (confirm("¿Seguro que desea eliminar el servicio " + codigo + "?")) {
            eliminarServicio(codigo);
            setServicios(listarServicios());
        }
    };

    return (
        <div className="container mt-4">

            <h1>Servicios</h1>

            <div className="mb-3">
                <Boton texto="Nuevo servicio" color="success" alHacerClick={nuevo} />
                <BotonEnlace ruta="/admin" texto="Volver al panel" color="secondary" />
            </div>

            <div className="row">
                <div className={mostrarFormulario ? "col-12 col-lg-7" : "col-12"}>
                    <TablaServicios servicios={servicios} alEditar={editar} alEliminar={eliminar} />
                </div>

                {mostrarFormulario && (
                    <div className="col-12 col-lg-5">
                        <div className="card p-3">
                            <FormularioServicio
                                key={servicioEditar ? servicioEditar.codigo : "nuevo"}
                                servicioEditar={servicioEditar}
                                alGuardar={guardar}
                                alCancelar={() => setMostrarFormulario(false)}
                            />
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default AdminServicios;
