import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Footer from './componentes/organismos/Footer'
import Inicio from './paginas/Inicio'
import Nosotros from './paginas/Nosotros'
import Servicios from './paginas/Servicios'
import DetalleServicio from './paginas/DetalleServicio'
import Blog from './paginas/Blog'
import DetalleBlog from './paginas/DetalleBlog'
import Contacto from './paginas/Contacto'
import Login from './paginas/Login'
import Registro from './paginas/Registro'
import Reserva from './paginas/Reserva'
import Admin from './paginas/Admin'
import AdminServicios from './paginas/AdminServicios'
import AdminUsuarios from './paginas/AdminUsuarios'
import Pago from './paginas/Pago'
import Boleta from './paginas/Boleta'
import { agregarItem, quitarItem, contarItems } from './datos/reserva'
import type { ItemReserva } from './datos/reserva'
import type { Boleta as DatosBoleta } from './datos/boletas'

function App() {
  const [reserva, setReserva] = useState<ItemReserva[]>([])

  const [boleta, setBoleta] = useState<DatosBoleta | null>(null)

  const agregarAReserva = (codigo: string) => {
    setReserva(agregarItem(reserva, codigo))
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

  return (
    <>
      <Navbar cantidadReserva={contarItems(reserva)} />

      <Routes>

        <Route path="/" element={<Inicio alAgregar={agregarAReserva} />} />

        <Route path="/nosotros" element={<Nosotros />} />

        <Route path="/servicios" element={<Servicios alAgregar={agregarAReserva} />} />

        <Route path="/servicio/:codigo" element={<DetalleServicio alAgregar={agregarAReserva} />} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/blog/:id" element={<DetalleBlog />} />

        <Route path="/contacto" element={<Contacto />} />

        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route
          path="/reserva"
          element={<Reserva items={reserva} alQuitar={quitarDeReserva} alVaciar={vaciarReserva} />}
        />

        <Route path="/pago" element={<Pago items={reserva} alFinalizar={finalizarCompra} />} />

        <Route path="/boleta" element={<Boleta boleta={boleta} />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/admin/servicios" element={<AdminServicios />} />

        <Route path="/admin/usuarios" element={<AdminUsuarios />} />

      </Routes>

      <Footer />
    </>
  )
}

export default App
