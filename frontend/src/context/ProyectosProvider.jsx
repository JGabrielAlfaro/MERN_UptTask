import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"
import {useNavigate} from 'react-router-dom'

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();
    
    useEffect(()=>{
        const obtenerProyecto = async () => {
           try {
                    
                    const token = localStorage.getItem('token')
                    if (!token)return
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const {data} = await clienteAxios.get('/proyectos',config)
                    setProyectos(data)
           } catch (error) {
                console.log(error)
           } 
        }
        obtenerProyecto();
    },[ ])

    const mostrarAlerta = (alerta) => {
        setAlerta(alerta)

        setTimeout(()=>{
            setAlerta({})
        },5000)
    }

    const submitProyecto = async (proyecto) => {
        try {
           const token = localStorage.getItem('token')
           if (!token)return

           const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
           }
           const {data} = await clienteAxios.post('/proyectos', proyecto,config)
        //    console.log(data)

        setProyectos([...proyectos,data]) // es como si estuvieramos consultando de nuevo a la base de datos.

           setAlerta({
             msg: "Proyecto creado correctamente",
             error: false
           })



           setTimeout(()=>{
            setAlerta({})
            navigate('/proyectos')
           },3000)
        } catch (error) {
            console.log(error)
        }

    }

    const obtenerProyecto = async (id) => {

      setCargando(true)
       try {
            const token = localStorage.getItem('token')
            if (!token)return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.get(`/proyectos/${id}`,config)
            setProyecto(data)
       } catch (error) {
        console.log(error)
       }finally{
            setCargando(false)
       }
       
    }

    return (
                <ProyectosContext.Provider
                    value={{
                        proyectos,
                        mostrarAlerta,
                        alerta,
                        submitProyecto,
                        obtenerProyecto,
                        proyecto,
                        cargando
                    }}
                > {children}
                </ProyectosContext.Provider>
        )
}

export {ProyectosProvider}

export default ProyectosContext;