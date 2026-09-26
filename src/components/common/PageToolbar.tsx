import type { ReactNode } from 'react'

interface PageToolbarProps {
  primaryAction?: ReactNode
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  filters?: ReactNode
}

export function PageToolbar({ primaryAction, searchPlaceholder, onSearch, filters }: PageToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 mb-6 w-full">
      {/* Search Bar - Full width on mobile, max-width on desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
        {searchPlaceholder && (
          <div className="relative w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-[#64748B] dark:text-[#94A3B8]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="text"
              className="block w-full p-2.5 pl-10 text-[14px] text-[#0F172A] bg-white border border-[#E2E8F0] rounded-[10px] focus:ring-[#1685FF] focus:border-[#1685FF] dark:bg-[#0A1E39] dark:border-[rgba(25,146,255,0.2)] dark:placeholder-[#475569] dark:text-white transition-colors"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </div>
        )}

        {/* Actions Row - Filters and Primary Action side by side or stacked based on space */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {filters && (
            <div className="flex-1 sm:flex-none">
              {filters}
            </div>
          )}
          {primaryAction && (
            <div className="flex-1 sm:flex-none shrink-0">
              {primaryAction}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
