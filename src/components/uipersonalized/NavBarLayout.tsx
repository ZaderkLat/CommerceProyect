'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth/sessionHandler"
// Removed the previous CSS-in-JS styles and applied Tailwind classes directly to the HTML elements
import Link from 'next/link'
import { ModeToggle } from "./ModeToggle"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { logout } from "@/lib/auth/sessionHandler"

import { useAuth } from "../providers/user-provider"

export function NavBarLayout() {

  const { user, session, loading } = useAuth()

  /*
  const [userData, setUserData] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const fetchUserData = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserData(user.email?.toString() || null);
      } else {
        setUserData(null);
      }
      setIsLoading(false);
    }
    fetchUserData();
  }, []);
*/
  const handleLogout = async () => {
    const response = await logout();
  }
  return (
    <header className="w-full border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Menú de navegación a la izquierda */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-4">
            <NavigationMenuItem className="text-lg font-semibold">
              <Link href={"/"}>Inicio</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Enlaces de usuario y controlador de tema alineados a la derecha */}
        <div className="flex items-center space-x-4">
          <NavigationMenu>
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
            ) : (
              user ? (
                <NavigationMenuList className="flex items-center space-x-4">
                  <NavigationMenuItem>
                    <Link
                      href="/login"
                      className="text-lg font-semibold hover:-translate-y-1 transition-transform duration-200 inline-block"
                    >
                      {user ? `Bienvenido, ${user.email}` : "Inicio de sesión"}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button
                      onClick={handleLogout}
                      type="button"
                      className="text-lg text-color-primary font-semibold bg-transparent hover:bg-transparent hover:-translate-y-1 transition-transform duration-200"
                    >
                      Cerrar sesión
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>

              ) : (

                <NavigationMenuList className="flex items-center space-x-4">
                  <NavigationMenuItem>
                    <Link href="/login" className="text-lg font-semibold">
                      Inicio de sesión
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/register" className="text-lg font-semibold">
                      Registrarse
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>

              )
            )}
          </NavigationMenu>
          <ModeToggle />
        </div>

      </div>
    </header>

  )
}