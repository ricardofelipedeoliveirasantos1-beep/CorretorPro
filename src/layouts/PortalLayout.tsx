import { Outlet } from 'react-router-dom'

export function PortalLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Public Portal Header */}
      <header className="sticky top-0 z-50 w-full border-b border-base-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary-600">Portal</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-sm font-medium text-base-600 hover:text-primary-600">Comprar</a>
            <a href="#" className="text-sm font-medium text-base-600 hover:text-primary-600">Alugar</a>
            <a href="#" className="text-sm font-medium text-base-600 hover:text-primary-600">Contato</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="border-t border-base-200 bg-base-50 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-base-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}
