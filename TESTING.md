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
mostrarAdmin();
fireEvent.click(screen.getAllByText("Eliminar")[4]);                   // acción
expect(confirmar).toHaveBeenCalled();                                   // comprobación
expect(screen.queryByText("Antropometría completa")).toBeNull();
```

## 4. Mocks y espías utilizados

| Herramienta | Dónde | Para qué |
|---|---|---|
| `vi.fn()` | Boton, FormularioPago | Comprobar que el componente llama a la función recibida por props y con qué valor |
| `vi.spyOn(window, "alert")` | FormularioContacto, AdminServicios, App | Evitar que aparezca el alert y comprobar el mensaje de éxito |
| `vi.spyOn(window, "confirm")` | AdminServicios | Simular que el usuario acepta la eliminación |
| `vi.useFakeTimers()` y `vi.setSystemTime()` | FormularioPago | Fijar la fecha de hoy para que la validación de tarjeta vencida dé siempre el mismo resultado |
| `vi.mock(...)` | Contacto | Reemplazar el formulario para probar solo la estructura responsiva de la página |

Después de cada espía se llama a `mockRestore()` y después de fijar la fecha se llama a `vi.useRealTimers()`.

## 5. Casos evaluados

| N° | Archivo | Prueba | Tipo | Resultado |
|---|---|---|---|---|
| 1 | `datosServicios.test.ts` | listarServicios devuelve los 6 servicios iniciales | CRUD – Leer | Aprobada |
| 2 | `datosServicios.test.ts` | crearServicio agrega un servicio nuevo a la lista | CRUD – Crear | Aprobada |
| 3 | `datosServicios.test.ts` | actualizarServicio cambia los datos del servicio | CRUD – Actualizar | Aprobada |
| 4 | `datosServicios.test.ts` | eliminarServicio quita el servicio de la lista | CRUD – Eliminar | Aprobada |
| 5 | `datosServicios.test.ts` | filtrarServicios encuentra servicios por nombre | Filtro de búsqueda | Aprobada |
| 6 | `validaciones.test.ts` | correoValido acepta un correo correcto y rechaza los mal escritos | Validación | Aprobada |
| 7 | `validaciones.test.ts` | tarjetaVencida compara la fecha de la tarjeta con la fecha de hoy | Validación (pago) | Aprobada |
| 8 | `reserva.test.ts` | calcularTotal multiplica precio por cantidad | Lógica de la reserva | Aprobada |
| 9 | `boletas.test.ts` | crearBoleta arma el detalle, separa el IVA y oculta la tarjeta | Lógica de la boleta | Aprobada |
| 10 | `Boton.test.tsx` | el botón muestra su texto y llama a la función al hacer click | Propiedades y eventos | Aprobada |
| 11 | `CardServicio.test.tsx` | la tarjeta muestra los datos recibidos por props | Propiedades | Aprobada |
| 12 | `ListaServicios.test.tsx` | muestra una tarjeta por cada servicio de la lista | Listas | Aprobada |
| 13 | `ListaServicios.test.tsx` | muestra un mensaje cuando la lista está vacía | Comportamiento condicional | Aprobada |
| 14 | `FormularioContacto.test.tsx` | muestra un error cuando el nombre está vacío | Validación | Aprobada |
| 15 | `FormularioContacto.test.tsx` | con datos correctos no muestra errores y llama a alert | Validación y estado (espía) | Aprobada |
| 16 | `FormularioLogin.test.tsx` | muestra un error si la contraseña no coincide | Validación | Aprobada |
| 17 | `FormularioRegistro.test.tsx` | muestra un error cuando el dígito verificador del RUN es incorrecto | Validación | Aprobada |
| 18 | `Servicios.test.tsx` | al escribir en el buscador solo quedan los servicios que coinciden | Filtro en la interfaz | Aprobada |
| 19 | `Servicios.test.tsx` | al elegir un tipo solo se muestran servicios de ese tipo | Filtro en la interfaz | Aprobada |
| 20 | `DetalleServicio.test.tsx` | muestra el servicio que corresponde al código de la URL | Ruta con parámetro | Aprobada |
| 21 | `Reserva.test.tsx` | muestra los servicios agregados y el total | Listas y propiedades | Aprobada |
| 22 | `FormularioPago.test.tsx` | muestra un error si la tarjeta está vencida | Validación (pago, mock de fecha) | Aprobada |
| 23 | `FormularioPago.test.tsx` | el campo cuotas solo aparece con tarjeta de crédito | Comportamiento condicional | Aprobada |
| 24 | `FormularioPago.test.tsx` | con datos correctos envía los datos del pago sin el CVV | Eventos y estado (espía) | Aprobada |
| 25 | `Boleta.test.tsx` | muestra los datos de la boleta recibida por props | Propiedades | Aprobada |
| 26 | `AdminServicios.test.tsx` | CREATE: un servicio creado en el formulario aparece en la tabla | CRUD – Crear | Aprobada |
| 27 | `AdminServicios.test.tsx` | UPDATE: al editar un servicio la tabla muestra el nuevo precio | CRUD – Actualizar | Aprobada |
| 28 | `AdminServicios.test.tsx` | DELETE: al confirmar, el servicio desaparece de la tabla | CRUD – Eliminar (espía) | Aprobada |
| 29 | `Contacto.test.tsx` | debe tener las clases responsivas col-12, col-md-8 y col-lg-6 | Responsividad (mock) | Aprobada |
| 30 | `App.test.tsx` | flujo de compra: reserva, pago y boleta | Flujo completo | Aprobada |

Resumen por requisito de la rúbrica:

| Requisito | Pruebas |
|---|---|
| Renderizado y propiedades | 10, 11, 21, 25 |
| Listas con todos los elementos | 1, 12, 21 |
| Eventos | 10, 24, 30 |
| Validaciones (error solo cuando corresponde) | 6, 7, 14, 15, 16, 17, 22 |
| Comportamiento condicional | 13, 23 |
| CRUD | Crear: 2, 26. Leer: 1. Actualizar: 3, 27. Eliminar: 4, 28 |
| Filtros de búsqueda | 5, 18, 19 |
| Rutas con parámetro | 20 |
| Responsividad | 29 |
| Flujo completo (reserva, pago y boleta) | 30 |

## 6. Resultados

```
 Test Files  18 passed (18)
      Tests  30 passed (30)
