import { type ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'md',
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-base-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className={cn(
          'z-50 flex w-full flex-col bg-white shadow-xl sm:rounded-xl',
          'h-[100dvh] sm:h-auto sm:max-h-[85vh]',
          {
            'sm:max-w-sm': maxWidth === 'sm',
            'sm:max-w-md': maxWidth === 'md',
            'sm:max-w-lg': maxWidth === 'lg',
            'sm:max-w-xl': maxWidth === 'xl',
            'sm:max-w-2xl': maxWidth === '2xl',
          }
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-200 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-base-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-base-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5 text-base-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-base-200 px-4 py-4 sm:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
