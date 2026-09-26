import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react'
import { useEffect, useState } from 'react'

export type FeedbackType = 'success' | 'error' | 'warning' | 'info'

export interface InlineFeedbackProps {
  type: FeedbackType
  message: string
  visible: boolean
  duration?: number
  onClose?: () => void
  className?: string
}

export function InlineFeedback({
  type,
  message,
  visible,
  duration,
  onClose,
  className = ''
}: InlineFeedbackProps) {
  const [show, setShow] = useState(visible)

  useEffect(() => {
    setShow(visible)

    if (visible && duration && duration > 0) {
      const timer = setTimeout(() => {
        setShow(false)
        if (onClose) onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onClose])

  const config = {
    success: {
      bg: 'bg-[#052E16] dark:bg-[#052E16] bg-[#D1FAE5]', // Fallback
      border: 'border-[#10B981]/30',
      text: 'text-[#065F46] dark:text-[#D1FAE5]',
      icon: <CheckCircle2 className="h-5 w-5 text-[#10B981] shrink-0" />,
      shadow: 'shadow-[0_4px_12px_rgba(16,185,129,0.15)]'
    },
    error: {
      bg: 'bg-[#450A0A] dark:bg-[#450A0A] bg-[#FEE2E2]',
      border: 'border-[#EF4444]/30',
      text: 'text-[#991B1B] dark:text-[#FECACA]',
      icon: <XCircle className="h-5 w-5 text-[#EF4444] shrink-0" />,
      shadow: 'shadow-[0_4px_12px_rgba(239,68,68,0.15)]'
    },
    warning: {
      bg: 'bg-[#451A03] dark:bg-[#451A03] bg-[#FEF3C7]',
      border: 'border-[#F59E0B]/30',
      text: 'text-[#92400E] dark:text-[#FDE68A]',
      icon: <AlertTriangle className="h-5 w-5 text-[#F59E0B] shrink-0" />,
      shadow: 'shadow-[0_4px_12px_rgba(245,158,11,0.15)]'
    },
    info: {
      bg: 'bg-[#082F49] dark:bg-[#082F49] bg-[#E0F2FE]',
      border: 'border-[#3B82F6]/30',
      text: 'text-[#075985] dark:text-[#BAE6FD]',
      icon: <Info className="h-5 w-5 text-[#3B82F6] shrink-0" />,
      shadow: 'shadow-[0_4px_12px_rgba(59,130,246,0.15)]'
    }
  }

  const { icon } = config[type]

  // Fix tailwind classes not applying conditionally when composed in a string
  // Let's use simple string interpolation and let Tailwind compile them if they exist
  // We'll hardcode the colors to be safe for light/dark mode

  const getStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-[#D1FAE5] dark:bg-[#052E16] border-[#10B981]/30 text-[#065F46] dark:text-[#D1FAE5] shadow-[0_4px_12px_rgba(16,185,129,0.15)]'
      case 'error':
        return 'bg-[#FEE2E2] dark:bg-[#450A0A] border-[#EF4444]/30 text-[#991B1B] dark:text-[#FECACA] shadow-[0_4px_12px_rgba(239,68,68,0.15)]'
      case 'warning':
        return 'bg-[#FEF3C7] dark:bg-[#451A03] border-[#F59E0B]/30 text-[#92400E] dark:text-[#FDE68A] shadow-[0_4px_12px_rgba(245,158,11,0.15)]'
      case 'info':
        return 'bg-[#E0F2FE] dark:bg-[#082F49] border-[#3B82F6]/30 text-[#075985] dark:text-[#BAE6FD] shadow-[0_4px_12px_rgba(59,130,246,0.15)]'
    }
  }

  return (
    <div
      className={`transition-all duration-200 ease-in-out overflow-hidden w-full ${
        show ? 'max-h-[150px] opacity-100 mt-0 mb-3' : 'max-h-0 opacity-0 mt-0 mb-0'
      } ${className}`}
      role="status"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <div className={`rounded-[14px] border p-4 flex items-center gap-3 ${getStyle()}`}>
        {icon}
        <span className="text-[14px] font-medium leading-tight">
          {message}
        </span>
      </div>
    </div>
  )
}