```

## 7. Reporte de cobertura

Generado con `npm run coverage`. El reporte completo en HTML queda en `coverage/index.html`.

| Total | Sentencias | Ramas | Funciones | Líneas |
|---|---|---|---|---|
| Proyecto | 63,39 % | 58,93 % | 69,29 % | 63,28 % |

| Carpeta | Cobertura de líneas |
|---|---|
| (raíz) | 84,62 % |
| componentes/atomos | 100 % |
| componentes/moleculas | 88,89 % |
| componentes/organismos | 53,19 % |
| datos | 72,22 % |
| paginas | 64,38 % |
| validaciones | 87,5 % |

### Archivos incluidos y excluidos

- **Incluidos:** todos los archivos `.ts` y `.tsx` dentro de `src`.
- **Excluidos:** `src/main.tsx` (solo monta la aplicación en el navegador) y `src/test/**` (son las pruebas).

## 8. Comportamientos pendientes

Estas partes no tienen prueba o tienen cobertura parcial:

- **Páginas informativas y de navegación** (`Inicio`, `Nosotros`, `Blog`, `DetalleBlog`, `Admin`, `Login`, `Registro`): solo muestran contenido o contienen un organismo que se prueba por separado.
- **AdminUsuarios:** no se prueba el cambio de estado Activo / Inactivo.
- **FormularioPago:** se prueban la tarjeta vencida, las cuotas y el pago correcto; faltan los mensajes de campos vacíos, teléfono, número de tarjeta con menos de 16 dígitos, titular con números, formato MM/AA y CVV.
- **FormularioRegistro:** se prueba el RUN incorrecto, pero no cada campo obligatorio, la carga de comunas ni el registro completo.
- **FormularioServicio:** se prueban crear y editar; faltan los mensajes de cada campo vacío, el código con mal formato y el código repetido.
- **FormularioLogin:** se prueba la contraseña incorrecta; faltan el ingreso correcto, la cuenta desactivada y la navegación después de ingresar.
- **FormularioContacto:** faltan el correo inválido, el mensaje vacío y el límite de 500 caracteres.
- **Eliminar con confirmación cancelada:** no se prueba qué pasa si el usuario presiona Cancelar.
- **Navegación real del navegador:** no se prueba la recarga de página ni el botón Atrás. Al recargar, la reserva y la boleta se pierden porque se guardan en el estado de la aplicación.
- **Responsividad visual:** la prueba revisa que existan las clases de Bootstrap, pero no cómo se ve. Eso se revisó a mano con las herramientas de desarrollo (F12 y Ctrl + Shift + M) en celular (375 px), tablet (768 px) y computador (1280 px).

### Cobertura y calidad

Un porcentaje alto de cobertura indica que una línea se ejecutó durante las pruebas, no que su resultado se haya comprobado. Por eso cada prueba incluye al menos un `expect` con el valor esperado. Por ejemplo, `boletas.ts` tiene 100 % de líneas cubiertas y además la prueba comprueba que el neto más el IVA sea igual al total.
