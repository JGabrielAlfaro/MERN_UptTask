import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/clienteAxios"
import {useNavigate} from 'react-router-dom'

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false);

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
        //Si id es null, es nuevo, caso contrario es editar.
        if (proyecto.id){
            await editarProyecto(proyecto)
        }else{
            await nuevoProyecto(proyecto);
        }
       

    }

    const editarProyecto = async(proyecto)=>{
        try {
            const token = localStorage.getItem('token')
            if (!token)return
 
            const config = {
                 headers: {
                     "Content-type": "application/json",
                     Authorization: `Bearer ${token}`
                 }
            }
            const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto,config)
            // console.log(data)
 
            // Sincronizar el state
            const proyectosActualizados = proyectos.map( p => p._id === data._id ? data : p )
            // console.log(proyectosActualizados)
            setProyectos(proyectosActualizados)
            

            setAlerta({
                msg: "Proyecto actualizado correctamente",
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

    const nuevoProyecto = async(proyecto)=>{
        
        try {
            const token = localStorage.getItem('token')
            if (!token)return
 
            const config = {
                 headers: {
                     "Content-type": "application/json",
                     Authorization: `Bearer ${token}`
                 }
            }
            delete proyecto?.id //elimine el campo null y no retorne el valor en null de base de datos.
            const {data} = await clienteAxios.post('/proyectos', proyecto,config)
            //  console.log(data)
            setProyectos( [...proyectos,data] ) // es como si estuvieramos consultando de nuevo a la base de datos.
            // console.log(proyectos)

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

    const eliminarProyecto = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if (!token)return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/proyectos/${id}`,config)
            //  console.log(data,{id})
            //Sincronizar el state.
            const proyectosActualizados = proyectos.filter( p => p._id !== id)
            //  console.log(proyectosActualizados)

             setProyectos(proyectosActualizados)

            setAlerta({
                msg: data.msg,
                error:false
            })

            setTimeout(()=>{
                setAlerta({})
                navigate('/proyectos')
               },3000)

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
    }

    const submitTarea = async (tarea) => {
          try {
            const token = localStorage.getItem('token')
            if (!token)return

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/tareas/',tarea, config)
            console.log(data)
          } catch (error) {
            console.log(error)
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
                        cargando,
                        eliminarProyecto,
                        modalFormularioTarea,
                        handleModalTarea,
                        submitTarea
                    }}
                > {children}
                </ProyectosContext.Provider>
        )
}

export {ProyectosProvider}

export default ProyectosContext;