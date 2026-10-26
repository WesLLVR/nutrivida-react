# NutriVida - Clínica Nutricional (React + Vite + TypeScript)

Proyecto de la Evaluación Parcial 2 de DSY1104 Desarrollo Fullstack II. Es la migración del sitio HTML de la Evaluación 1 a componentes de React.

Integrantes: Lucas Valderrama, Bastián González y Pedro Cid.

## Tecnologías

- React 19 con Vite
- TypeScript
- React Router (react-router-dom)
- Bootstrap 5
- Vitest, React Testing Library y jsdom

## Cómo ejecutar

```
npm install
npm run dev
```

Abrir http://localhost:5173

| Comando | Para qué sirve |
|---|---|
| `npm run dev` | Levanta el proyecto en modo desarrollo |
| `npm run build` | Revisa los tipos con TypeScript y genera la carpeta `dist` |
| `npm test` | Ejecuta las pruebas con Vitest (modo observador) |
| `npx vitest --reporter=verbose` | Ejecuta las pruebas mostrando el nombre de cada una |
| `npm run coverage` | Ejecuta las pruebas y genera el reporte de cobertura en `coverage/` |

Cuentas de prueba:

| Correo | Contraseña | Tipo |
|---|---|---|
| admin@nutrivida.cl | 1234 | Administrador |
| usuario@correo.cl | 1234 | Paciente |

## Patrón de diseño: Atomic Design

El proyecto se organiza con Atomic Design, la metodología de Brad Frost que divide la interfaz en niveles: se parte de elementos pequeños y simples que se combinan para formar componentes cada vez más grandes.

```
src/
├── componentes/
│   ├── atomos/        Boton, BotonEnlace, Input, Select, MensajeError
│   ├── moleculas/     CampoFormulario, CampoSelect, Buscador, CardServicio, CardPublicacion, FilaServicio
│   └── organismos/    Navbar, Footer, ListaServicios, TablaServicios, TablaUsuarios, TablaReserva,
│                      FormularioContacto, FormularioLogin, FormularioRegistro, FormularioServicio,
│                      FormularioPago
├── paginas/           Inicio, Nosotros, Servicios, DetalleServicio, Blog, DetalleBlog, Contacto,
│                      Login, Registro, Reserva, Pago, Boleta, Admin, AdminServicios, AdminUsuarios
├── datos/             servicios.ts, usuarios.ts, publicaciones.ts, reserva.ts, boletas.ts (datos simulados)
├── validaciones/      validaciones.ts
├── test/              pruebas unitarias
├── App.tsx            rutas, estado de la reserva y última boleta
└── main.tsx           punto de entrada (BrowserRouter y Bootstrap)
```

- **Átomos:** los elementos más pequeños de la interfaz. Por ejemplo, `Input` se usa en todos los formularios y `Boton` en tarjetas, tablas y la reserva.
- **Moléculas:** combinan dos o más átomos para cumplir una función. `CampoFormulario` = etiqueta + `Input`. `Buscador` = `Input` + `Select`. `CardServicio` = imagen + `BotonEnlace` + `Boton`.
- **Organismos:** secciones completas de la interfaz formadas por átomos y moléculas. `ListaServicios` usa `CardServicio`, `TablaServicios` usa `FilaServicio` y los formularios usan `CampoFormulario`, `CampoSelect` y `MensajeError`.
- **Páginas:** las pantallas que ve el usuario. Juntan los organismos y les entregan los datos por props.

Ejemplo de composición: la página `Servicios` usa el organismo `ListaServicios`, que repite la molécula `CardServicio`, que a su vez usa los átomos `BotonEnlace` y `Boton`.

Ejemplo de reutilización: `CardServicio` es un solo componente que muestra los 6 servicios cambiando las props, y se usa en Inicio (destacados) y en Servicios (catálogo). El átomo `Input` se reutiliza en los cinco formularios del sitio.

### Por qué se eligió

- **Reutilización:** se evita duplicar código porque los átomos y moléculas se usan en distintas partes de la aplicación.
- **Escalabilidad:** al agregar la compra simulada se reutilizaron `CampoFormulario`, `CampoSelect`, `MensajeError` y `BotonEnlace` sin crear componentes nuevos de ese nivel.
- **Mantenimiento:** un cambio en un átomo se refleja en todo el sitio. Por ejemplo, cambiar `Input` actualiza todos los campos de todos los formularios.

## Funcionalidades

| Requisito | Dónde está |
|---|---|
| Migración de páginas HTML | Cada `.html` de la Evaluación 1 es una página en `src/paginas` |
| Props tipadas | Cada componente define una `interface` o `type` para sus props |
| Estado con useState | `App.tsx` (reserva), páginas de admin, `Servicios` (filtros) y formularios |
| Formularios controlados | Contacto, Login, Registro, Pago y Servicio (admin): el valor de cada campo viene del estado |
| Validaciones | Campos obligatorios, formato de correo, RUN con dígito verificador, teléfono, largo de contraseña, formato de código, precio mayor que cero y datos de la tarjeta (16 dígitos, titular solo con letras, vencimiento MM/AA no vencido, CVV de 3 dígitos y cuotas solo en crédito). Cada error muestra su propio mensaje |
| Módulo de datos con CRUD | `src/datos/servicios.ts`: `listarServicios`, `crearServicio`, `actualizarServicio`, `eliminarServicio` |
| CRUD en la interfaz | `/admin/servicios`: tabla (leer), Nuevo servicio (crear), Editar (actualizar), Eliminar (eliminar) |
| Filtros de búsqueda | `/servicios`: por nombre y por tipo |
| React Router | Rutas en `App.tsx`, navegación con `Link` |
| Detalle con parámetro | `/servicio/:codigo` y `/blog/:id` usando `useParams()` |
| Vistas nuevas | Pago simulado y boleta ficticia, panel de administración, mantenedor de servicios y de usuarios |
| Responsividad | Columnas `col-12 col-md-6 col-lg-4`, `img-fluid`, `table-responsive` y menú con `flex-wrap` |

## Compra simulada

Desde **Mi reserva** se presiona **Ir a pagar**. En la página de pago el cliente ingresa sus datos (nombre, RUN, correo y teléfono) y los de la tarjeta (tipo, número, titular, vencimiento, CVV y cuotas si es de crédito). Si todo es válido se genera una boleta ficticia con número correlativo, detalle de servicios, neto, IVA (19 %) y total, y la reserva queda vacía.

No se realiza ningún cobro ni se conecta a una pasarela de pago. El CVV y la fecha de vencimiento no se guardan, y de la tarjeta solo se muestran los últimos 4 dígitos.

Para probar se puede usar cualquier número de 16 dígitos (por ejemplo `4111 1111 1111 1111`), una fecha futura en formato MM/AA y cualquier CVV de 3 dígitos.

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/nosotros` | Nosotros |
| `/servicios` | Catálogo con filtros |
| `/servicio/:codigo` | Detalle de servicio |
| `/blog` | Consejos |
| `/blog/:id` | Detalle de publicación |
| `/contacto` | Contacto |
| `/login` | Iniciar sesión |
| `/registro` | Crear cuenta |
| `/reserva` | Mi reserva |
| `/pago` | Pago simulado |
| `/boleta` | Boleta de la compra |
| `/admin` | Panel de administración |
| `/admin/servicios` | CRUD de servicios |
| `/admin/usuarios` | Usuarios (activar / desactivar) |

## Pruebas

30 pruebas en 18 archivos dentro de `src/test`. El detalle está en [TESTING.md](TESTING.md).
