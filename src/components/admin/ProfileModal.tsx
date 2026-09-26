import { useState, useEffect, useRef } from 'react'
import { X, Upload, Camera } from 'lucide-react'

interface ProfileData {
  first_name: string
  last_name: string
  creci_state: string
  creci_number: string
  avatar_url: string
}

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  initialData: ProfileData
  onSave: (data: ProfileData) => void
}

const ufs = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN',
  'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
]

export function ProfileModal({ isOpen, onClose, initialData, onSave }: ProfileModalProps) {
  const [formData, setFormData] = useState<ProfileData>(initialData)
  const [preview, setPreview] = useState<string | null>(initialData.avatar_url)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData)
      setPreview(initialData.avatar_url)
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setPreview(base64String)
        setFormData(prev => ({ ...prev, avatar_url: base64String }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white dark:bg-[#06152B] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.15)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] shrink-0">
          <h2 className="text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">Mudar Perfil</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-[#0A1E39]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar p-6">
          <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">

            {/* Foto */}
            <div className="flex flex-col items-center">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-[100px] h-[100px] rounded-full bg-[#EAF3FF] dark:bg-[#0A1E39] border-2 border-[#1685FF] overflow-hidden flex items-center justify-center shadow-md">
                  {preview ? (
                    <img src={preview} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 text-[#1685FF] opacity-50" />
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="mt-3 text-[13px] text-[#64748B] dark:text-[#94A3B8]">Clique para alterar a foto</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />
            </div>

            {/* Nome */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#475569] dark:text-[#94A3B8] mb-1.5">Nome</label>
                <input
                  required
                  type="text"
                  value={formData.first_name}
                  onChange={e => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                  className="w-full h-[42px] px-3 bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.15)] rounded-lg text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-[#1685FF] focus:ring-1 focus:ring-[#1685FF] transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#475569] dark:text-[#94A3B8] mb-1.5">Sobrenome</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={e => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                  className="w-full h-[42px] px-3 bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.15)] rounded-lg text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-[#1685FF] focus:ring-1 focus:ring-[#1685FF] transition-colors"
                  placeholder="Seu sobrenome"
                />
              </div>
            </div>

            {/* CRECI */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-[13px] font-semibold text-[#475569] dark:text-[#94A3B8] mb-1.5">UF CRECI</label>
                <select
                  value={formData.creci_state}
                  onChange={e => setFormData(prev => ({ ...prev, creci_state: e.target.value }))}
                  className="w-full h-[42px] px-3 bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.15)] rounded-lg text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-[#1685FF] focus:ring-1 focus:ring-[#1685FF] transition-colors appearance-none"
                >
                  <option value="">UF</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-[13px] font-semibold text-[#475569] dark:text-[#94A3B8] mb-1.5">Número CRECI</label>
                <input
                  type="text"
                  value={formData.creci_number}
                  onChange={e => setFormData(prev => ({ ...prev, creci_number: e.target.value }))}
                  className="w-full h-[42px] px-3 bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.15)] rounded-lg text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-[#1685FF] focus:ring-1 focus:ring-[#1685FF] transition-colors"
                  placeholder="Ex: 8.421"
                />
              </div>
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] flex gap-3 bg-gray-50 dark:bg-[rgba(10,30,57,0.5)] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[42px] rounded-lg font-semibold text-[14px] text-[#475569] dark:text-[#B8C4D9] bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.15)] hover:bg-gray-50 dark:hover:bg-[#112745] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="profile-form"
            className="flex-1 h-[42px] rounded-lg font-bold text-[14px] text-white bg-[#1685FF] hover:bg-[#005CE6] transition-colors shadow-sm"
          >
            Salvar Perfil
          </button>
        </div>
      </div>
    </div>
  )
}
