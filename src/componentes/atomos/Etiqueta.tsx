interface EtiquetaProps {
    texto: string;
    color: string;
}

function Etiqueta({ texto, color }: EtiquetaProps) {
    return (
        <span className={"badge text-bg-" + color}>
            {texto}
        </span>
    );
}

export default Etiqueta;
