interface MensajeErrorProps {
    mensaje: string;
}

function MensajeError({ mensaje }: MensajeErrorProps) {
    if (mensaje === "") {
        return null;
    }

    return (
        <div className="alert alert-danger py-2" role="alert">
            {mensaje}
        </div>
    );
}

export default MensajeError;
