'use client'

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Importer useRouter
import useStore from './store/useStore';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { data: session } = useSession()
  const { user } = useStore()
  const router = useRouter()

  const handleOnButtonClick = (path : string) => {
    router.push(`/auth/${path}`)
  };


  console.log(session)

  return (
    <div>
      {session ? (
        <>
          <h1>Welcome {user?.email}</h1>
        </>
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%'
        }}>
          <Card className="w-[650px] px-5 py-5">
            <CardHeader>
              <CardTitle>Next Auth Template</CardTitle>
              <CardDescription>This application implements basic Next Auth authentication and is connected to a Rails API backend.</CardDescription>
            </CardHeader>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '12rem'
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
                Se Créer un compte
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
