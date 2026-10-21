type Props = {
    tipo: string;
    nombre: string;
    valor: string;
    alCambiar: (valor: string) => void;
};

function Input({ tipo, nombre, valor, alCambiar }: Props) {
    return (
        <input
            type={tipo}
            id={nombre}
            name={nombre}
            className="form-control"
            value={valor}
            onChange={(e) => alCambiar(e.target.value)}
        />
    );
}

export default Input;
