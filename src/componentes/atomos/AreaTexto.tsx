type Props = {
    nombre: string;
    valor: string;
    alCambiar: (valor: string) => void;
};

function AreaTexto({ nombre, valor, alCambiar }: Props) {
    return (
        <textarea
            id={nombre}
            name={nombre}
            className="form-control"
            rows={3}
            value={valor}
            onChange={(e) => alCambiar(e.target.value)}
        />
    );
}

export default AreaTexto;
