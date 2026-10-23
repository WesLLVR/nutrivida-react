import Input from "../atomos/Input";
import Select from "../atomos/Select";

type Props = {
    texto: string;
    tipo: string;
    tipos: string[];
    alCambiarTexto: (valor: string) => void;
    alCambiarTipo: (valor: string) => void;
};

function Buscador({ texto, tipo, tipos, alCambiarTexto, alCambiarTipo }: Props) {
    return (
        <div className="row g-2 mb-4">
            <div className="col-12 col-md-8">
                <label className="form-label" htmlFor="buscar">Buscar por nombre</label>
                <Input
                    tipo="text"
                    nombre="buscar"
                    valor={texto}
                    alCambiar={alCambiarTexto}
                />
            </div>

            <div className="col-12 col-md-4">
                <label className="form-label" htmlFor="filtroTipo">Tipo</label>
                <Select
                    nombre="filtroTipo"
                    valor={tipo}
                    opciones={tipos}
                    textoInicial="Todos"
                    alCambiar={alCambiarTipo}
                />
            </div>
        </div>
    );
}

export default Buscador;
