import { useState } from "react";
import { Link } from "react-router-dom";
import { tieneRol } from "../../datos/sesion";
import type { Sesion } from "../../datos/sesion";

interface NavbarProps {
    cantidadReserva: number;
    usuario: Sesion | null;
    alCerrarSesion: () => void;
}

function Navbar({ cantidadReserva, usuario, alCerrarSesion }: NavbarProps) {
    const [abierto, setAbierto] = useState(false);

    const puedeReservar = usuario === null || tieneRol(usuario, ["PACIENTE"]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container">

                <Link className="navbar-brand" to="/">
                    NutriVida
                </Link>

                <button
                    type="button"
                    className="navbar-toggler"
                    aria-label="Abrir menú"
                    onClick={() => setAbierto(!abierto)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={"collapse navbar-collapse" + (abierto ? " show" : "")} onClick={() => setAbierto(false)}>
                    <div className="navbar-nav ms-auto align-items-lg-center">
                        <Link className="nav-link" to="/">Inicio</Link>
                        <Link className="nav-link" to="/nosotros">Nosotros</Link>
                        <Link className="nav-link" to="/servicios">Servicios</Link>
                        <Link className="nav-link" to="/blog">Consejos</Link>
                        <Link className="nav-link" to="/contacto">Contacto</Link>

                        {tieneRol(usuario, ["PACIENTE"]) && (
                            <>
                                <Link className="nav-link" to="/mis-citas">Mis citas</Link>
                                <Link className="nav-link" to="/mi-progreso">Mi progreso</Link>
                            </>
                        )}

                        {tieneRol(usuario, ["NUTRICIONISTA"]) && (
                            <>
                                <Link className="nav-link" to="/agenda">Agenda</Link>
                                <Link className="nav-link" to="/fichas">Fichas</Link>
                            </>
                        )}

                        {tieneRol(usuario, ["ADMINISTRADOR"]) && (
                            <Link className="nav-link" to="/admin">Admin</Link>
                        )}

                        {puedeReservar && (
                            <Link className="nav-link" to="/reserva">
                                Mi reserva <span className="badge bg-warning text-dark">{cantidadReserva}</span>
                            </Link>
                        )}

                        {usuario === null ? (
                            <Link className="nav-link" to="/login">Ingresar</Link>
                        ) : (
                            <>
                                <Link className="nav-link" to="/perfil">Hola, {usuario.nombre}</Link>
                                <button type="button" className="btn btn-outline-light btn-sm ms-lg-2 mt-2 mt-lg-0" onClick={alCerrarSesion}>
                                    Salir
                                </button>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
