import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import CampoArea from "../moleculas/CampoArea";
import MensajeError from "../atomos/MensajeError";
import { correoValido } from "../../validaciones/validaciones";
import { enviarMensaje } from "../../api/contactos";

function FormularioContacto() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const [error, setError] = useState("");

    const manejarEnvio = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nombre.trim() === "") {
            setError("Debe ingresar su nombre");
            return;
        }
        if (correo.trim() === "") {
            setError("Debe ingresar su correo");
            return;
        }
        if (!correoValido(correo)) {
            setError("Ingrese un correo válido");
            return;
        }
        if (mensaje.trim() === "") {
            setError("Debe ingresar un mensaje");
            return;
        }
        if (mensaje.length > 500) {
            setError("El mensaje no puede tener más de 500 caracteres");
            return;
        }

        try {
            await enviarMensaje(nombre.trim(), correo.trim(), mensaje.trim());
            setError("");
            alert("Gracias " + nombre + ", recibimos tu mensaje");
            setNombre("");
            setCorreo("");
            setMensaje("");
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>

            <CampoFormulario
                etiqueta="Nombre"
                tipo="text"
                nombre="nombre"
                valor={nombre}
                alCambiar={setNombre}
            />

            <CampoFormulario
                etiqueta="Correo electrónico"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={setCorreo}
            />

            <CampoArea
                etiqueta="Mensaje"
                nombre="mensaje"
                valor={mensaje}
                alCambiar={setMensaje}
            />

            <MensajeError mensaje={error} />

            <button type="submit" className="btn btn-success">
                Enviar mensaje
            </button>
        </form>
    );
}

export default FormularioContacto;
