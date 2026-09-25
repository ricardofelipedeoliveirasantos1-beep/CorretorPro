import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    // Aqui usamos redirectTo para o supabase redirecionar de volta para o app na rota de redefinir senha
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    })

    if (error) {
      setError('Não foi possível enviar o link de recuperação. Tente novamente.')
    } else {
      // Mensagem genérica por segurança para não vazar se o email existe ou não
      setSuccess('Se o e-mail existir em nossa base, você receberá um link de recuperação em instantes.')
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Recuperar Senha</h2>
        <p className="text-sm text-base-500">
          Informe seu e-mail para receber um link de redefinição.
        </p>
      </div>

      {success ? (
        <div className="flex flex-col space-y-4">
          <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
          <Link to="/login" className="text-center text-sm font-medium text-primary-600 hover:text-primary-700">
            Voltar para o Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
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

          {error && (
            <p className="text-sm font-medium text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'ENVIAR LINK DE RECUPERAÇÃO'}
          </Button>
        </form>
      )}

      {!success && (
        <div className="text-center text-sm">
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Voltar para o Login
          </Link>
        </div>
      )}
    </div>
  )
}
