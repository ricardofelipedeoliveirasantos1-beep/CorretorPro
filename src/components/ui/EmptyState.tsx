import { type ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-base-300 bg-base-50 p-8 text-center sm:p-12">
      {icon && <div className="mb-4 text-base-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-base-900">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-base-500">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
