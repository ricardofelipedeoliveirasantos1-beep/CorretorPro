import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  requireAuth?: boolean
}

export function ProtectedRoute({ requireAuth = true }: ProtectedRouteProps) {
  const { user, workspace, isLoading, authError, signOut } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return null // O AuthProvider já renderiza o LoadingState
  }

  if (requireAuth) {
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
    
    if (authError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center space-y-6">
            <h2 className="text-xl font-bold text-red-600">Erro de Configuração</h2>
            <p className="text-gray-600 text-sm">Não foi possível iniciar seu CRM.</p>
            <p className="text-xs font-mono bg-gray-100 p-2 rounded text-red-500 overflow-auto text-left">{authError}</p>
            <div className="flex flex-col space-y-3 pt-4">
              <button onClick={() => window.location.reload()} className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition-colors">Tentar Novamente</button>
              <button onClick={signOut} className="w-full bg-white border border-gray-300 text-gray-700 rounded-md py-2 font-medium hover:bg-gray-50 transition-colors">Sair e Voltar para Login</button>
            </div>
          </div>
        </div>
      );
    }

    if (!workspace) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Workspace Não Encontrado</h2>
            <p className="text-gray-600 text-sm">Você está logado, mas não possui uma conta ativa de CRM.</p>
            <div className="flex flex-col space-y-3 pt-4">
              <button onClick={signOut} className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition-colors">Sair e Voltar para Login</button>
            </div>
          </div>
        </div>
      );
    }
  }

  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
