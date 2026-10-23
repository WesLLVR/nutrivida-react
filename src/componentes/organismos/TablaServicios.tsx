import FilaServicio from "../moleculas/FilaServicio";
import type { Servicio } from "../../datos/servicios";

interface TablaProps {
    servicios: Servicio[];
    alEditar: (codigo: string) => void;
    alEliminar: (codigo: string) => void;
}

function TablaServicios({ servicios, alEditar, alEliminar }: TablaProps) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios.map(servicio => (
                        <FilaServicio
                            key={servicio.codigo}
                            codigo={servicio.codigo}
                            nombre={servicio.nombre}
                            tipo={servicio.tipo}
                            precio={servicio.precio}
                            alEditar={alEditar}
                            alEliminar={alEliminar}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaServicios;
