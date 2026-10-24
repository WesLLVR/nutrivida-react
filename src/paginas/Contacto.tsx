import FormularioContacto from "../componentes/organismos/FormularioContacto";

function Contacto() {
    return (
        <div className="container mt-4">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <div className="card shadow-sm p-4">
                        <h1 className="h3 mb-3">Contacto</h1>
                        <p>Atención de lunes a viernes de 08:00 a 19:00 y sábado de 09:00 a 14:00.</p>

                        <FormularioContacto />
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Contacto;
