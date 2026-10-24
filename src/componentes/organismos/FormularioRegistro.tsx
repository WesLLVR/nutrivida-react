import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import CampoSelect from "../moleculas/CampoSelect";
import MensajeError from "../atomos/MensajeError";
import { correoValido, runSinPuntos, runValido } from "../../validaciones/validaciones";
import { regiones, obtenerComunas, crearUsuario, buscarUsuarioPorRun } from "../../datos/usuarios";

function FormularioRegistro() {
    const [run, setRun] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [region, setRegion] = useState("");
    const [comuna, setComuna] = useState("");
    const [direccion, setDireccion] = useState("");
    const [error, setError] = useState("");

    const navegar = useNavigate();

    const nombresRegiones = regiones.map(r => r.nombre);

    const cambiarRegion = (valor: string) => {
        setRegion(valor);
        setComuna("");
    };

    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (run.trim() === "") {
            setError("El RUN es obligatorio");
            return;
        }
        if (!runSinPuntos(run)) {
            setError("Escriba el RUN sin puntos ni guion. Ejemplo: 190876543");
            return;
        }
        if (!runValido(run)) {
            setError("El dígito verificador del RUN no es correcto");
            return;
        }
        if (buscarUsuarioPorRun(run.trim().toUpperCase()) !== undefined) {
            setError("Ya existe una cuenta con ese RUN");
            return;
        }
        if (nombre.trim() === "") {
            setError("El nombre es obligatorio");
            return;
        }
        if (apellidos.trim() === "") {
            setError("Los apellidos son obligatorios");
            return;
        }
        if (!correoValido(correo)) {
            setError("Ingrese un correo válido");
            return;
        }
        if (clave.length < 4 || clave.length > 10) {
            setError("La contraseña debe tener entre 4 y 10 caracteres");
            return;
        }
        if (region === "") {
            setError("Seleccione una región");
            return;
        }
        if (comuna === "") {
            setError("Seleccione una comuna");
            return;
        }
        if (direccion.trim() === "") {
            setError("La dirección es obligatoria");
            return;
        }

        crearUsuario({
            run: run.trim().toUpperCase(),
            nombre: nombre.trim(),
            apellidos: apellidos.trim(),
            correo: correo.trim(),
            clave: clave,
            tipo: "Paciente",
            region: region,
            comuna: comuna,
            direccion: direccion.trim(),
            estado: "Activo"
        });

        setError("");
        alert("Cuenta creada correctamente");
        navegar("/login");
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>
            <div className="row">
                <div className="col-12 col-md-6">
                    <CampoFormulario etiqueta="RUN (sin puntos ni guion)" tipo="text" nombre="run" valor={run} alCambiar={setRun} />
                </div>
                <div className="col-12 col-md-6">
                    <CampoFormulario etiqueta="Correo" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo} />
                </div>
                <div className="col-12 col-md-6">
                    <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre} />
                </div>
                <div className="col-12 col-md-6">
                    <CampoFormulario etiqueta="Apellidos" tipo="text" nombre="apellidos" valor={apellidos} alCambiar={setApellidos} />
                </div>
                <div className="col-12 col-md-6">
                    <CampoSelect etiqueta="Región" nombre="region" valor={region} opciones={nombresRegiones} alCambiar={cambiarRegion} />
                </div>
                <div className="col-12 col-md-6">
                    <CampoSelect etiqueta="Comuna" nombre="comuna" valor={comuna} opciones={obtenerComunas(region)} alCambiar={setComuna} />
                </div>
                <div className="col-12 col-md-6">
                    <CampoFormulario etiqueta="Dirección" tipo="text" nombre="direccion" valor={direccion} alCambiar={setDireccion} />
                </div>
                <div className="col-12 col-md-6">
                    <CampoFormulario etiqueta="Contraseña" tipo="password" nombre="clave" valor={clave} alCambiar={setClave} />
                </div>
            </div>

            <MensajeError mensaje={error} />

            <button type="submit" className="btn btn-success">
                Crear cuenta
            </button>
        </form>
    );
}

export default FormularioRegistro;
