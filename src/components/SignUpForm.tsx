'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Drakkar from './Drakkar';

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const { toast } = useToast()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' })
  const [apiError, setApiError] = useState('')
  const router = useRouter()

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password)
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    let valid = true

    // Validation des champs
    if (!validateEmail(email)) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Adresse email invalide' }))
      valid = false
    }

    if (!validatePassword(password)) {
      setErrors(prevErrors => ({ ...prevErrors, password: 'Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial' }))
      valid = false
    }

    if (password !== confirmPassword) {
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Les mots de passe ne correspondent pas' }))
      valid = false
    }

    if (!valid) return

    try {
      // Appel API pour l'inscription
      const res = await fetch('http://localhost:3000/api/v1/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { email, first_name: firstName, last_name: lastName, password, password_confirmation: confirmPassword } }),
      });

      if (res.ok) {
        toast({
          title: "🎉 Compte créé avec succès !",
          description: "Veuillez vous connecter 🙏",
        })
        router.push('/auth/signin');
      } else {
        const errorData = await res.json();
        setApiError(errorData.message || 'Échec de l\'inscription');
      }
    } catch (error) {
      setApiError('Échec de l\'inscription. Veuillez vérifier votre connexion réseau.');
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      <Drakkar />
      <CardHeader>
        <CardTitle>Se créer un compte</CardTitle>
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
        <div className="flex gap-4">
          <div className="flex-1">
            <label>Prénom</label>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrors(prevErrors => ({ ...prevErrors, firstName: '' }));
              }}
              required
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </div>
          <div className="flex-1">
            <label>Nom</label>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setErrors(prevErrors => ({ ...prevErrors, lastName: '' }));
              }}
              required
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </div>
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
        <div>
          <label>Confirmer le mot de passe</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
            }}
            required
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>
        <Button type="submit">S&apos;inscrire</Button>
        {apiError && <p className="text-red-500">{apiError}</p>}
      </CardContent>
    </form>
  );
}
