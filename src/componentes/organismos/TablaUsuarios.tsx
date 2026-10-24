import Boton from "../atomos/Boton";
import type { Usuario } from "../../datos/usuarios";

interface TablaProps {
    usuarios: Usuario[];
    alCambiarEstado: (run: string) => void;
}

function TablaUsuarios({ usuarios, alCambiarEstado }: TablaProps) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>RUN</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.run}>
                            <td>{usuario.run}</td>
                            <td>{usuario.nombre} {usuario.apellidos}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.tipo}</td>
                            <td>{usuario.estado}</td>
                            <td>
                                <Boton
                                    texto={usuario.estado === "Activo" ? "Desactivar" : "Activar"}
                                    color="outline-secondary"
                                    alHacerClick={() => alCambiarEstado(usuario.run)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaUsuarios;
