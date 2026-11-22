import BotonEnlace from "../componentes/atomos/BotonEnlace";

function NoEncontrada() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm p-4 text-center">
                        <h1 className="h3">Página no encontrada</h1>
                        <p>La dirección que escribiste no existe en el sitio.</p>
                        <div>
                            <BotonEnlace ruta="/" texto="Volver al inicio" color="success" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoEncontrada;
