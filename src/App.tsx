import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Footer from './componentes/organismos/Footer'
import RutaProtegida from './rutas/RutaProtegida'
import Inicio from './paginas/Inicio'
import Nosotros from './paginas/Nosotros'
import Servicios from './paginas/Servicios'
import DetalleServicio from './paginas/DetalleServicio'
import Blog from './paginas/Blog'
import DetalleBlog from './paginas/DetalleBlog'
import Contacto from './paginas/Contacto'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Perfil from './paginas/Perfil'
import SinPermiso from './paginas/SinPermiso'
import NoEncontrada from './paginas/NoEncontrada'
import Reserva from './paginas/Reserva'
import Pago from './paginas/Pago'
import Boleta from './paginas/Boleta'
import MisCitas from './paginas/MisCitas'
import MiProgreso from './paginas/MiProgreso'
import Agenda from './paginas/Agenda'
import FichasPacientes from './paginas/FichasPacientes'
import Admin from './paginas/Admin'
import AdminServicios from './paginas/AdminServicios'
import AdminUsuarios from './paginas/AdminUsuarios'
import AdminCitas from './paginas/AdminCitas'
import AdminMensajes from './paginas/AdminMensajes'
import AdminVentas from './paginas/AdminVentas'
import { agregarItem, quitarItem, contarItems, guardarReserva, leerReserva } from './datos/reserva'
import type { ItemReserva } from './datos/reserva'
import type { Boleta as DatosBoleta } from './datos/boletas'
import type { Servicio } from './datos/servicios'
import { borrarSesion, guardarSesion, leerSesion, tokenPorVencer } from './datos/sesion'
import type { Sesion } from './datos/sesion'
import { renovarToken } from './api/usuarios'

const ADMIN = ["ADMINISTRADOR"]
const PACIENTE = ["PACIENTE"]
const NUTRICIONISTA = ["NUTRICIONISTA"]
const TODOS = ["ADMINISTRADOR", "NUTRICIONISTA", "PACIENTE"]

function App() {
  const [reserva, setReserva] = useState<ItemReserva[]>(leerReserva)

  const [boleta, setBoleta] = useState<DatosBoleta | null>(null)

  const [usuario, setUsuario] = useState<Sesion | null>(leerSesion)

  const navegar = useNavigate()

  useEffect(() => {
    guardarReserva(reserva)
  }, [reserva])

  useEffect(() => {
    const revisarSesion = async () => {
      const actual = leerSesion()

      if (actual === null) {
        setUsuario(null)
        return
      }

      if (tokenPorVencer(actual.token)) {
        try {
          const nueva = await renovarToken()
          guardarSesion(nueva)
          setUsuario(nueva)
        } catch {
          borrarSesion()
          setUsuario(null)
        }
      }
    }

    const intervalo = setInterval(revisarSesion, 60000)
    return () => clearInterval(intervalo)
  }, [])

  const agregarAReserva = (servicio: Servicio) => {
    setReserva(agregarItem(reserva, servicio))
    alert("Servicio agregado a tu reserva")
  }

  const quitarDeReserva = (codigo: string) => {
    setReserva(quitarItem(reserva, codigo))
  }

  const vaciarReserva = () => {
    setReserva([])
  }

  const finalizarCompra = (nuevaBoleta: DatosBoleta) => {
    setBoleta(nuevaBoleta)
    setReserva([])
  }

  const iniciarSesion = (sesion: Sesion) => {
    guardarSesion(sesion)
    setUsuario(sesion)
  }

  const cerrarSesion = () => {
    borrarSesion()
    setUsuario(null)
    navegar("/login")
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar cantidadReserva={contarItems(reserva)} usuario={usuario} alCerrarSesion={cerrarSesion} />

      <main className="flex-grow-1 py-4">
        <Routes>
          <Route path="/" element={<Inicio alAgregar={agregarAReserva} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios alAgregar={agregarAReserva} />} />
          <Route path="/servicio/:codigo" element={<DetalleServicio alAgregar={agregarAReserva} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login alIniciar={iniciarSesion} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/sin-permiso" element={<SinPermiso />} />
          <Route path="*" element={<NoEncontrada />} />
          <Route
            path="/reserva"
            element={<Reserva items={reserva} alQuitar={quitarDeReserva} alVaciar={vaciarReserva} />}
          />

          <Route path="/perfil" element={<RutaProtegida usuario={usuario} roles={TODOS}><Perfil /></RutaProtegida>} />

          <Route path="/pago" element={<RutaProtegida usuario={usuario} roles={PACIENTE}><Pago items={reserva} alFinalizar={finalizarCompra} /></RutaProtegida>} />
          <Route path="/boleta" element={<RutaProtegida usuario={usuario} roles={PACIENTE}><Boleta boleta={boleta} /></RutaProtegida>} />
          <Route path="/mis-citas" element={<RutaProtegida usuario={usuario} roles={PACIENTE}><MisCitas /></RutaProtegida>} />
          <Route path="/mi-progreso" element={<RutaProtegida usuario={usuario} roles={PACIENTE}><MiProgreso /></RutaProtegida>} />

          <Route path="/agenda" element={<RutaProtegida usuario={usuario} roles={NUTRICIONISTA}><Agenda /></RutaProtegida>} />
          <Route path="/fichas" element={<RutaProtegida usuario={usuario} roles={NUTRICIONISTA}><FichasPacientes /></RutaProtegida>} />

          <Route path="/admin" element={<RutaProtegida usuario={usuario} roles={ADMIN}><Admin /></RutaProtegida>} />
          <Route path="/admin/servicios" element={<RutaProtegida usuario={usuario} roles={ADMIN}><AdminServicios /></RutaProtegida>} />
          <Route path="/admin/usuarios" element={<RutaProtegida usuario={usuario} roles={ADMIN}><AdminUsuarios /></RutaProtegida>} />
          <Route path="/admin/citas" element={<RutaProtegida usuario={usuario} roles={ADMIN}><AdminCitas /></RutaProtegida>} />
          <Route path="/admin/mensajes" element={<RutaProtegida usuario={usuario} roles={ADMIN}><AdminMensajes /></RutaProtegida>} />
          <Route path="/admin/ventas" element={<RutaProtegida usuario={usuario} roles={ADMIN}><AdminVentas /></RutaProtegida>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
