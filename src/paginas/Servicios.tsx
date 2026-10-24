import { useState } from "react";
import Buscador from "../componentes/moleculas/Buscador";
import ListaServicios from "../componentes/organismos/ListaServicios";
import { listarServicios, filtrarServicios, tiposServicio } from "../datos/servicios";

interface ServiciosProps {
    alAgregar: (codigo: string) => void;
}

function Servicios({ alAgregar }: ServiciosProps) {
    const [texto, setTexto] = useState("");
    const [tipo, setTipo] = useState("");

    const serviciosFiltrados = filtrarServicios(listarServicios(), texto, tipo);

    return (
        <div className="container mt-4">

            <h1>Servicios</h1>

            <Buscador
                texto={texto}
                tipo={tipo}
                tipos={tiposServicio}
                alCambiarTexto={setTexto}
                alCambiarTipo={setTipo}
            />

            <ListaServicios servicios={serviciosFiltrados} alAgregar={alAgregar} />

        </div>
    );
}

export default Servicios;
