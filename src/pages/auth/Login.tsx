import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

export function Login() {
  const navigate = useNavigate()
  const { signInDemo } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const isDemoEnv = import.meta.env.VITE_ENABLE_DEMO_MODE === 'true'

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      setError('Preencha todos os campos.')
      setIsLoading(false)
      return
    }

    if (isDemoEnv) {
      // Modo Demonstração: Bypass completo do Supabase
      signInDemo(email)
      navigate('/dashboard')
      return
    }

    // Fluxo Real de Produção
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError('E-mail ou senha incorretos.')
      setIsLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Entrar</h2>
        <p className="text-sm text-base-500">
          Acesse sua conta para gerenciar seus imóveis e clientes.
        </p>
        {isDemoEnv && (
          <p className="text-xs font-semibold text-amber-600 bg-amber-50 p-2 rounded mt-2">
            Modo Demonstração Ativo: Use qualquer e-mail e senha.
          </p>
        )}
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
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
          autoComplete="current-password"
          required
          disabled={isLoading}
        />

        {error && (
          <p className="text-sm font-medium text-red-500">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'ENTRAR'}
        </Button>
      </form>

      <div className="flex flex-col space-y-4 text-center text-sm">
        <Link
          to="/esqueci-senha"
          className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          Esqueci minha senha
        </Link>
        <div className="text-base-500">
          Ainda não possui conta?{' '}
          <Link
            to="/cadastro"
            className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            CRIAR CONTA
          </Link>
        </div>
      </div>
    </div>
  )
}

