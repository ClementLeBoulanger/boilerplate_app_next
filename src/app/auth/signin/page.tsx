// src/app/auth/signin/page.tsx
'use client';

import SignInForm from '@/components/SignInForm';
import { Card } from '@/components/ui/card';
import { useEffect } from 'react';

export default function SignIn() {
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
        <Card className="w-[650px] px-5 py-5">
          <SignInForm />
        </Card>
      </div>
    </div>
  );
}
