import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function ResetPassword() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Verifica se o usuário chegou aqui através de um link válido de recuperação
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Se não houver sessão ativa após o link ser clicado (o supabase seta temporariamente)
      // O ideal no fluxo PKCE do Supabase mais recente é que ele loga a pessoa automaticamente ao clicar no link de recovery
      if (!session) {
        // Redireciona para login se o link for inválido
        navigate('/login')
      }
    })
  }, [navigate])

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
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

    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      setError('Não foi possível alterar a senha. Tente novamente.')
      setIsLoading(false)
    } else {
      // Senha atualizada, redireciona para o painel (o usuário já está logado)
      navigate('/dashboard')
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Definir Nova Senha</h2>
        <p className="text-sm text-base-500">
          Digite e confirme a sua nova senha abaixo.
        </p>
      </div>

      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <Input
          id="password"
          name="password"
          type="password"
          label="Nova Senha"
          autoComplete="new-password"
          required
          disabled={isLoading}
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirmar Nova Senha"
          autoComplete="new-password"
          required
          disabled={isLoading}
        />

        {error && (
          <p className="text-sm font-medium text-red-500">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Atualizando...' : 'SALVAR NOVA SENHA'}
        </Button>
      </form>
    </div>
  )
}
