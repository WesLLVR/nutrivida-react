import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import MensajeError from "../atomos/MensajeError";
import { correoValido } from "../../validaciones/validaciones";
import { iniciarSesion } from "../../api/usuarios";
import { rutaInicio } from "../../datos/sesion";
import type { Sesion } from "../../datos/sesion";

interface FormularioLoginProps {
    alIniciar: (sesion: Sesion) => void;
}

function FormularioLogin({ alIniciar }: FormularioLoginProps) {
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    const navegar = useNavigate();

    const manejarEnvio = async (e: React.SubmitEvent<HTMLFormElement>) => {
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

        setEnviando(true);
        try {
            const sesion = await iniciarSesion(correo.trim(), clave);
            setError("");
            alIniciar(sesion);
            navegar(rutaInicio(sesion.rol));
        } catch (err) {
            setError((err as Error).message);
        }
        setEnviando(false);
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

            <button type="submit" className="btn btn-success" disabled={enviando}>
                {enviando ? "Ingresando..." : "Ingresar"}
            </button>
        </form>
    );
}

export default FormularioLogin;
