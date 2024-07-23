// src/app/auth/signin/page.tsx
'use client';

import SignInForm from '@/components/SignInForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignIn() {
  const router = useRouter()
  useEffect(() => {
    document.title = 'Drakkar - Se connecter';
  }, []);
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
          <SignInForm />
          <Button variant="outline" className='mx-5' onClick={() => router.push('/')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
