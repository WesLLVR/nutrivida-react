import BotonEnlace from "../componentes/atomos/BotonEnlace";

function Admin() {
    return (
        <div className="container mt-4">

            <h1>Panel de administración</h1>
            <p>Desde aquí se administran los servicios y los usuarios del sitio.</p>

            <div className="row g-3">
                <div className="col-12 col-md-6">
                    <div className="card p-3">
                        <h2 className="h5">Servicios</h2>
                        <p>Crear, editar y eliminar servicios del catálogo.</p>
                        <BotonEnlace ruta="/admin/servicios" texto="Ir a servicios" color="success" />
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="card p-3">
                        <h2 className="h5">Usuarios</h2>
                        <p>Ver los usuarios y activar o desactivar cuentas.</p>
                        <BotonEnlace ruta="/admin/usuarios" texto="Ir a usuarios" color="success" />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Admin;
