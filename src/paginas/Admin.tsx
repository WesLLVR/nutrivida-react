import BotonEnlace from "../componentes/atomos/BotonEnlace";

function Admin() {
    const secciones = [
        { titulo: "Servicios", texto: "Crear, editar y eliminar servicios del catálogo.", ruta: "/admin/servicios" },
        { titulo: "Usuarios", texto: "Crear, editar, desactivar usuarios y asignar roles.", ruta: "/admin/usuarios" },
        { titulo: "Citas", texto: "Ver todas las citas y confirmarlas o cancelarlas.", ruta: "/admin/citas" },
        { titulo: "Mensajes", texto: "Leer los mensajes del formulario de contacto.", ruta: "/admin/mensajes" },
        { titulo: "Ventas", texto: "Revisar las boletas y anular ventas.", ruta: "/admin/ventas" }
    ];

    return (
        <div className="container">

            <h1>Panel de administración</h1>
            <p>Solo el administrador puede ver esta sección.</p>

            <div className="row g-3">
                {secciones.map(seccion => (
                    <div className="col-12 col-md-6 col-lg-4" key={seccion.ruta}>
                        <div className="card h-100 p-3">
                            <h2 className="h5">{seccion.titulo}</h2>
                            <p>{seccion.texto}</p>
                            <div className="mt-auto">
                                <BotonEnlace ruta={seccion.ruta} texto={"Ir a " + seccion.titulo.toLowerCase()} color="success" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Admin;
