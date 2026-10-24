import CardPublicacion from "../componentes/moleculas/CardPublicacion";
import { listarPublicaciones } from "../datos/publicaciones";

function Blog() {
    const publicaciones = listarPublicaciones();

    return (
        <div className="container mt-4">

            <h1>Consejos</h1>

            <div className="row g-3">
                {publicaciones.map(p => (
                    <div className="col-12 col-md-6" key={p.id}>
                        <CardPublicacion
                            id={p.id}
                            titulo={p.titulo}
                            resumen={p.resumen}
                            imagen={p.imagen}
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Blog;
