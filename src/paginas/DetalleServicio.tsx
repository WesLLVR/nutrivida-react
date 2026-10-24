import { useParams } from "react-router-dom";
import Boton from "../componentes/atomos/Boton";
import BotonEnlace from "../componentes/atomos/BotonEnlace";
import { buscarServicio, formatearPrecio } from "../datos/servicios";

interface DetalleProps {
    alAgregar: (codigo: string) => void;
}

function DetalleServicio({ alAgregar }: DetalleProps) {
    const { codigo } = useParams();

    const servicio = buscarServicio(String(codigo));

    if (servicio === undefined) {
        return (
            <div className="container mt-4">
                <p>No encontramos ese servicio.</p>
                <BotonEnlace ruta="/servicios" texto="Volver a servicios" color="secondary" />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">

                <div className="col-12 col-md-6 mb-3">
                    <img src={servicio.imagen} className="img-fluid rounded" alt={servicio.nombre} />
                </div>

                <div className="col-12 col-md-6">
                    <h1 className="h3">{servicio.nombre}</h1>
                    <p className="text-muted">{servicio.tipo}</p>
                    <p>{servicio.descripcion}</p>

                    <ul>
                        <li>Código: {servicio.codigo}</li>
                        <li>Duración: {servicio.duracion}</li>
                        <li>Modalidad: {servicio.modalidad}</li>
                        <li>Valor: {formatearPrecio(servicio.precio)}</li>
                    </ul>

                    <Boton texto="Agregar a mi reserva" color="success" alHacerClick={() => alAgregar(servicio.codigo)} />
                    <BotonEnlace ruta="/servicios" texto="Volver" color="secondary" />
                </div>

            </div>
        </div>
    );
}

export default DetalleServicio;
