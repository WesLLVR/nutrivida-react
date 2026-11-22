import AreaTexto from "../atomos/AreaTexto";

type Props = {
    etiqueta: string;
    nombre: string;
    valor: string;
    alCambiar: (valor: string) => void;
};

function CampoArea({ etiqueta, nombre, valor, alCambiar }: Props) {
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={nombre}>
                {etiqueta}
            </label>

            <AreaTexto nombre={nombre} valor={valor} alCambiar={alCambiar} />
        </div>
    );
}

export default CampoArea;
