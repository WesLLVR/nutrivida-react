import BotonEnlace from "../componentes/atomos/BotonEnlace";

function SinPermiso() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm p-4 text-center">
                        <h1 className="h3">Acceso restringido</h1>
                        <p>Tu cuenta no tiene permiso para ver esta página.</p>
                        <div>
                            <BotonEnlace ruta="/" texto="Volver al inicio" color="success" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinPermiso;
