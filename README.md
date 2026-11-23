# NutriVida - Frontend

Sitio web de la Clínica Nutricional NutriVida (Temuco), hecho con React, TypeScript, Vite y Bootstrap. Se conecta al backend de microservicios a través del API Gateway (`http://localhost:8080/api/v1`).

## Integrantes

- Lucas Valderrama
- Bastián González
- Pedro Cid

## Tecnologías

- React 19 con TypeScript
- Vite
- React Router
- Bootstrap 5
- Vitest y React Testing Library

## Estructura

```
src/
  api/            llamadas al backend con fetch (una por microservicio)
  componentes/
    atomos/       Boton, Input, Select, Etiqueta, ...
    moleculas/    CampoFormulario, CampoSelect, CampoArea, CardServicio
    organismos/   Navbar, Footer, formularios y tablas
  datos/          sesión, reserva, tipos y funciones de apoyo
  paginas/        una página por ruta
  rutas/          RutaProtegida (restricción por rol)
  validaciones/   validaciones de formularios
  test/           pruebas con Vitest
```

Los componentes siguen Atomic Design: átomos, moléculas, organismos y páginas.

## Sesión y roles

- Al iniciar sesión el backend entrega un token JWT. La sesión (token, nombre, correo y rol) se guarda en `localStorage`, por eso se mantiene al recargar la página.
- Al abrir la página se revisa la fecha de expiración del token. Si ya venció, la sesión se borra.
- Cada minuto se revisa cuánto le queda al token. Si quedan menos de 10 minutos se pide uno nuevo a `/auth/renovar`.
- Todas las peticiones envían el encabezado `Authorization: Bearer <token>`. Si el backend responde 401, la sesión se cierra.
- `RutaProtegida` no deja entrar sin sesión (manda a `/login`) ni con un rol que no corresponde (manda a `/sin-permiso`).
- El menú muestra solo las opciones del rol que inició sesión.
- La reserva de servicios también se guarda en `localStorage`, así no se pierde al recargar.

| Rol | Páginas |
|---|---|
| Sin sesión | Inicio, Nosotros, Servicios, Consejos, Contacto, Login, Registro, Mi reserva |
| PACIENTE | Lo anterior, Pago, Boleta, Mis citas, Mi progreso, Perfil |
| NUTRICIONISTA | Agenda, Fichas, Perfil y páginas informativas |
| ADMINISTRADOR | Panel, Servicios, Usuarios, Citas, Mensajes, Ventas, Perfil y páginas informativas |

## Ejecución

Primero se debe levantar el backend (Eureka, microservicios y gateway). Luego:

```
npm install
npm run dev
```

El sitio queda en `http://localhost:5173`. El gateway solo acepta peticiones desde ese puerto (CORS).

## Usuarios de prueba

Todos tienen la contraseña `1234`.

| Correo | Rol |
|---|---|
| admin@nutrivida.cl | ADMINISTRADOR |
| usuario@correo.cl | PACIENTE |
| carolina.fuentes@nutrivida.cl | NUTRICIONISTA |

## Pruebas

```
npm test
npm run coverage
```

El detalle de las pruebas está en `TESTING.md`.
