type Props = {
    nombre: string;
    valor: string;
    opciones: string[];
    textoInicial: string;
    alCambiar: (valor: string) => void;
};

function Select({ nombre, valor, opciones, textoInicial, alCambiar }: Props) {
    return (
        <select
            id={nombre}
            name={nombre}
            className="form-select"
            value={valor}
            onChange={(e) => alCambiar(e.target.value)}
        >
            <option value="">{textoInicial}</option>

            {opciones.map(opcion => (
                <option key={opcion} value={opcion}>
                    {opcion}
                </option>
            ))}
        </select>
    );
}

export default Select;
