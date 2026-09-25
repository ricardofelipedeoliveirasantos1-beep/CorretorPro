import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { AuthLayout } from './layouts/AuthLayout'
import { AdminLayout } from './layouts/AdminLayout'

// Páginas de Autenticação
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { ResetPassword } from './pages/auth/ResetPassword'

import { Dashboard } from './pages/admin/Dashboard'
import { PropertiesList } from './pages/admin/properties/PropertiesList'
import { PropertyCreate } from './pages/admin/properties/PropertyCreate'
import { PropertyEdit } from './pages/admin/properties/PropertyEdit'
import { PropertyDetail } from './pages/admin/properties/PropertyDetail'
import { OwnersList } from './pages/admin/owners/OwnersList'
import { OwnerCreate } from './pages/admin/owners/OwnerCreate'
import { OwnerEdit } from './pages/admin/owners/OwnerEdit'
import { OwnerDetail } from './pages/admin/owners/OwnerDetail'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <Routes>
        {/* Rotas Públicas de Autenticação */}
        <Route element={<ProtectedRoute requireAuth={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/esqueci-senha" element={<ForgotPassword />} />
            <Route path="/redefinir-senha" element={<ResetPassword />} />
          </Route>
        </Route>

        {/* Rotas Protegidas (Requerem login) */}
        <Route element={<ProtectedRoute requireAuth={true} />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Imóveis */}
            <Route path="/imoveis" element={<PropertiesList />} />
            <Route path="/imoveis/novo" element={<PropertyCreate />} />
            <Route path="/imoveis/:id" element={<PropertyDetail />} />
            <Route path="/imoveis/:id/editar" element={<PropertyEdit />} />

            {/* Proprietários */}
            <Route path="/proprietarios" element={<OwnersList />} />
            <Route path="/proprietarios/novo" element={<OwnerCreate />} />
            <Route path="/proprietarios/:id" element={<OwnerDetail />} />
            <Route path="/proprietarios/:id/editar" element={<OwnerEdit />} />
          </Route>
        </Route>

        {/* Rota inicial provisória redirecionando para login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

      </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
