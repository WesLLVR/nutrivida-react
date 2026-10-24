function Nosotros() {
    const nutricionistas = [
        { nombre: "Nut. Carolina Fuentes", area: "Obesidad y síndrome metabólico" },
        { nombre: "Nut. Rodrigo Sepúlveda", area: "Nutrición deportiva" },
        { nombre: "Nut. Daniela Morales", area: "Alimentación vegetariana y vegana" },
        { nombre: "Nut. Felipe Araya", area: "Nutrición pediátrica y familiar" }
    ];

    return (
        <div className="container mt-4">

            <h1>Nosotros</h1>

            <p>
                NutriVida abrió en 2016 en Temuco. Hoy somos cuatro nutricionistas y atendemos
                alrededor de sesenta pacientes por semana.
            </p>

            <h2 className="h4 mt-4">Nuestros nutricionistas</h2>

            <ul className="list-group mb-4">
                {nutricionistas.map(n => (
                    <li className="list-group-item" key={n.nombre}>
                        <strong>{n.nombre}</strong> - {n.area}
                    </li>
                ))}
            </ul>

            <h2 className="h4">Video de la clínica</h2>

            <div className="row">
                <div className="col-12 col-md-8 col-lg-6">
                    <video className="w-100" controls poster="/video/portada-video.jpg">
                        <source src="/video/nutrivida-presentacion.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            <p className="text-muted small mt-3">
                Sitio desarrollado por Lucas Valderrama, Bastián González y Pedro Cid.
            </p>

        </div>
    );
}

export default Nosotros;
