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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21l18 0" />
          <path d="M5 21v-14l8 -4v18" />
          <path d="M19 21v-10l-6 -4" />
          <path d="M9 9l0 .01" />
          <path d="M9 12l0 .01" />
          <path d="M9 15l0 .01" />
          <path d="M9 18l0 .01" />
        </svg>
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