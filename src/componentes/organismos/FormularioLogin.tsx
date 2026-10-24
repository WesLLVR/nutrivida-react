import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import MensajeError from "../atomos/MensajeError";
import { correoValido } from "../../validaciones/validaciones";
import { buscarUsuarioPorCorreo } from "../../datos/usuarios";

function FormularioLogin() {
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [error, setError] = useState("");

    const navegar = useNavigate();

    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (correo.trim() === "") {
            setError("Debe ingresar su correo");
            return;
        }
        if (!correoValido(correo)) {
            setError("Ingrese un correo válido");
            return;
        }
        if (clave.trim() === "") {
            setError("Debe ingresar su contraseña");
            return;
        }
        if (clave.length < 4 || clave.length > 10) {
            setError("La contraseña debe tener entre 4 y 10 caracteres");
            return;
        }

        const usuario = buscarUsuarioPorCorreo(correo);

        if (usuario === undefined || usuario.clave !== clave) {
            setError("El correo o la contraseña no coinciden");
            return;
        }
        if (usuario.estado === "Inactivo") {
            setError("Tu cuenta está desactivada");
            return;
        }

        setError("");
        alert("Bienvenido/a " + usuario.nombre);

        if (usuario.tipo === "Administrador") {
            navegar("/admin");
        } else {
            navegar("/");
        }
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>

            <CampoFormulario
                etiqueta="Correo electrónico"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={setCorreo}
            />

            <CampoFormulario
                etiqueta="Contraseña"
                tipo="password"
                nombre="clave"
                valor={clave}
                alCambiar={setClave}
            />

            <MensajeError mensaje={error} />

            <button type="submit" className="btn btn-success">
                Ingresar
            </button>
        </form>
    );
}

export default FormularioLogin;
