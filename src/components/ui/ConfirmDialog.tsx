import { Button } from './Button'
import { AlertTriangle, Trash2 } from 'lucide-react'

export interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'primary'
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger'
}: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0A1F3D] border border-slate-200 dark:border-[#168CFF]/20 rounded-[22px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
              variant === 'danger' ? 'bg-[#E11D48]/10 text-[#E11D48]' :
              variant === 'warning' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
              'bg-[#168CFF]/10 text-[#168CFF]'
            }`}>
              {variant === 'danger' ? <Trash2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
              {title}
            </h2>
          </div>

          <p className="text-slate-600 dark:text-[#94A3B8] text-[15px] mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-[12px] h-12 dark:border-white/10 dark:text-[#F8FAFC] dark:hover:bg-white/5"
              onClick={onCancel}
            >
              {cancelText}
            </Button>
            <Button
              className={`flex-1 rounded-[12px] h-12 text-white border-none transition-all ${
                variant === 'danger' ? 'bg-[#E11D48] hover:bg-[#BE123C] shadow-[0_4px_16px_rgba(225,29,72,0.3)]' :
                variant === 'warning' ? 'bg-[#F59E0B] hover:bg-[#D97706] shadow-[0_4px_16px_rgba(245,158,11,0.3)]' :
                'bg-[#168CFF] hover:bg-[#1992FF] shadow-[0_4px_16px_rgba(22,140,255,0.3)]'
              }`}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
