import { Link } from "react-router-dom";

interface BotonEnlaceProps {
    ruta: string;
    texto: string;
    color: string;
}

function BotonEnlace({ ruta, texto, color }: BotonEnlaceProps) {
    return (
        <Link
            to={ruta}
            className={"btn btn-" + color + " me-1"}
        >
            {texto}
        </Link>
    );
}

export default BotonEnlace;
