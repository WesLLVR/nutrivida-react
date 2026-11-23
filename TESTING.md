# Documento de testing - NutriVida

## 1. Entorno de pruebas

| Herramienta | Uso |
|---|---|
| Vitest 5 | Ejecuta las pruebas (`test`, `expect`, `vi`) |
| React Testing Library | Muestra los componentes (`render`) y los busca en pantalla (`screen`), simula acciones del usuario (`fireEvent`) |
| @testing-library/jest-dom | Agrega comparaciones como `toBeInTheDocument()`, `toHaveClass()` y `toHaveValue()` |
| jsdom | Simula el navegador (el objeto `document`) dentro de Node |
| @vitest/coverage-v8 | Genera el reporte de cobertura |

Instalación usada:

```
npm install -D vitest
npm install -D @testing-library/react @testing-library/jest-dom jsdom
npm install -D @vitest/coverage-v8
```

Configuración:

- Cada archivo de prueba de componentes parte con `// @vitest-environment jsdom` para usar el navegador simulado.
- En `vite.config.ts` se activa `globals: true` para que Testing Library limpie la pantalla después de cada prueba, y se configura la cobertura (`provider: 'v8'`, reportes `text` y `html`).
- Los componentes que usan `Link`, `useParams` o `useNavigate` se prueban dentro de `MemoryRouter`. Para probar una ruta con parámetro se usa `initialEntries` (por ejemplo `/servicio/PL003`).

## 2. Comandos

| Comando | Resultado |
|---|---|
| `npm test` | Ejecuta las pruebas y se queda esperando cambios |
| `npx vitest --reporter=verbose` | Muestra el nombre de cada prueba |
| `npx vitest run src/test/Boton.test.tsx` | Ejecuta solo un archivo de pruebas |
| `npm run coverage` | Ejecuta todas las pruebas una vez y crea la carpeta `coverage/` (abrir `coverage/index.html` en el navegador) |

## 3. Estructura de cada prueba

Todas las pruebas siguen tres pasos:

1. **Preparación:** se muestra el componente con `render` y, si hace falta, se crea un espía (`vi.fn()` o `vi.spyOn`).
2. **Acción:** se simula lo que hace el usuario con `fireEvent.change` (escribir) o `fireEvent.click` (presionar).
3. **Comprobación:** se revisa el resultado con `expect`.

Ejemplo (`AdminServicios.test.tsx`, prueba DELETE):

```tsx
const confirmar = vi.spyOn(window, "confirm").mockReturnValue(true);   // preparación
await mostrarAdmin();
fireEvent.click(screen.getAllByText("Eliminar")[4]);                   // acción
expect(confirmar).toHaveBeenCalled();                                   // comprobación
await waitFor(() => expect(eliminarServicio).toHaveBeenCalledWith(5));
```

Como las páginas ahora piden los datos al backend, en las pruebas no se llama a la API real: se reemplaza el archivo de `src/api` con `vi.mock` y se decide qué responde. Por eso esas pruebas son `async` y usan `findBy...` o `waitFor`, que esperan a que la respuesta llegue a la pantalla.

## 4. Mocks y espías utilizados

| Herramienta | Dónde | Para qué |
|---|---|---|
| `vi.fn()` | Boton, ListaServicios, FormularioPago, FormularioCita, TablaCitas, Navbar | Comprobar que el componente llama a la función recibida por props y con qué valor |
| `vi.mock("../api/...")` | Servicios, DetalleServicio, AdminServicios, FormularioLogin, FormularioContacto, App | Reemplazar las llamadas al backend por respuestas fijas, así la prueba no depende de que los microservicios estén encendidos |
| `vi.mocked(funcion).mockResolvedValue(...)` | AdminServicios, FormularioLogin | Decidir qué responde la API en cada prueba (respuesta correcta o error) |
| `vi.stubGlobal("fetch", ...)` | cliente | Revisar qué envía `peticion` al backend (URL y encabezado `Authorization`) y qué hace con un 401 |
| `vi.spyOn(window, "alert")` | FormularioContacto, AdminServicios | Evitar que aparezca el alert y comprobar el mensaje de éxito |
| `vi.spyOn(window, "confirm")` | AdminServicios | Simular que el usuario acepta la eliminación |
| `vi.useFakeTimers()` y `vi.setSystemTime()` | FormularioPago | Fijar la fecha de hoy para que la validación de tarjeta vencida dé siempre el mismo resultado |
| `localStorage` | sesion, cliente, App, reserva | Guardar una sesión de prueba con un token creado en `datosPrueba.ts` (vigente o vencido) y una reserva guardada |

