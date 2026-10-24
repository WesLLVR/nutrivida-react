import ListaServicios from "../componentes/organismos/ListaServicios";
import BotonEnlace from "../componentes/atomos/BotonEnlace";
import { listarServicios } from "../datos/servicios";

interface InicioProps {
    alAgregar: (codigo: string) => void;
}

function Inicio({ alAgregar }: InicioProps) {
    const destacados = listarServicios().filter(servicio => servicio.destacado);

    return (
        <div className="container mt-4">

            <div className="row align-items-center mb-4">
                <div className="col-12 col-md-6">
                    <h1>Bienvenido a NutriVida</h1>
                    <p>
                        Somos una clínica de nutrición y dietética de Temuco.
                        Cuatro nutricionistas atienden con planes hechos a la medida de cada persona.
                    </p>
                    <BotonEnlace ruta="/nosotros" texto="Conoce la clínica" color="success" />
                </div>

                <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <img src="/img/nosotros.png" className="img-fluid rounded" alt="Consulta nutricional" />
                </div>
            </div>

            <h2>Servicios destacados</h2>

            <ListaServicios servicios={destacados} alAgregar={alAgregar} />

        </div>
    );
}

export default Inicio;
