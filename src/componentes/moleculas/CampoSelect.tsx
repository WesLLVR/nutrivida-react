import Select from "../atomos/Select";

type Props = {
    etiqueta: string;
    nombre: string;
    valor: string;
    opciones: string[];
    alCambiar: (valor: string) => void;
};

function CampoSelect({ etiqueta, nombre, valor, opciones, alCambiar }: Props) {
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={nombre}>
                {etiqueta}
            </label>

            <Select
                nombre={nombre}
                valor={valor}
                opciones={opciones}
                textoInicial="Seleccione una opción"
                alCambiar={alCambiar}
            />
        </div>
    );
}

export default CampoSelect;
