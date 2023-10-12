import { Link } from "react-router-dom"

const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y admnistra tus {' '} 
          <span className="text-slate-700">proyectos</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
          <div className="my-5">
                <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                />
          </div>

          <div className="my-5">
                <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password de Registro"
                  className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                />
          </div>

          <input 
            type="submit" 
            className="bg-sky-700 w-full mb-5 py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" 
            value="Iniciar Sesión" 
          />
      </form>

      <nav className="lg:flex lg:justify-between">
            <Link
              className="block text-center my-5 text-slate-500 uppercase text-sm"
              to="/registrar"
            >
            ¿No tienes una cuenta? Registrate.
            </Link>

            <Link
              className="block text-center my-5 text-slate-500 uppercase text-sm"
              to="/olvide-password"
            >
            Olvide mi password
            </Link>
      </nav>

    </>
  )
}
export default Login
