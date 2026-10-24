import FormularioRegistro from "../componentes/organismos/FormularioRegistro";

function Registro() {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="card shadow-sm p-4">
                        <h1 className="h3 mb-3">Crear cuenta</h1>

                        <FormularioRegistro />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registro;
