'use client'

import { Card } from '@/components/ui/card';
import SignUpForm from '@/components/SignUpForm';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const router = useRouter()
  useEffect(() => {
    document.title = 'Drakkar - Créer son compte';
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
            <SignUpForm />
            <Button variant="outline" className='mx-5' onClick={() => router.push('/')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Card>
        </div>
    </div>
  );
}
