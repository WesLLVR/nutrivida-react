import type { Usuario } from "../../api/usuarios";

interface TarjetaPerfilProps {
    usuario: Usuario;
}

function TarjetaPerfil({ usuario }: TarjetaPerfilProps) {
    const run = usuario.run.slice(0, -1) + "-" + usuario.run.slice(-1);

    return (
        <div className="card shadow-sm p-4">
            <h1 className="h3 mb-3">Mi perfil</h1>

            <table className="table mb-0">
                <tbody>
                    <tr>
                        <th>Nombre</th>
                        <td>{usuario.nombre} {usuario.apellidos}</td>
                    </tr>
                    <tr>
                        <th>RUN</th>
                        <td>{run}</td>
                    </tr>
                    <tr>
                        <th>Correo</th>
                        <td>{usuario.correo}</td>
                    </tr>
                    <tr>
                        <th>Rol</th>
                        <td>{usuario.rol.nombre}</td>
                    </tr>
                    <tr>
                        <th>Región</th>
                        <td>{usuario.comuna.region.nombre}</td>
                    </tr>
                    <tr>
                        <th>Comuna</th>
                        <td>{usuario.comuna.nombre}</td>
                    </tr>
                    <tr>
                        <th>Dirección</th>
                        <td>{usuario.direccion}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TarjetaPerfil;
