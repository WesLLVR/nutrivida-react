import Boton from "../atomos/Boton";
import BotonEnlace from "../atomos/BotonEnlace";
import { formatearPrecio } from "../../datos/servicios";

interface CardProps {
    codigo: string;
    nombre: string;
    duracion: string;
    precio: number;
    imagen: string;
    alAgregar: (codigo: string) => void;
}

function CardServicio({ codigo, nombre, duracion, precio, imagen, alAgregar }: CardProps) {
    return (
        <div className="card h-100">
            <img
                src={imagen}
                className="card-img-top"
                alt={nombre}
                style={{ height: '180px', objectFit: 'cover' }}
            />

            <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                    {nombre}
                </h5>

                <p className="card-text">
                    {duracion}
                </p>

                <p className="card-text fw-bold">
                    {formatearPrecio(precio)}
                </p>

                <div className="mt-auto">
                    <BotonEnlace
                        ruta={`/servicio/${codigo}`}
                        texto="Ver detalle"
                        color="outline-success"
                    />

                    <Boton
                        texto="Agregar"
                        color="success"
                        alHacerClick={() => alAgregar(codigo)}
                    />
                </div>
            </div>
        </div>
    );
}

export default CardServicio;
