import { useState,useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import {useNavigate,useLocation } from 'react-router-dom'
const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const location = useLocation();
    const pathname = location.pathname;

    const [auth,setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate();

    useEffect(()=>{

        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            // console.log(token)
            if (!token){
                setCargando(false)
                return
            }
            // console.log("Si hay un token")
            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios('/usuarios/perfil',config)
                // console.log(data)
                setAuth(data)
                
                  const rutas = ["/", "/registrar", "/olvide-password", "/confirmar","/proyectos"];
                //  navigate(pathname)
                //  console.log(pathname)
                 if (rutas.includes(pathname)) {
                    navigate("/proyectos")
                  }
                  else {
                    navigate(pathname)
                  }
            } catch (error) {
               setAuth({})
            }
            
            setCargando(false)
            
        }
        autenticarUsuario();
    },[])

    return (

       <AuthContext.Provider
            value={{
                setAuth,
                auth,
                cargando
            }}
       >
        {children}
       </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;