import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Home, UserSquare2, CalendarDays, DollarSign, FileText, Settings, Globe, LogOut, Building2, Menu as MenuIcon, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { cn } from '../utils/cn'
import { ProfileModal } from '../components/admin/ProfileModal'

const navItems = [
  { name: 'Dashboard', to: '/dashboard', icon: Home },
  { name: 'Imóveis', to: '/imoveis', icon: Building2 },
  { name: 'Clientes', to: '/clientes', icon: UserSquare2 },
  { name: 'Agenda', to: '/agenda', icon: CalendarDays },
  { name: 'Negócios', to: '/negocios', icon: DollarSign },
  { name: 'Relatórios', to: '/relatorios', icon: FileText },
  { name: 'Meu Portal', to: '/meu-portal', icon: Globe },
  { name: 'Configurações', to: '/configuracoes', icon: Settings },
]

const mobileNavItems = [
  { name: 'Início', to: '/dashboard', icon: Home },
  { name: 'Imóveis', to: '/imoveis', icon: Building2 },
  { name: 'Clientes', to: '/clientes', icon: UserSquare2 },
  { name: 'Agenda', to: '/agenda', icon: CalendarDays },
  { name: 'Menu', action: 'openMenu', icon: MenuIcon },
]

export function AdminLayout() {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [customLogo, setCustomLogo] = useState<string | null>(null)
  const [customProfile, setCustomProfile] = useState<any>(null)

  useEffect(() => {
    // Carrega a logo inicial e o perfil
    const loadLogoAndProfile = () => {
      const savedLogo = localStorage.getItem('crm_logo')
      setCustomLogo(savedLogo)

      const savedProfile = localStorage.getItem('crm_admin_profile')
      if (savedProfile) {
        try {
          setCustomProfile(JSON.parse(savedProfile))
        } catch (e) {
          console.error("Erro ao carregar perfil salvo", e)
        }
      }
    }
    loadLogoAndProfile()

    // Escuta mudanças
    window.addEventListener('logoChanged', loadLogoAndProfile)
    return () => window.removeEventListener('logoChanged', loadLogoAndProfile)
  }, [])

  // Fecha o menu mobile quando a rota muda
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const renderLogo = (isSidebar = false) => {
    if (customLogo) {
      return (
        <img
          src={customLogo}
          alt="Logo do Sistema"
          className={cn("object-contain", isSidebar ? "h-12 w-auto max-w-[180px]" : "h-8 sm:h-10 w-auto max-w-[140px]")}
        />
      )
    }

    return (
      <div className="flex items-center gap-2">
        <Home className={cn("text-[#1685FF]", isSidebar ? "h-8 w-8" : "h-6 w-6 sm:h-7 sm:w-7")} />
        <span className={cn("font-bold tracking-tight", isSidebar ? "text-[28px]" : "text-[22px] sm:text-[24px]")}>
          <span className={isSidebar ? "text-[#0F172A] dark:text-[#F8FAFC]" : "text-white"}>{isSidebar ? 'Imob' : 'Corretor'}</span>
          <span className="text-[#1685FF]">{isSidebar ? 'CRM' : 'Pro'}</span>
        </span>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#06152B] transition-colors duration-300">

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[260px] flex-col border-r border-[rgba(255,255,255,0.05)] dark:border-[#1E3048] bg-[#071A31] dark:bg-[#06152B] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:flex shrink-0 shadow-2xl lg:shadow-lg dark:shadow-[0_0_40px_rgba(0,0,0,0.3)]",
        isMobileMenuOpen ? "translate-x-0 flex" : "-translate-x-full lg:translate-x-0 hidden lg:flex"
      )}>
        <div className="flex h-[80px] items-center justify-between px-6 shrink-0 border-b border-[rgba(255,255,255,0.05)] dark:border-[#1E3048]">
          {renderLogo(true)}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 -mr-2 text-[#94A3B8] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 pb-2 pt-4 shrink-0">
           <p className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider">Gestão Imobiliária</p>
        </div>
        <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-[14px] px-[20px] h-[52px] rounded-[12px] text-[16px] font-medium transition-all duration-300 border border-transparent',
                  isActive
                    ? 'bg-gradient-to-r from-[rgba(30,94,255,0.32)] to-[rgba(16,63,155,0.30)] text-white border-[#1E90FF] shadow-[0_0_20px_rgba(30,144,255,0.25)]'
                    : 'text-[#94A3B8] hover:bg-[rgba(25,146,255,0.08)] hover:text-white'
                )
              }
            >
              <item.icon className="h-6 w-6" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-[rgba(255,255,255,0.05)] dark:border-[#24344D] shrink-0">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-[14px] px-[20px] h-[52px] rounded-[12px] text-[16px] font-medium text-red-500 hover:text-red-400 transition-colors hover:bg-red-500/10"
          >
            <LogOut className="h-6 w-6" />
            Sair
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col pb-[64px] lg:pb-0 h-screen overflow-hidden relative">

        {/* Top header */}
        <header className="flex shrink-0 items-center justify-between px-4 sm:px-6 lg:px-10 py-3 lg:py-4 bg-[#071A31] dark:bg-[#06152B] z-40 shadow-md border-b border-transparent dark:border-[rgba(25,146,255,0.05)] h-[60px] sm:h-[70px] lg:h-[80px] gap-4">

          {/* Esquerda: Hambúrguer + Logo (Mobile) ou Saudação (Desktop) */}
          <div className="flex-1 flex items-center lg:items-start lg:flex-col gap-1 sm:gap-3 lg:gap-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[#94A3B8] hover:text-white transition-colors"
            >
              <MenuIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            <div className="lg:hidden flex items-center justify-start ml-1 sm:ml-0">
              {renderLogo()}
            </div>

            <div className="hidden lg:flex flex-col">
              <h1 className="text-[24px] lg:text-[28px] xl:text-[32px] font-bold tracking-tight text-[#F8FAFC] leading-none mb-1">
                {location.pathname.startsWith('/leads') ? 'Clientes' :
                 location.pathname.startsWith('/clientes') ? 'Clientes' :
                 location.pathname.startsWith('/agenda') ? 'Agenda' :
                 location.pathname.startsWith('/negocios') ? 'Negócios' :
                 location.pathname.startsWith('/relatorios') ? 'Relatórios' :
                 location.pathname.startsWith('/imoveis') ? 'Imóveis' :
                 location.pathname.startsWith('/configuracoes') ? 'Configurações' :
                 'Dashboard'}
              </h1>
              <p className="text-[13px] lg:text-[14px] xl:text-[15px] text-[#94A3B8] font-medium">
                {location.pathname.startsWith('/leads') ? 'Gerencie sua carteira de clientes.' :
                 location.pathname.startsWith('/clientes') ? 'Gerencie sua carteira de clientes.' :
                 location.pathname.startsWith('/agenda') ? 'Organize seus compromissos, visitas e retornos.' :
                 location.pathname.startsWith('/negocios') ? 'Acompanhe suas oportunidades até o fechamento.' :
                 location.pathname.startsWith('/relatorios') ? 'Acompanhe o desempenho da operação imobiliária.' :
                 location.pathname.startsWith('/imoveis') ? 'Gerencie o portfólio de imóveis.' :
                 location.pathname.startsWith('/configuracoes') ? 'Personalize seu CRM.' :
                 'Acompanhe os principais resultados do dia.'}
              </p>
            </div>
          </div>

          {/* Direita: Theme Toggle e Ações */}
          <div className="flex-none flex justify-end items-center gap-2 sm:gap-4 lg:gap-6">
            <div className="hidden lg:block relative w-[320px] xl:w-[380px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-4 h-4 text-[#94A3B8]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="search" className="block w-full p-2.5 pl-11 text-sm bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-full focus:ring-[#1685FF] focus:border-[#1685FF] focus:bg-[rgba(255,255,255,0.1)] text-white placeholder-[#94A3B8] outline-none shadow-sm transition-all" placeholder="Buscar imóveis, clientes..." />
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <button className="p-2 text-[#94A3B8] hover:text-white transition-colors relative">
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 sm:gap-3 cursor-pointer pl-0 lg:pl-3 border-l-0 lg:border-l border-[rgba(255,255,255,0.1)] hover:opacity-80 transition-opacity"
              >
                <div className="flex h-[36px] w-[36px] sm:h-[38px] sm:w-[38px] lg:h-[44px] lg:w-[44px] items-center justify-center rounded-full bg-[#1685FF] text-white font-bold text-sm shadow-md overflow-hidden shrink-0 border-2 border-[rgba(255,255,255,0.2)]">
                  {customProfile?.avatar_url || user?.user_metadata?.avatar_url ? (
                    <img src={customProfile?.avatar_url || user?.user_metadata?.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[14px] sm:text-[16px] tracking-wide">
                      {customProfile?.first_name
                        ? customProfile.first_name.charAt(0).toUpperCase() + (customProfile.last_name ? customProfile.last_name.charAt(0).toUpperCase() : '')
                        : user?.user_metadata?.first_name
                          ? user.user_metadata.first_name.charAt(0).toUpperCase() + (user.user_metadata.last_name ? user.user_metadata.last_name.charAt(0).toUpperCase() : '')
                          : 'AD'
                      }
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start text-left ml-0 max-w-[105px] sm:max-w-[140px] lg:max-w-none">
                  <p className="text-[13px] sm:text-[14px] lg:text-[15px] font-bold text-white leading-tight truncate w-full">
                    {customProfile?.first_name || user?.user_metadata?.first_name
                      ? `${customProfile?.first_name || user?.user_metadata?.first_name} ${customProfile?.last_name || user?.user_metadata?.last_name || ''}`
                      : 'Administrador'
                    }
                  </p>
                  <p className="text-[11px] sm:text-[12px] lg:text-[13px] font-semibold text-[#94A3B8] leading-tight mt-0.5 truncate w-full">
                    {(customProfile?.creci_state && customProfile?.creci_number)
                      ? `CRECI-${customProfile.creci_state} ${customProfile.creci_number}`
                      : user?.user_metadata?.creci
                        ? `CRECI ${user.user_metadata.creci}`
                        : 'CRECI não informado'
                    }
                  </p>
                </div>
              </button>

              {isProfileOpen && (
                <>
                  {/* Overlay */}
                  <div className="fixed inset-0 z-[60] bg-black/20 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none transition-opacity" onClick={() => setIsProfileOpen(false)} />

                  {/* Menu Desktop */}
                  <div className="hidden lg:block absolute right-0 top-[calc(100%+12px)] w-[190px] bg-white dark:bg-[#071A31] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.15)] rounded-[14px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-[70] overflow-hidden py-1">
                    <button onClick={() => { setIsProfileOpen(false); setIsProfileModalOpen(true) }} className="w-full flex items-center px-4 py-2.5 text-[14px] font-medium text-[#475569] dark:text-[#E2E8F0] hover:bg-gray-50 dark:hover:bg-[#0A2647] hover:text-[#1685FF] transition-colors">
                      Mudar Perfil
                    </button>
                    <div className="h-px bg-[#E2E8F0] dark:bg-[rgba(25,146,255,0.1)] my-1 mx-2" />
                    <button onClick={handleLogout} className="w-full flex items-center px-4 py-2.5 text-[14px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-[#3B1219] transition-colors">
                      Sair
                    </button>
                  </div>

                  {/* Bottom Sheet Mobile / Tablet */}
                  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#071A31] border-t border-[#E2E8F0] dark:border-[rgba(25,146,255,0.15)] rounded-t-[24px] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] z-[70] overflow-hidden pb-safe flex flex-col max-h-[85vh]">
                    <div className="flex items-center justify-center pt-4 pb-2 shrink-0">
                      <div className="w-12 h-1.5 bg-gray-200 dark:bg-[#1E3A5F] rounded-full" />
                    </div>
                    <div className="px-6 py-4 border-b border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] shrink-0 flex items-center gap-4">
                      <div className="w-[48px] h-[48px] rounded-full overflow-hidden shrink-0">
                        {customProfile?.avatar_url || user?.user_metadata?.avatar_url ? (
                          <img src={customProfile?.avatar_url || user?.user_metadata?.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#1685FF] flex items-center justify-center text-white font-bold text-lg">
                            {customProfile?.first_name
                              ? customProfile.first_name.charAt(0).toUpperCase()
                              : user?.user_metadata?.first_name
                                ? user.user_metadata.first_name.charAt(0).toUpperCase()
                                : 'AD'
                            }
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#0F172A] dark:text-white truncate">
                          {customProfile?.first_name || user?.user_metadata?.first_name
                            ? `${customProfile?.first_name || user?.user_metadata?.first_name} ${customProfile?.last_name || user?.user_metadata?.last_name || ''}`
                            : 'Administrador'
                          }
                        </p>
                        <p className="text-[14px] font-semibold text-[#64748B] dark:text-[#94A3B8] truncate mt-0.5">
                          {(customProfile?.creci_state && customProfile?.creci_number)
                            ? `CRECI-${customProfile.creci_state} ${customProfile.creci_number}`
                            : user?.user_metadata?.creci
                              ? `CRECI ${user.user_metadata.creci}`
                              : 'CRECI não informado'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="p-3 space-y-1 overflow-y-auto custom-scrollbar">
                      <button onClick={() => { setIsProfileOpen(false); setIsProfileModalOpen(true) }} className="w-full flex items-center px-5 py-4 text-[16px] font-medium text-[#475569] dark:text-[#E2E8F0] hover:bg-gray-50 dark:hover:bg-[#0A2647] active:bg-gray-100 dark:active:bg-[#0A2647] rounded-[14px] transition-colors">
                        Mudar Perfil
                      </button>
                      <button onClick={handleLogout} className="w-full flex items-center px-5 py-4 text-[16px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-[#3B1219] active:bg-red-100 dark:active:bg-[#3B1219] rounded-[14px] transition-colors">
                        Sair
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Modal de Mudar Perfil */}
        {isProfileModalOpen && (
          <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            initialData={{
              first_name: customProfile?.first_name || user?.user_metadata?.first_name || '',
              last_name: customProfile?.last_name || user?.user_metadata?.last_name || '',
              creci_state: customProfile?.creci_state || '',
              creci_number: customProfile?.creci_number || user?.user_metadata?.creci || '',
              avatar_url: customProfile?.avatar_url || user?.user_metadata?.avatar_url || ''
            }}
            onSave={(data) => {
              setCustomProfile(data)
              localStorage.setItem('crm_admin_profile', JSON.stringify(data))
              setIsProfileModalOpen(false)
            }}
          />
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-6 pb-24 lg:pb-10 custom-scrollbar relative">
          <div className="mx-auto max-w-[1500px] h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[64px] items-center justify-between border-t border-[rgba(255,255,255,0.05)] dark:border-[rgba(25,146,255,0.05)] bg-[#071A31] dark:bg-[#06152B] px-2 pb-safe lg:hidden transition-colors duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.2)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to || '/nao-existe')
          const isMenuBtn = item.action === 'openMenu'

          if (isMenuBtn) {
            return (
              <button
                key={item.name}
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors text-[#94A3B8] hover:text-white"
              >
                <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-[10px] sm:text-[11px] font-medium">{item.name}</span>
              </button>
            )
          }

          return (
            <NavLink
              key={item.name}
              to={item.to as string}
              className={() =>
                cn(
                  'flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 relative',
                  isActive
                    ? 'text-[#1685FF] drop-shadow-[0_0_8px_rgba(22,133,255,0.4)]'
                    : 'text-[#94A3B8] hover:text-white'
                )
              }
            >
              <item.icon className={cn("h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300", isActive && "scale-110")} />
              <span className={cn("text-[10px] sm:text-[11px] font-medium transition-colors", isActive ? "text-white" : "")}>{item.name}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#1685FF] rounded-b-full shadow-[0_2px_10px_rgba(22,133,255,0.8)]"></div>
              )}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
