import Boton from "../atomos/Boton";
import { formatearPrecio } from "../../datos/servicios";

interface FilaProps {
    codigo: string;
    nombre: string;
    tipo: string;
    precio: number;
    alEditar: (codigo: string) => void;
    alEliminar: (codigo: string) => void;
}

function FilaServicio({ codigo, nombre, tipo, precio, alEditar, alEliminar }: FilaProps) {
    return (
        <tr>
            <td>{codigo}</td>
            <td>{nombre}</td>
            <td>{tipo}</td>
            <td>{formatearPrecio(precio)}</td>
            <td>
                <Boton
                    texto="Editar"
                    color="outline-primary"
                    alHacerClick={() => alEditar(codigo)}
                />
                <Boton
                    texto="Eliminar"
                    color="outline-danger"
                    alHacerClick={() => alEliminar(codigo)}
                />
            </td>
        </tr>
    );
}

export default FilaServicio;
