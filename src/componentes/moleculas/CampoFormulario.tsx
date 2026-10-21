import Input from "../atomos/Input";

type Props = {
    etiqueta: string;
    tipo: string;
    nombre: string;
    valor: string;
    alCambiar: (valor: string) => void;
};

function CampoFormulario({ etiqueta, tipo, nombre, valor, alCambiar }: Props) {
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={nombre}>
                {etiqueta}
            </label>

            <Input
                tipo={tipo}
                nombre={nombre}
                valor={valor}
                alCambiar={alCambiar}
            />
        </div>
    );
}

export default CampoFormulario;
