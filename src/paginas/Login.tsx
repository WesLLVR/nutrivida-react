import { Link } from "react-router-dom";
import FormularioLogin from "../componentes/organismos/FormularioLogin";
import type { Sesion } from "../datos/sesion";

interface LoginProps {
    alIniciar: (sesion: Sesion) => void;
}

function Login({ alIniciar }: LoginProps) {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="card shadow-sm p-4">
                        <h1 className="h3 mb-3">Iniciar sesión</h1>

                        <FormularioLogin alIniciar={alIniciar} />

                        <p className="mt-3 mb-0">
                            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
