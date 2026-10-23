import { Link } from "react-router-dom";

interface NavbarProps {
    cantidadReserva: number;
}

function Navbar({ cantidadReserva }: NavbarProps) {
    return (
        <nav className="navbar navbar-dark bg-success">
            <div className="container">

                <Link className="navbar-brand" to="/">
                    NutriVida
                </Link>

                <div className="navbar-nav flex-row flex-wrap gap-3">
                    <Link className="nav-link" to="/">Inicio</Link>
                    <Link className="nav-link" to="/nosotros">Nosotros</Link>
                    <Link className="nav-link" to="/servicios">Servicios</Link>
                    <Link className="nav-link" to="/blog">Consejos</Link>
                    <Link className="nav-link" to="/contacto">Contacto</Link>
                    <Link className="nav-link" to="/login">Ingresar</Link>
                    <Link className="nav-link" to="/admin">Admin</Link>

                    <Link className="nav-link" to="/reserva">
                        Mi reserva <span className="badge bg-warning text-dark">{cantidadReserva}</span>
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
