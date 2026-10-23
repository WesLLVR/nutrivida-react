import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import CampoSelect from "../moleculas/CampoSelect";
import MensajeError from "../atomos/MensajeError";
import { buscarServicio, imagenPorTipo, tiposServicio } from "../../datos/servicios";
import type { Servicio } from "../../datos/servicios";

interface FormularioServicioProps {
    servicioEditar: Servicio | null;
    alGuardar: (servicio: Servicio, esNuevo: boolean) => void;
    alCancelar: () => void;
}

function FormularioServicio({ servicioEditar, alGuardar, alCancelar }: FormularioServicioProps) {
    const esNuevo = servicioEditar === null;

    const [codigo, setCodigo] = useState(servicioEditar ? servicioEditar.codigo : "");
    const [nombre, setNombre] = useState(servicioEditar ? servicioEditar.nombre : "");
    const [tipo, setTipo] = useState(servicioEditar ? servicioEditar.tipo : "");
    const [duracion, setDuracion] = useState(servicioEditar ? servicioEditar.duracion : "");
    const [modalidad, setModalidad] = useState(servicioEditar ? servicioEditar.modalidad : "");
    const [precio, setPrecio] = useState(servicioEditar ? String(servicioEditar.precio) : "");
    const [descripcion, setDescripcion] = useState(servicioEditar ? servicioEditar.descripcion : "");
    const [error, setError] = useState("");

    const manejarEnvio = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (codigo.trim() === "") {
            setError("El código es obligatorio");
            return;
        }
        if (!/^[A-Za-z]{2,3}[0-9]{3}$/.test(codigo.trim())) {
            setError("El código debe tener 2 o 3 letras y 3 números. Ejemplo: CN001");
            return;
        }
        if (esNuevo && buscarServicio(codigo.trim().toUpperCase()) !== undefined) {
            setError("Ya existe un servicio con ese código");
            return;
        }
        if (nombre.trim() === "") {
            setError("El nombre es obligatorio");
            return;
        }
        if (tipo === "") {
            setError("Seleccione el tipo de servicio");
            return;
        }
        if (duracion.trim() === "") {
            setError("La duración es obligatoria");
            return;
        }
        if (modalidad === "") {
            setError("Seleccione la modalidad");
            return;
        }
        if (precio.trim() === "" || isNaN(Number(precio)) || Number(precio) <= 0) {
            setError("El precio debe ser un número mayor que cero");
            return;
        }
        if (descripcion.trim() === "") {
            setError("La descripción es obligatoria");
            return;
        }

        setError("");

        alGuardar({
            codigo: codigo.trim().toUpperCase(),
            nombre: nombre.trim(),
            tipo: tipo,
            duracion: duracion.trim(),
            modalidad: modalidad,
            precio: Number(precio),
            descripcion: descripcion.trim(),
            imagen: imagenPorTipo(tipo),
            destacado: servicioEditar ? servicioEditar.destacado : false
        }, esNuevo);
    };

    return (
        <form onSubmit={manejarEnvio} noValidate>
            <h2 className="h5">{esNuevo ? "Nuevo servicio" : "Editar servicio"}</h2>

            {esNuevo ? (
                <CampoFormulario etiqueta="Código" tipo="text" nombre="codigo" valor={codigo} alCambiar={setCodigo} />
            ) : (
                <p>Código: <strong>{codigo}</strong></p>
            )}

            <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={nombre} alCambiar={setNombre} />
            <CampoSelect etiqueta="Tipo" nombre="tipo" valor={tipo} opciones={tiposServicio} alCambiar={setTipo} />
            <CampoFormulario etiqueta="Duración" tipo="text" nombre="duracion" valor={duracion} alCambiar={setDuracion} />
            <CampoSelect etiqueta="Modalidad" nombre="modalidad" valor={modalidad} opciones={["Presencial", "Grupal", "Online"]} alCambiar={setModalidad} />
            <CampoFormulario etiqueta="Precio" tipo="number" nombre="precio" valor={precio} alCambiar={setPrecio} />
            <CampoFormulario etiqueta="Descripción" tipo="text" nombre="descripcion" valor={descripcion} alCambiar={setDescripcion} />

            <MensajeError mensaje={error} />

            <button type="submit" className="btn btn-success me-2">
                Guardar
            </button>

            <button type="button" className="btn btn-secondary" onClick={alCancelar}>
                Cancelar
            </button>
        </form>
    );
}

export default FormularioServicio;
