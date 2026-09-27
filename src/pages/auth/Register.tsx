import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../lib/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../contexts/AuthContext'

export function Register() {
  const navigate = useNavigate()
  const { signInDemo } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const isDemoEnv = import.meta.env.VITE_ENABLE_DEMO_MODE === 'true'

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const workspaceName = formData.get('workspaceName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      setIsLoading(false)
      return
    }

    if (isDemoEnv) {
      signInDemo(email)
      navigate('/dashboard')
      return
    }

    try {
      if (workspaceName) {
        sessionStorage.setItem('@futcrm:pending_workspace_name', workspaceName.trim());
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`.trim()
      })
      navigate('/dashboard')
    } catch (signUpError: any) {
      console.error(signUpError)
      if (signUpError.code === 'auth/email-already-in-use') {
        setError('Este e-mail já possui uma conta.')
      } else if (signUpError.code === 'auth/invalid-email') {
        setError('Informe um e-mail válido.')
      } else if (signUpError.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres.')
      } else {
        setError('Não foi possível concluir o cadastro. Tente novamente.')
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Criar Conta</h2>
        <p className="text-sm text-base-500">
          Crie seu acesso para gerenciar seus negócios no CorretorPro.
        </p>
        {isDemoEnv && (
          <p className="text-xs font-semibold text-amber-600 bg-amber-50 p-2 rounded mt-2">
            Modo Demonstração Ativo: Use qualquer e-mail e senha.
          </p>
        )}
      </div>

      {success ? (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="firstName"
              name="firstName"
              type="text"
              label="Nome"
              placeholder="Seu nome"
              autoComplete="given-name"
              required
              disabled={isLoading}
            />
            <Input
              id="lastName"
              name="lastName"
              type="text"
              label="Sobrenome"
              placeholder="Seu sobrenome"
              autoComplete="family-name"
              required
              disabled={isLoading}
            />
          </div>

          <Input
            id="workspaceName"
            name="workspaceName"
            type="text"
            label="Nome da Imobiliária / CRM"
            placeholder="Ex: Minha Imobiliária"
            required
            disabled={isLoading}
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            autoComplete="email"
            required
            disabled={isLoading}
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Senha"
            autoComplete="new-password"
            required
            disabled={isLoading}
          />

          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirmar senha"
            autoComplete="new-password"
            required
            disabled={isLoading}
          />

          {error && (
            <p className="text-sm font-medium text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Criando conta...' : 'CRIAR MINHA CONTA'}
          </Button>
        </form>
      )}

      <div className="text-center text-sm text-base-500">
        Já possui conta?{' '}
        <Link
          to="/login"
          className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          Fazer Login
        </Link>
      </div>
    </div>
  )
}
