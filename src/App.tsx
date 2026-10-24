import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Footer from './componentes/organismos/Footer'
import AdminServicios from './paginas/AdminServicios'
import { Route, Routes } from 'react-router-dom'
import Admin from './paginas/Admin'

function App() {

  return (
    <>
      <Navbar cantidadReserva={0} />

      <Routes>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Admin/servicios" element={<AdminServicios />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
