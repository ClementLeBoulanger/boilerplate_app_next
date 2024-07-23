'use client'

import { Card } from '@/components/ui/card';
import SignUpForm from '@/components/SignUpForm';
import { useEffect } from 'react';

export default function Signin() {
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
          <Card className="w-[650px] px-5 py-5">
            <SignUpForm />
          </Card>
        </div>
    </div>
  );
}
