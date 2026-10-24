import BotonEnlace from "../atomos/BotonEnlace";

interface CardProps {
    id: number;
    titulo: string;
    resumen: string;
    imagen: string;
}

function CardPublicacion({ id, titulo, resumen, imagen }: CardProps) {
    return (
        <div className="card h-100">
            <img
                src={imagen}
                className="card-img-top"
                alt={titulo}
                style={{ height: '180px', objectFit: 'cover' }}
            />

            <div className="card-body">
                <h5 className="card-title">
                    {titulo}
                </h5>

                <p className="card-text">
                    {resumen}
                </p>

                <BotonEnlace
                    ruta={`/blog/${id}`}
                    texto="Leer más"
                    color="outline-success"
                />
            </div>
        </div>
    );
}

export default CardPublicacion;
