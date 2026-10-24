import { useParams } from "react-router-dom";
import BotonEnlace from "../componentes/atomos/BotonEnlace";
import { buscarPublicacion } from "../datos/publicaciones";

function DetalleBlog() {
    const { id } = useParams();

    const publicacion = buscarPublicacion(Number(id));

    if (publicacion === undefined) {
        return (
            <div className="container mt-4">
                <p>No encontramos esa publicación.</p>
                <BotonEnlace ruta="/blog" texto="Volver" color="secondary" />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12 col-lg-8">
                    <h1 className="h3">{publicacion.titulo}</h1>
                    <p className="text-muted">{publicacion.fecha} - {publicacion.autor}</p>
                    <img src={publicacion.imagen} className="img-fluid rounded mb-3" alt={publicacion.titulo} />
                    <p>{publicacion.texto}</p>

                    <BotonEnlace ruta="/blog" texto="Volver a Consejos" color="secondary" />
                </div>
            </div>
        </div>
    );
}

export default DetalleBlog;
