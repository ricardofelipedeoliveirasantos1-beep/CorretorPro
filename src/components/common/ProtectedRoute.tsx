import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  requireAuth?: boolean
}

export function ProtectedRoute({ requireAuth = true }: ProtectedRouteProps) {
  const { session } = useAuth()
  const location = useLocation()

  if (requireAuth && !session) {
    // Redireciona para o login e salva de onde o usuário tentou vir
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!requireAuth && session) {
    // Se não precisa de auth (ex: página de login) e já tem sessão, vai pro dashboard
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