Después de cada espía se llama a `mockRestore()`, después de `stubGlobal` se llama a `vi.unstubAllGlobals()` y antes de cada prueba de sesión se limpia `localStorage`.

## 5. Casos evaluados

| N° | Archivo | Prueba | Tipo | Resultado |
|---|---|---|---|---|
| 1 | `datosServicios.test.tsx` | filtrarServicios encuentra servicios por nombre sin importar mayúsculas | Filtro de búsqueda | Aprobada |
| 2 | `datosServicios.test.tsx` | filtrarServicios combina el texto con el tipo elegido | Filtro de búsqueda | Aprobada |
| 3 | `datosServicios.test.tsx` | formatearPrecio y formatearFecha muestran los datos al estilo chileno | Formato | Aprobada |
| 4 | `datosServicios.test.tsx` | imagenPorTipo entrega la foto que corresponde al tipo | Lógica | Aprobada |
| 5 | `validaciones.test.ts` | correoValido acepta un correo correcto y rechaza los mal escritos | Validación | Aprobada |
| 6 | `validaciones.test.ts` | tarjetaVencida compara la fecha de la tarjeta con la fecha de hoy | Validación (pago) | Aprobada |
| 7 | `reserva.test.ts` | calcularTotal multiplica precio por cantidad | Lógica de la reserva | Aprobada |
| 8 | `reserva.test.ts` | agregarItem suma la cantidad si el servicio ya estaba en la reserva | Lógica de la reserva | Aprobada |
| 9 | `sesion.test.ts` | la sesión guardada se mantiene al recargar mientras el token esté vigente | Sesión persistente | Aprobada |
| 10 | `sesion.test.ts` | si el token expiró, la sesión se borra y no se puede usar | Sesión / JWT | Aprobada |
| 11 | `sesion.test.ts` | tokenPorVencer avisa cuando quedan menos de 10 minutos | Renovación de token | Aprobada |
| 12 | `sesion.test.ts` | rutaInicio lleva a cada rol a su pantalla principal | Roles | Aprobada |
| 13 | `cliente.test.ts` | peticion envía el token JWT en el encabezado Authorization | Integración API (mock de fetch) | Aprobada |
| 14 | `cliente.test.ts` | si el backend responde 401 se borra la sesión y se muestra su mensaje | Integración API (mock de fetch) | Aprobada |
| 15 | `Boton.test.tsx` | el botón muestra su texto y llama a la función al hacer click | Propiedades y eventos | Aprobada |
| 16 | `CardServicio.test.tsx` | la tarjeta muestra los datos recibidos por props | Propiedades | Aprobada |
| 17 | `ListaServicios.test.tsx` | muestra una tarjeta por cada servicio y al agregar entrega el servicio completo | Listas y eventos | Aprobada |
| 18 | `ListaServicios.test.tsx` | muestra un mensaje cuando la lista está vacía | Comportamiento condicional | Aprobada |
| 19 | `Navbar.test.tsx` | el nutricionista ve su agenda y fichas, pero no el panel ni la reserva | Menú por rol | Aprobada |
| 20 | `Navbar.test.tsx` | sin sesión el menú muestra Ingresar y no muestra opciones privadas | Menú por rol | Aprobada |
| 21 | `FormularioContacto.test.tsx` | muestra un error cuando el nombre está vacío | Validación | Aprobada |
| 22 | `FormularioContacto.test.tsx` | con datos correctos envía el mensaje a la API y limpia el formulario | Integración API (vi.mock) | Aprobada |
| 23 | `FormularioLogin.test.tsx` | muestra el error que responde el backend si la contraseña no coincide | Validación (vi.mock) | Aprobada |
| 24 | `FormularioLogin.test.tsx` | con datos correctos entrega la sesión con el token al componente padre | Inicio de sesión (vi.mock) | Aprobada |
| 25 | `FormularioRegistro.test.tsx` | muestra un error cuando el dígito verificador del RUN es incorrecto | Validación | Aprobada |
| 26 | `FormularioCita.test.tsx` | no permite pedir una cita en una fecha pasada | Validación | Aprobada |
| 27 | `FormularioCita.test.tsx` | con datos correctos entrega el id del nutricionista elegido | Eventos y estado | Aprobada |
| 28 | `TablaCitas.test.tsx` | el botón Confirmar solo aparece en las citas pendientes | Comportamiento condicional | Aprobada |
| 29 | `TablaCitas.test.tsx` | si no se entrega la acción, el botón no se muestra | Comportamiento condicional | Aprobada |
| 30 | `Servicios.test.tsx` | al escribir en el buscador solo quedan los servicios que coinciden | Filtro en la interfaz (vi.mock) | Aprobada |
| 31 | `Servicios.test.tsx` | al elegir un tipo solo se muestran servicios de ese tipo | Filtro en la interfaz (vi.mock) | Aprobada |
| 32 | `DetalleServicio.test.tsx` | muestra el servicio que corresponde al código de la URL | Ruta con parámetro (vi.mock) | Aprobada |
| 33 | `Reserva.test.tsx` | muestra los servicios agregados y el total | Listas y propiedades | Aprobada |
| 34 | `FormularioPago.test.tsx` | muestra un error si la tarjeta está vencida | Validación (mock de fecha) | Aprobada |
| 35 | `FormularioPago.test.tsx` | el campo cuotas solo aparece con tarjeta de crédito | Comportamiento condicional | Aprobada |
| 36 | `FormularioPago.test.tsx` | con datos correctos envía los datos del pago sin el CVV | Eventos y estado (espía) | Aprobada |
| 37 | `Boleta.test.tsx` | muestra los datos de la boleta que entregó el backend | Propiedades | Aprobada |
| 38 | `AdminServicios.test.tsx` | CREATE: el formulario envía el servicio nuevo a la API | CRUD – Crear (vi.mock) | Aprobada |
| 39 | `AdminServicios.test.tsx` | UPDATE: al editar se envía el nuevo precio con el id del servicio | CRUD – Actualizar (vi.mock) | Aprobada |
| 40 | `AdminServicios.test.tsx` | DELETE: al confirmar se pide a la API eliminar el servicio | CRUD – Eliminar (vi.mock) | Aprobada |
| 41 | `Contacto.test.tsx` | debe tener las clases responsivas col-12, col-md-8 y col-lg-6 | Responsividad (mock) | Aprobada |
| 42 | `App.test.tsx` | sin sesión, el panel de administración redirige al login | Rutas protegidas | Aprobada |
| 43 | `App.test.tsx` | un paciente que entra a /admin ve la página de acceso restringido | Restricción por rol | Aprobada |
| 44 | `App.test.tsx` | el administrador entra al panel y ve el enlace Admin en el menú | Restricción por rol | Aprobada |
| 45 | `App.test.tsx` | la sesión guardada se recupera al recargar y muestra el nombre del usuario | Sesión persistente | Aprobada |
| 46 | `reserva.test.ts` | la reserva guardada se recupera al recargar la página | Reserva persistente | Aprobada |
| 47 | `App.test.tsx` | una dirección que no existe muestra la página no encontrada | Rutas | Aprobada |
| 48 | `citas.test.ts` | horasDeAtencion arma las horas según el horario del nutricionista | Lógica de citas | Aprobada |

