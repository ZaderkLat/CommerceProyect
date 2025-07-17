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

// Removed the previous CSS-in-JS styles and applied Tailwind classes directly to the HTML elements
import Link from 'next/link'
import { ModeToggle } from "./ModeToggle"
export function NavBarLayout() {
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
          </NavigationMenu>


          <ModeToggle />
        </div>

      </div>
    </header>

  )
}