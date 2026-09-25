import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-base-50">
      {/* Left side: branding/commercial info (hidden on mobile) */}
      <div className="hidden w-1/2 flex-col justify-center bg-primary-900 p-12 text-white lg:flex">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold tracking-tight">CorretorPro</h1>
          <p className="mt-4 text-lg text-primary-100">
            Seu CRM e portal imobiliário em um único lugar.
            Gerencie imóveis, clientes e negociações com facilidade.
          </p>
        </div>
      </div>

      {/* Right side: form area */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center lg:hidden">
            <h1 className="text-3xl font-bold text-primary-600">CorretorPro</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
