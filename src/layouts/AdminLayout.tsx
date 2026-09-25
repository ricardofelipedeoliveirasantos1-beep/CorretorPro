import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Home, Users, UserSquare2, CalendarDays, DollarSign, FileText, Settings, Globe, LogOut, Building2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { ThemeToggle } from '../components/common/ThemeToggle'
import { cn } from '../utils/cn'

const navItems = [
  { name: 'Dashboard', to: '/dashboard', icon: Home },
  { name: 'Imóveis', to: '/imoveis', icon: Building2 },
  { name: 'Leads', to: '/leads', icon: Users },
  { name: 'Clientes', to: '/clientes', icon: UserSquare2 },
  { name: 'Agenda', to: '/agenda', icon: CalendarDays },
  { name: 'Negócios', to: '/negocios', icon: DollarSign },
  { name: 'Relatórios', to: '/relatorios', icon: FileText },
  { name: 'Meu Portal', to: '/meu-portal', icon: Globe },
  { name: 'Ajustes', to: '/configuracoes', icon: Settings },
]

const mobileNavItems = [
  { name: 'Início', to: '/dashboard', icon: Home },
  { name: 'Imóveis', to: '/imoveis', icon: Building2 },
  { name: 'Leads', to: '/leads', icon: Users },
  { name: 'Agenda', to: '/agenda', icon: CalendarDays },
  { name: 'Menu', to: '/menu-mobile', icon: Settings },
]

export function AdminLayout() {
  const { signOut, isDemoMode } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#08111F] transition-colors duration-300">
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden w-[300px] flex-col border-r border-[#E2E8F0] dark:border-[#24344D] bg-white dark:bg-[#091321] transition-colors duration-300 lg:flex shrink-0">
        <div className="flex h-[80px] items-center px-6">
          <div className="flex items-center gap-2">
            <Home className="h-8 w-8 text-[#1685FF]" />
            <span className="text-[28px] font-bold tracking-tight">
              <span className="text-[#0F172A] dark:text-[#F8FAFC]">Corretor</span>
              <span className="text-[#1685FF]">Pro</span>
            </span>
          </div>
        </div>
        <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto [scrollbar-width:none]">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-[14px] px-[20px] h-[52px] rounded-[12px] text-[16px] font-medium transition-all duration-300 border border-transparent',
                  isActive
                    ? 'bg-[#EAF3FF] dark:bg-gradient-to-r dark:from-[rgba(30,94,255,0.32)] dark:to-[rgba(16,63,155,0.30)] text-[#005CE6] dark:text-white dark:border-[#1E90FF] dark:shadow-[0_0_20px_rgba(30,144,255,0.25)]'
                    : 'text-[#475569] dark:text-[#B7C2D6] hover:bg-slate-50 dark:hover:bg-white/5'
                )
              }
            >
              <item.icon className="h-6 w-6" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-[#E2E8F0] dark:border-[#24344D]">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-[14px] px-[20px] h-[52px] rounded-[12px] text-[16px] font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-6 w-6" />
            Sair
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col pb-16 lg:pb-0 h-screen overflow-hidden">
        {/* Top header (mostly for mobile/tablet, but houses theme toggle on desktop too) */}
        <header className="flex shrink-0 items-center justify-between px-4 sm:px-6 lg:px-10 py-4 lg:py-6">
          <div className="lg:hidden flex items-center gap-2">
            <Home className="h-6 w-6 text-[#1685FF]" />
            <span className="text-[22px] font-bold tracking-tight">
              <span className="text-[#0F172A] dark:text-[#F8FAFC]">Corretor</span>
              <span className="text-[#1685FF]">Pro</span>
            </span>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <ThemeToggle />
            {isDemoMode && (
              <span className="hidden md:flex items-center h-[38px] px-[20px] rounded-full border border-[#F59E0B] bg-[#FFF7E6] dark:bg-[rgba(245,158,11,0.10)] text-[#B45309] dark:text-[#FBBF24] text-sm font-semibold whitespace-nowrap transition-colors duration-300">
                Modo de Demonstração
              </span>
            )}
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 pb-10">
          <div className="mx-auto max-w-[1500px] h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-[#E2E8F0] dark:border-[#24344D] bg-white dark:bg-[#0B1524] px-2 pb-safe lg:hidden transition-colors duration-300">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors',
                isActive
                  ? 'text-[#1685FF]'
                  : 'text-[#64748B] dark:text-[#94A3B8]'
              )
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
