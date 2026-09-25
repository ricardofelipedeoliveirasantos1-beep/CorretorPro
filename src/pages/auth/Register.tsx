import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
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
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    // Validações locais
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
      // Bypass Supabase if demo mode is enabled
      signInDemo(email)
      navigate('/dashboard')
      return
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (signUpError) {
      if (signUpError.message.includes('User already registered')) {
        setError('Este e-mail já está em uso.')
      } else {
        setError('Não foi possível concluir o cadastro. Tente novamente.')
      }
      setIsLoading(false)
    } else {
      if (data.session) {
        // Se já retorna sessão, entra direto (confirmação desativada)
        navigate('/dashboard')
      } else {
        // Se a confirmação de email estiver ativada no Supabase
        setSuccess('Cadastro realizado! Verifique seu e-mail para confirmar a conta.')
        setIsLoading(false)
      }
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
