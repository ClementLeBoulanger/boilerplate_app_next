'use client'

import { useRouter } from 'next/navigation'; // Importer useRouter
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Drakkar from '@/components/Drakkar';

export default function Home() {
  const router = useRouter()

  const handleOnButtonClick = (path : string) => {
    router.push(`/auth/${path}`)
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%'
      }}>
        <Card className="w-[500px] px-5 py-5">
          <CardHeader className="flex justify-center mb-10">
            <Drakkar />
          </CardHeader>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            paddingInline: '5rem'
          }}>
            <Button
              onClick={() => handleOnButtonClick(('signin'))}
            >
              Se connecter
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOnButtonClick(('signup'))}
            >
              Se créer un compte
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
