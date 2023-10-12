import {BrowserRouter, Route,Routes} from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import NuevoPassword from './pages/NuevoPassword'
import OlvidePassword from './pages/OlvidePassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
          {/* PUBLICA */}
              <Route path='/' element={<AuthLayout />} >
                  <Route index element={<Login />} />  {/* Este index refiere al path='/' */}
                  <Route path="registrar" element={ <Registrar />} /> {/* No se le debe poner /, porque el path lo tiene */}
                  <Route path="olvide-password/" element={ <OlvidePassword />} />
                  <Route path="olvide-password/:token" element={ <NuevoPassword />} />
                  <Route path="confirmar/:token" element={ <ConfirmarCuenta />} />
                  NuevoPassword
              </Route>
          {/* PRIVADA */}
          {/* <Route path='/'></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
