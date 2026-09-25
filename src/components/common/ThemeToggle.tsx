import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { cn } from '../../utils/cn'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className={cn(
        'relative flex h-[44px] w-[120px] items-center rounded-full p-1 transition-colors duration-300',
        theme === 'light'
          ? 'border border-[#CBD5E1] bg-[#EAF3FF]'
          : 'border border-[#2A3B57] bg-[#15223A]'
      )}
    >
      <div
        className={cn(
          'absolute left-1 top-1 flex h-[34px] w-[56px] transform items-center justify-center rounded-full bg-blue-600 transition-transform duration-300',
          theme === 'dark' ? 'translate-x-[54px]' : 'translate-x-0'
        )}
      />
      <div className="relative z-10 flex w-full justify-between px-3">
        <Sun
          className={cn(
            'h-5 w-5 transition-colors duration-300',
            theme === 'light' ? 'text-white' : 'text-slate-400'
          )}
        />
        <Moon
          className={cn(
            'h-5 w-5 transition-colors duration-300',
            theme === 'dark' ? 'text-white' : 'text-slate-400'
          )}
        />
      </div>
    </button>
  )
}