Resumen por requisito:

| Requisito | Pruebas |
|---|---|
| Renderizado y propiedades | 15, 16, 33, 37 |
| Listas | 17, 33 |
| Eventos | 15, 17, 27, 36 |
| Validaciones | 5, 6, 21, 23, 25, 26, 34 |
| Horas de atención según el nutricionista | 48 |
| Comportamiento condicional | 18, 28, 29, 35 |
| CRUD contra la API | Crear: 38. Actualizar: 39. Eliminar: 40 |
| Filtros de búsqueda | 1, 2, 30, 31 |
| Ruta con parámetro | 32 |
| Ruta que no existe | 47 |
| Integración con el backend (token en cada petición, manejo de 401) | 13, 14, 22, 24 |
| Sesión que se mantiene al recargar y expira con el token | 9, 10, 11, 45 |
| Reserva que se mantiene al recargar | 46 |
| Restricción de acceso por rol | 12, 19, 20, 42, 43, 44 |
| Responsividad | 41 |

## 6. Resultados

```
 Test Files  23 passed (23)
      Tests  48 passed (48)
```

## 7. Reporte de cobertura

Generado con `npm run coverage`. El reporte completo en HTML queda en `coverage/index.html`.

| Carpeta | Cobertura de líneas |
|---|---|
| Proyecto completo | 44,72 % |
| datos | 87,09 % |
| validaciones | 87,5 % |
| api | 28 % |
| paginas | 25 % |

