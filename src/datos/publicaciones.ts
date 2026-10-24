export interface Publicacion {
    id: number;
    titulo: string;
    fecha: string;
    autor: string;
    resumen: string;
    imagen: string;
    texto: string;
}

const publicaciones: Publicacion[] = [
    {
        id: 1,
        titulo: "Cómo leer el etiquetado nutricional",
        fecha: "20 de agosto de 2026",
        autor: "Nut. Carolina Fuentes",
        resumen: "Los sellos negros dicen mucho, pero no lo dicen todo. Te explicamos qué mirar en la etiqueta.",
        imagen: "/img/blog-1.png",
        texto: "Desde la Ley de Etiquetado, los productos con exceso de azúcares, sodio, grasas saturadas o calorías llevan un sello negro. El sello es útil, pero un producto sin sellos no es automáticamente saludable. Lo primero que conviene revisar es la lista de ingredientes, porque va ordenada de mayor a menor cantidad. Lo segundo es la porción declarada, porque muchas etiquetas informan los valores por una porción más chica de la que uno come en la práctica."
    },
    {
        id: 2,
        titulo: "Tres mitos sobre bajar de peso",
        fecha: "8 de agosto de 2026",
        autor: "Nut. Rodrigo Sepúlveda",
        resumen: "Que la fruta engorda de noche, que hay que saltarse comidas, que el pan es el enemigo. Veamos qué dice la evidencia.",
        imagen: "/img/blog-2.png",
        texto: "Primer mito: la fruta engorda si se come de noche. El cuerpo no cambia de metabolismo a las 20:00, lo que importa es el total del día. Segundo mito: saltarse comidas acelera la baja de peso. En la práctica pasa lo contrario, porque se llega con más hambre a la siguiente comida. Tercer mito: el pan es el enemigo. El pan es un alimento más y se puede ordenar dentro de la pauta."
    }
];

export function listarPublicaciones(): Publicacion[] {
    return publicaciones;
}

export function buscarPublicacion(id: number): Publicacion | undefined {
    return publicaciones.find(publicacion => publicacion.id === id);
}
