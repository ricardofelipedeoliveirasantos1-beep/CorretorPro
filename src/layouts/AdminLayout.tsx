import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Home, HomeIcon, Users, UserSquare2, CalendarDays, DollarSign, FileText, Settings, Globe, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const navItems = [
  { name: 'Dashboard', to: '/dashboard', icon: Home },
  { name: 'Imóveis', to: '/imoveis', icon: HomeIcon },
  { name: 'Leads', to: '/leads', icon: Users },
  { name: 'Clientes', to: '/clientes', icon: UserSquare2 },
  { name: 'Agenda', to: '/agenda', icon: CalendarDays },
  { name: 'Negócios', to: '/negocios', icon: DollarSign },
  { name: 'Relatórios', to: '/relatorios', icon: FileText },
  { name: 'Meu Portal', to: '/meu-portal', icon: Globe },
  { name: 'Ajustes', to: '/configuracoes', icon: Settings },
]

// Mobile limits to max 5 items for the bottom bar, usually the main ones
const mobileNavItems = [
  { name: 'Início', to: '/dashboard', icon: Home },
  { name: 'Imóveis', to: '/imoveis', icon: HomeIcon },
  { name: 'Leads', to: '/leads', icon: Users },
  { name: 'Agenda', to: '/agenda', icon: CalendarDays },
  { name: 'Menu', to: '/menu-mobile', icon: Settings }, // Will act as a catch-all route for mobile
]

export function AdminLayout() {
  const { signOut, isDemoMode } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-base-50">
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden w-64 flex-col border-r border-base-200 bg-white lg:flex">
        <div className="flex h-16 items-center px-6 border-b border-base-200">
          <span className="text-xl font-bold text-primary-600 tracking-tight">CorretorPro</span>
        </div>
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-base-600 hover:bg-base-100 hover:text-base-900'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-base-200 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col pb-16 lg:pb-0 h-screen overflow-hidden">
        {/* Top header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-base-200 bg-white px-4 sm:px-6">
          <div className="lg:hidden text-lg font-bold text-primary-600 tracking-tight">CorretorPro</div>
          <div className="hidden lg:flex flex-1 justify-end items-center gap-4">
            {isDemoMode && (
              <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Modo de Demonstração
              </span>
            )}
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-base-50">
          <div className="mx-auto max-w-7xl h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-base-200 bg-white px-2 pb-safe lg:hidden">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-primary-600' : 'text-base-500 hover:text-base-900'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
