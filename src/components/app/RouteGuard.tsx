import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState, ReactNode } from 'react'

interface RouteGuardProps {
  children: ReactNode
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const [isSessionValid, setIsSessionValid] = useState<boolean | null>(null)

  useEffect(() => {
    if (status === 'loading') {
      // Si la session est en cours de chargement, ne pas effectuer de redirection ni d'affichage pour l'instant
      return
    }

    if (session?.expires) {
      const currentDate = new Date()
      const sessionExpires = new Date(session.expires)

      if (currentDate >= sessionExpires) {
        // Session expirée
        toast({
          title: "Il semblerait que vous ne soyez pas connecté",
          description: "Votre session a expiré. Veuillez vous reconnecter.",
        })
        router.push('/')
        setIsSessionValid(false)
      } else {
        // Session valide
        setIsSessionValid(true)
      }
    } else {
      // Pas de date d'expiration disponible
      setIsSessionValid(false)
      toast({
        title: "Il semblerait que vous ne soyez pas connecté",
        description: "Votre session a expiré. Veuillez vous reconnecter.",
      })
      router.push('/')
    }
  }, [session, status, router, toast])

  // Affiche un écran de chargement ou rien pendant que la redirection est en cours
  if (status === 'loading' || isSessionValid === null) {
    return <div>Loading...</div>
  }

  return isSessionValid ? <>{children}</> : null
}
