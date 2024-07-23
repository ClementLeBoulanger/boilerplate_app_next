'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Drakkar from './Drakkar';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast()
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [apiError, setApiError] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // Validation des champs
    if (!validateEmail(email)) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Adresse email invalide' }));
      valid = false;
    }

    if (!password) {
      setErrors(prevErrors => ({ ...prevErrors, password: 'Le mot de passe est requis' }));
      valid = false;
    }

    if (!valid) return;

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setApiError(result.error)
      } else {
        toast({
          title: "🎉 Connexion réussi",
        })
        router.push('/home')
      }
    } catch (error) {
      setApiError('Échec de la connexion. Veuillez vérifier votre connexion réseau.');
    }
  };

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-4">
      <Drakkar />
      <CardHeader>
        <CardTitle>Se connecter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <label>Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prevErrors => ({ ...prevErrors, email: '' }));
            }}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label>Mot de passe</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prevErrors => ({ ...prevErrors, password: '' }));
            }}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <Button type="submit">Se connecter</Button>
        {apiError && <p className="text-red-500">{apiError}</p>}
      </CardContent>
    </form>
  );
}
