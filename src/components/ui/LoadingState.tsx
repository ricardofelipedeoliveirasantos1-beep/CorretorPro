import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  message?: string
  fullScreen?: boolean
}

export function LoadingState({ message = 'Carregando...', fullScreen = false }: LoadingStateProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
        <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
        <p className="mt-4 text-sm font-medium text-base-600">{message}</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      <p className="mt-4 text-sm text-base-500">{message}</p>
    </div>
  )
}
