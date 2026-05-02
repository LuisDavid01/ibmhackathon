import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { authClient } from "@/lib/auth-client"

export function Navbar() {

  	const navigate = useNavigate()
	const { data: session } = authClient.useSession()

	async function logout() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess() {
					navigate({ to: '/login' })
				},
			},
		})
	}
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 border-b-2 border-black ${
        scrolled ? "bg-white" : "bg-[#fff5ee]"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <img src="/logo.png" alt="TransparenciaCR" className="h-7 w-7" />
        <span className="text-xl font-black tracking-tight">TransparenciaCR</span>
      </Link>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className="text-sm font-bold hover:text-primary transition-colors"
          activeProps={{ className: "text-primary" }}
        >
          Inicio
        </Link>
        <Link
          to="/proyectos"
          className="text-sm font-bold hover:text-primary transition-colors"
          activeProps={{ className: "text-primary" }}
        >
          Proyectos
        </Link>
        <Link
          to="/denuncias"
          className="text-sm font-bold hover:text-primary transition-colors"
          activeProps={{ className: "text-primary" }}
        >
          Denuncias
        </Link>
        <Link to="/asistente" className="text-sm font-bold hover:text-primary transition-colors">
          IA Asistente
        </Link>

      </div>

      {/* CTA Button */}
      {session?.user?.id ? (
        <div className="">
      <Link to="/dashboard">
        <Button
          className="mr-3 bg-secondary text-black border-2 border-black font-bold shadow-[3px_3px_0_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
        >
          Entra a tu espacio
        </Button>
      </Link>


        <Button
        onClick={logout}
        variant={"secondary"}
          className=" text-black border-2 border-black font-bold shadow-[3px_3px_0_black] hover:shadow-none hover:bg-red-400 hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
        >
          Cierra session
        </Button>

      </div>
      ) : (
      <Link to="/login">
        <Button
          className="bg-secondary text-black border-2 border-black font-bold shadow-[3px_3px_0_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
        >
          Login
        </Button>
      </Link>
      )}
    </nav>
  )
}