La cobertura bajó respecto de la entrega anterior porque se agregaron páginas nuevas (citas, fichas, agenda, mensajes y ventas) que dependen del backend. Esas pantallas se probaron conectadas a los microservicios reales, revisando cada flujo en el navegador (ver sección 8).

### Archivos incluidos y excluidos

- **Incluidos:** todos los archivos `.ts` y `.tsx` dentro de `src`.
- **Excluidos:** `src/main.tsx` (solo monta la aplicación en el navegador) y `src/test/**` (son las pruebas).

## 8. Pruebas manuales con el backend encendido

Con Eureka, los seis microservicios y el gateway corriendo, se revisó en el navegador:

| Flujo | Resultado esperado | Resultado |
|---|---|---|
| Entrar a `/admin` sin sesión | Redirige a `/login` | Correcto |
| Login como administrador | Entra a `/admin` y ve los usuarios cargados desde usuarioMS | Correcto |
| Recargar la página con sesión iniciada | Sigue con la sesión y en la misma página | Correcto |
| Paciente entra a `/admin` | Muestra "Acceso restringido" | Correcto |
| Paciente compra dos servicios | ventaMS genera la boleta con número correlativo | Correcto |
| Paciente pide una cita | Aparece en la tabla como PENDIENTE | Correcto |
| Paciente pide la misma hora otra vez | El backend responde "El nutricionista ya tiene una cita en ese horario" | Correcto |
| Nutricionista confirma la cita | Cambia a CONFIRMADA | Correcto |
| Nutricionista entra a `/admin/usuarios` | Muestra "Acceso restringido" | Correcto |
| Mensaje desde Contacto sin sesión | contactoMS lo guarda y aparece en Admin > Mensajes | Correcto |

## 9. Comportamientos pendientes

- **Páginas que dependen del backend** (`MisCitas`, `MiProgreso`, `Agenda`, `FichasPacientes`, `AdminCitas`, `AdminMensajes`, `AdminVentas`, `AdminUsuarios`): se revisaron a mano con el backend encendido, pero no tienen prueba automática.
- **Renovación automática del token:** se prueba la función `tokenPorVencer`, pero no el intervalo de `App.tsx` que llama a `/auth/renovar`.
- **FormularioRegistro, FormularioUsuario y FormularioFicha:** faltan pruebas de cada campo obligatorio.
