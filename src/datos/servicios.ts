export interface Servicio {
    codigo: string;
    tipo: string;
    nombre: string;
    duracion: string;
    modalidad: string;
    precio: number;
    descripcion: string;
    imagen: string;
    destacado: boolean;
}

export const tiposServicio = ["Consulta", "Plan", "Evaluación", "Taller"];

let servicios: Servicio[] = [
    {
        codigo: "CN001",
        tipo: "Consulta",
        nombre: "Primera consulta nutricional",
        duracion: "50 min",
        modalidad: "Presencial",
        precio: 35000,
        descripcion: "Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio.",
        imagen: "/img/servicio-consulta.png",
        destacado: true
    },
    {
        codigo: "CN002",
        tipo: "Consulta",
        nombre: "Control nutricional",
        duracion: "30 min",
        modalidad: "Presencial",
        precio: 25000,
        descripcion: "Seguimiento mensual: se miden los indicadores y se ajusta el plan vigente.",
        imagen: "/img/servicio-consulta.png",
        destacado: false
    },
    {
        codigo: "PL001",
        tipo: "Plan",
        nombre: "Plan pérdida de peso (1 mes)",
        duracion: "1 mes",
        modalidad: "Presencial",
        precio: 65000,
        descripcion: "Primera consulta, un control quincenal, plan personalizado y seguimiento entre sesiones.",
        imagen: "/img/servicio-plan.png",
        destacado: true
    },
    {
        codigo: "PL003",
        tipo: "Plan",
        nombre: "Plan nutrición deportiva",
        duracion: "1 mes",
        modalidad: "Presencial",
        precio: 70000,
        descripcion: "Para quienes entrenan seguido. Incluye cálculo de requerimientos energéticos y proteicos.",
        imagen: "/img/servicio-plan.png",
        destacado: false
    },
    {
        codigo: "EV001",
        tipo: "Evaluación",
        nombre: "Antropometría completa",
        duracion: "20 min",
        modalidad: "Presencial",
        precio: 18000,
        descripcion: "Peso, talla, IMC, circunferencias y porcentaje de grasa corporal.",
        imagen: "/img/servicio-evaluacion.png",
        destacado: false
    },
    {
        codigo: "TG001",
        tipo: "Taller",
        nombre: "Taller de alimentación saludable",
        duracion: "90 min",
        modalidad: "Grupal",
        precio: 15000,
        descripcion: "Alimentación equilibrada y lectura de etiquetas. Máximo 10 personas.",
        imagen: "/img/servicio-taller.png",
        destacado: true
    }
];

export function listarServicios(): Servicio[] {
    return [...servicios];
}

export function buscarServicio(codigo: string): Servicio | undefined {
    return servicios.find(servicio => servicio.codigo === codigo);
}

export function crearServicio(nuevo: Servicio): void {
    servicios.push(nuevo);
}

export function actualizarServicio(codigo: string, datos: Servicio): void {
    for (let i = 0; i < servicios.length; i++) {
        if (servicios[i].codigo === codigo) {
            servicios[i] = datos;
        }
    }
}

export function eliminarServicio(codigo: string): void {
    servicios = servicios.filter(servicio => servicio.codigo !== codigo);
}

export function filtrarServicios(lista: Servicio[], texto: string, tipo: string): Servicio[] {
    return lista.filter(servicio => {
        const coincideNombre = servicio.nombre.toLowerCase().includes(texto.trim().toLowerCase());
        const coincideTipo = tipo === "" || servicio.tipo === tipo;
        return coincideNombre && coincideTipo;
    });
}

export function formatearPrecio(valor: number): string {
    return "$" + valor.toLocaleString("es-CL");
}

export function imagenPorTipo(tipo: string): string {
    if (tipo === "Plan") {
        return "/img/servicio-plan.png";
    }
    if (tipo === "Evaluación") {
        return "/img/servicio-evaluacion.png";
    }
    if (tipo === "Taller") {
        return "/img/servicio-taller.png";
    }
    return "/img/servicio-consulta.png";
}
