import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings } from "lucide-react"
import { signOut, useSession } from 'next-auth/react' // Importer le hook signOut
import { useRouter } from "next/navigation";
import { useToast } from '@/components/ui/use-toast'
import Drakkar from "./Drakkar";

export default function Navbar() {
  const { toast } = useToast()
  const handleSignOut = async () => {
    toast({
      title: "👋 Vous êtes déconnecté",
    })
    setTimeout(async() => {
      await signOut({ redirect: false})
    }, 1000)
  }

  const { data: session } = useSession()

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="text-lg font-semibold text-gray-800">
          <Drakkar />
        </div>
        <div className="space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-4">
              <div>{session?.user?.name}</div>
              <Settings />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5">
              <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>Se déconnecter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
