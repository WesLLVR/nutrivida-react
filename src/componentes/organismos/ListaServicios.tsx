import CardServicio from "../moleculas/CardServicio";
import type { Servicio } from "../../datos/servicios";

interface ListaProps {
    servicios: Servicio[];
    alAgregar: (codigo: string) => void;
}

function ListaServicios({ servicios, alAgregar }: ListaProps) {
    if (servicios.length === 0) {
        return <p>No se encontraron servicios.</p>;
    }

    return (
        <div className="row g-3">
            {servicios.map(servicio => (
                <div className="col-12 col-md-6 col-lg-4" key={servicio.codigo}>
                    <CardServicio
                        codigo={servicio.codigo}
                        nombre={servicio.nombre}
                        duracion={servicio.duracion}
                        precio={servicio.precio}
                        imagen={servicio.imagen}
                        alAgregar={alAgregar}
                    />
                </div>
            ))}
        </div>
    );
}

export default ListaServicios;
