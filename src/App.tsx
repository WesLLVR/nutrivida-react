import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Footer from './componentes/organismos/Footer'
import AdminServicios from './paginas/AdminServicios'
import { Route, Routes } from 'react-router-dom'
import Admin from './paginas/Admin'
import Login from './paginas/Login' 
import Registro from './paginas/Registro'
import Inicio from './paginas/Inicio'
import Nosotros from './paginas/Nosotros'
import Servicios from './paginas/Servicios'
import DetalleServicio from './paginas/DetalleServicio'
import Contacto from './paginas/Contacto'

function App() {

  const agregarAReserva = (codigo: string) => {
    alert("Servicio " + codigo + " agregado a tu reserva")
  }

  return (
    <>
      <Navbar cantidadReserva={0} />

      <Routes>
        <Route path="/" element={<Inicio alAgregar={agregarAReserva} />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios alAgregar={agregarAReserva} />} />
        <Route path="/servicio/:codigo" element={<DetalleServicio alAgregar={agregarAReserva} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Admin/servicios" element={<AdminServicios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
