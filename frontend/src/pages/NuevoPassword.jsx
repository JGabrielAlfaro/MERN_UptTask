


const NuevoPassword = () => {
  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">Restablece tu password y no pierdas acceso a tus {' '} 
            <span className="text-slate-700">proyectos</span>
        </h1>
    
        <form className="my-10 bg-white shadow rounded-lg p-10">

            <div className="my-5">
                  <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Escribe tu nuevo password"
                    className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                  />
            </div>

            <input 
              type="submit" 
              className="bg-sky-700 w-full mb-5 py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" 
              value="Guardar nuevo password" 
            />
        </form>

  
    </>
  )
}

export default NuevoPassword
