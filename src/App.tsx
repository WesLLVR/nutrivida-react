import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Footer from './componentes/organismos/Footer'
import AdminServicios from './paginas/AdminServicios'
import { Route, Routes } from 'react-router-dom'
import Admin from './paginas/Admin'
import Login from './paginas/Login' 
import Registro from './paginas/Registro'

function App() {

  return (
    <>
      <Navbar cantidadReserva={0} />

      <Routes>
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
