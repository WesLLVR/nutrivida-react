import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { Sesion } from "../datos/sesion";

interface RutaProtegidaProps {
    usuario: Sesion | null;
    roles: string[];
    children: ReactNode;
}

function RutaProtegida({ usuario, roles, children }: RutaProtegidaProps) {
    if (usuario === null) {
        return <Navigate to="/login" />;
    }

    if (!roles.includes(usuario.rol)) {
        return <Navigate to="/sin-permiso" />;
    }

    return <>{children}</>;
}

export default RutaProtegida;
