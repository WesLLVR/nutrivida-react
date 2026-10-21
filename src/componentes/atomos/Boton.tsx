interface BotonProps {
    texto: string;
    color: string;
    alHacerClick: () => void;
}

function Boton({ texto, color, alHacerClick }: BotonProps) {
    return (
        <button
            type="button"
            className={"btn btn-sm btn-" + color + " me-1"}
            onClick={alHacerClick}
        >
            {texto}
        </button>
    );
}

export default Boton;
