import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import CampoSelect from "../moleculas/CampoSelect";
import MensajeError from "../atomos/MensajeError";
import {
    correoValido,
    runSinPuntos,
    runValido,
    telefonoValido,
    formatoVencimiento,
    tarjetaVencida
} from "../../validaciones/validaciones";
import type { DatosPago } from "../../datos/boletas";

interface FormularioPagoProps {
    alPagar: (datos: DatosPago) => void;
}

function FormularioPago({ alPagar }: FormularioPagoProps) {
    const [nombre, setNombre] = useState("");
    const [run, setRun] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");

    const [tipoTarjeta, setTipoTarjeta] = useState("");
    const [numeroTarjeta, setNumeroTarjeta] = useState("");
    const [titular, setTitular] = useState("");
    const [vencimiento, setVencimiento] = useState("");
    const [cvv, setCvv] = useState("");
    const [cuotas, setCuotas] = useState("");

    const [error, setError] = useState("");

    const cambiarTipo = (valor: string) => {
        setTipoTarjeta(valor);
        setCuotas("");
    };

    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nombre.trim() === "") {
            setError("Debe ingresar su nombre");
            return;
        }
        if (run.trim() === "") {
            setError("Debe ingresar su RUN");
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
        if (!correoValido(correo)) {
            setError("Ingrese un correo válido");
            return;
        }
        if (!telefonoValido(telefono)) {
            setError("El teléfono debe tener 9 dígitos y comenzar con 9");
            return;
        }
        if (tipoTarjeta === "") {
            setError("Seleccione el tipo de tarjeta");
            return;
        }
        if (numeroTarjeta.trim() === "") {
            setError("Debe ingresar el número de la tarjeta");
            return;
        }
        if (!/^[0-9]{16}$/.test(numeroTarjeta.replace(/ /g, ""))) {
            setError("El número de la tarjeta debe tener 16 dígitos");
            return;
        }
        if (titular.trim() === "") {
            setError("Debe ingresar el nombre del titular");
            return;
        }
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(titular.trim())) {
            setError("El nombre del titular solo puede tener letras");
            return;
        }
        if (vencimiento.trim() === "") {
            setError("Debe ingresar la fecha de vencimiento");
            return;
        }
        if (!formatoVencimiento(vencimiento)) {
            setError("La fecha de vencimiento debe tener el formato MM/AA");
            return;
        }
        if (tarjetaVencida(vencimiento, new Date())) {
            setError("La tarjeta está vencida");
            return;
        }
        if (!/^[0-9]{3}$/.test(cvv)) {
            setError("El CVV debe tener 3 dígitos");
            return;
        }
        if (tipoTarjeta === "Crédito" && cuotas === "") {
            setError("Seleccione la cantidad de cuotas");
            return;
        }

        setError("");

        alPagar({
            nombre: nombre.trim(),
            run: run.trim().toUpperCase(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            tipoTarjeta: tipoTarjeta,
            numeroTarjeta: numeroTarjeta,
            cuotas: tipoTarjeta === "Crédito" ? Number(cuotas) : 1
        });
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>

            <h2 className="h5">Datos del cliente</h2>

            <div className="row">
                <div className="col-12 col-md-6">
                    <CampoFormulario etiqueta="Nombre completo" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre} />
                </div>
                <div className="col-12 col-md-6">
                    <CampoFormulario etiqueta="RUN (sin puntos ni guion)" tipo="text" nombre="run" valor={run} alCambiar={setRun} />
                </div>
                <div className="col-12 col-md-6">
                    <CampoFormulario etiqueta="Correo" tipo="email" nombre="correo" valor={correo} alCambiar={setCorreo} />
                </div>
                <div className="col-12 col-md-6">
                    <CampoFormulario etiqueta="Teléfono (9 dígitos)" tipo="text" nombre="telefono" valor={telefono} alCambiar={setTelefono} />
                </div>
            </div>

            <h2 className="h5 mt-2">Datos de la tarjeta</h2>

            <div className="row">
                <div className="col-12 col-md-6">
                    <CampoSelect etiqueta="Tipo de tarjeta" nombre="tipoTarjeta" valor={tipoTarjeta} opciones={["Crédito", "Débito"]} alCambiar={cambiarTipo} />
                </div>
                <div className="col-12 col-md-6">
                    <CampoFormulario etiqueta="Número de tarjeta" tipo="text" nombre="numeroTarjeta" valor={numeroTarjeta} alCambiar={setNumeroTarjeta} />
                </div>
                <div className="col-12">
                    <CampoFormulario etiqueta="Nombre del titular" tipo="text" nombre="titular" valor={titular} alCambiar={setTitular} />
                </div>
                <div className="col-6">
                    <CampoFormulario etiqueta="Vencimiento (MM/AA)" tipo="text" nombre="vencimiento" valor={vencimiento} alCambiar={setVencimiento} />
                </div>
                <div className="col-6">
                    <CampoFormulario etiqueta="CVV" tipo="password" nombre="cvv" valor={cvv} alCambiar={setCvv} />
                </div>

                {tipoTarjeta === "Crédito" && (
                    <div className="col-12 col-md-6">
                        <CampoSelect etiqueta="Cuotas" nombre="cuotas" valor={cuotas} opciones={["1", "3", "6", "12"]} alCambiar={setCuotas} />
                    </div>
                )}
            </div>

            <MensajeError mensaje={error} />

            <button type="submit" className="btn btn-success">
                Pagar
            </button>
        </form>
    );
}

export default FormularioPago;
