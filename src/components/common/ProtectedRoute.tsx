import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  requireAuth?: boolean
}

export function ProtectedRoute({ requireAuth = true }: ProtectedRouteProps) {
  const { user, workspace, authLoading, bootstrapLoading, authError, signOut } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return null // O AuthProvider já renderiza o LoadingState para authLoading
  }

  if (requireAuth) {
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
    
    // Se está no meio do bootstrap, mostrar UI visual de configuração temporária
    if (bootstrapLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <h2 className="text-xl font-medium text-gray-700">Configurando seu CRM...</h2>
            <p className="text-sm text-gray-500">Por favor, aguarde alguns instantes.</p>
          </div>
        </div>
      );
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
            <h2 className="text-xl font-bold text-gray-800">Não foi possível carregar seu CRM</h2>
            <p className="text-gray-600 text-sm">Seu login foi realizado, mas ocorreu um problema ao carregar ou configurar sua conta.</p>
            <div className="flex flex-col space-y-3 pt-4">
              <button onClick={() => window.location.reload()} className="w-full bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition-colors">Tentar Novamente</button>
              <button onClick={signOut} className="w-full bg-white border border-gray-300 text-gray-700 rounded-md py-2 font-medium hover:bg-gray-50 transition-colors">Sair e Voltar para Login</button>
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
