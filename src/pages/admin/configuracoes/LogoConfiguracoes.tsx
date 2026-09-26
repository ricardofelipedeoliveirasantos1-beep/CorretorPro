import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Image as ImageIcon, Info, ArrowLeft } from 'lucide-react'
import { InlineFeedback, type FeedbackType } from '../../../components/ui/InlineFeedback'

export function LogoConfiguracoes() {
  const navigate = useNavigate()
  const [logo, setLogo] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: FeedbackType, text: string, visible: boolean }>({ type: 'success', text: '', visible: false })

  useEffect(() => {
    const savedLogo = localStorage.getItem('crm_logo')
    if (savedLogo) {
      setLogo(savedLogo)
      setPreview(savedLogo)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validação de tamanho (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'A imagem excede o tamanho máximo permitido de 2 MB.', visible: true })
      return
    }

    // Validação de tipo
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Formato não suportado. Use PNG ou SVG.', visible: true })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string

      // Validação de dimensão/proporção
      const img = new Image()
      img.onload = () => {
        const ratio = img.width / img.height

        // Verifica se a proporção está muito distante de 3:1 (ex: entre 2.0 e 4.0)
        if (ratio < 2.0 || ratio > 4.0) {
          setMessage({
            type: 'warning',
            text: 'Atenção: esta imagem não está próxima da proporção recomendada de 3:1 e pode aparecer pequena ou desalinhada no cabeçalho.',
            visible: true
          })
        } else {
          setMessage(prev => ({ ...prev, visible: false }))
        }

        setPreview(result)
      }
      img.src = result
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (preview) {
      localStorage.setItem('crm_logo', preview)
      setLogo(preview)
      setMessage({ type: 'success', text: 'Logo atualizada com sucesso!', visible: true })
      window.dispatchEvent(new Event('logoChanged')) // Dispara evento para o header atualizar
    }
  }

  const handleRestoreDefault = () => {
    localStorage.removeItem('crm_logo')
    setLogo(null)
    setPreview(null)
    setMessage({ type: 'success', text: 'Logo padrão restaurada.', visible: true })
    window.dispatchEvent(new Event('logoChanged'))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate('/configuracoes')}
          className="flex items-center text-sm font-medium text-[#475569] dark:text-[#94A3B8] hover:text-[#1685FF] dark:hover:text-[#1685FF] transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </button>
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Sua Logo</h2>
          <p className="text-sm text-[#475569] dark:text-[#94A3B8]">Personalize a logo exibida no cabeçalho e na navegação do sistema.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0A1E39] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)] rounded-[16px] shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Preview Area */}
            <div className="flex flex-col items-center gap-4 w-full lg:w-auto shrink-0">
              <div className="w-full lg:w-64 h-32 rounded-[12px] border-2 border-dashed border-[#CBD5E1] dark:border-[#1E3048] flex items-center justify-center bg-gray-50 dark:bg-[#06152B] overflow-hidden relative group">
                {preview ? (
                  <img src={preview} alt="Preview da Logo" className="w-full h-full object-contain p-4" />
                ) : (
                  <div className="text-center p-4">
                    <span className="text-[28px] font-bold tracking-tight block">
                      <span className="text-[#0F172A] dark:text-[#F8FAFC]">Imob</span>
                      <span className="text-[#1685FF]">CRM</span>
                    </span>
                    <span className="text-xs text-gray-400 mt-2 block">Logo Padrão</span>
                  </div>
                )}

                {preview && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm font-medium">Preview (object-fit: contain)</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full gap-3 mt-2">
                <label className="flex w-full items-center justify-center px-4 py-3 border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.2)] rounded-[8px] cursor-pointer hover:bg-gray-50 dark:hover:bg-[#112745] transition-colors text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                  <ImageIcon className="w-4 h-4 mr-2 text-[#64748B]" />
                  <span>Escolher arquivo...</span>
                  <input type="file" className="hidden" accept="image/png, image/jpeg, image/jpg, image/svg+xml" onChange={handleFileChange} />
                </label>

                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={!preview || preview === logo}
                    className="flex-1 px-4 py-3 bg-[#1685FF] hover:bg-[#005CE6] text-white text-sm font-semibold rounded-[8px] shadow-lg shadow-[#1685FF]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Salvar
                  </button>

                  {logo && (
                    <button
                      onClick={handleRestoreDefault}
                      className="px-4 py-3 border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/10 text-sm font-semibold rounded-[8px] transition-colors"
                      title="Restaurar padrão"
                    >
                      Padrão
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Informações e Avisos */}
            <div className="flex-1 space-y-5 w-full relative">

              <InlineFeedback
                type={message.type}
                message={message.text}
                visible={message.visible}
                duration={message.type === 'success' ? 1000 : 3000}
                onClose={() => setMessage(prev => ({ ...prev, visible: false }))}
                className="static mb-4"
              />

              <div className="bg-[#F8FAFC] dark:bg-[#06152B] p-5 rounded-[12px] border border-[#E2E8F0] dark:border-[rgba(25,146,255,0.1)]">
                <h4 className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-[#1685FF]" />
                  Recomendações para a Logo Ideal
                </h4>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EAF3FF] text-[#005CE6] dark:bg-[rgba(22,133,255,0.15)] dark:text-[#60A5FA]">
                    600 × 200 px
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EAF3FF] text-[#005CE6] dark:bg-[rgba(22,133,255,0.15)] dark:text-[#60A5FA]">
                    Proporção 3:1
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#EAF3FF] text-[#005CE6] dark:bg-[rgba(22,133,255,0.15)] dark:text-[#60A5FA]">
                    Máximo 2 MB
                  </span>
                </div>

                <ul className="space-y-3 text-[13px] text-[#475569] dark:text-[#CBD5E1]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1685FF] mt-0.5">•</span>
                    <span><strong>Formato:</strong> PNG ou SVG transparente. <em>(Prefira fundo transparente para melhor adaptação aos temas claro e escuro).</em></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1685FF] mt-0.5">•</span>
                    <span><strong>Tamanho Mínimo:</strong> 300 × 100 px para manter a nitidez.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EF4444] mt-0.5">•</span>
                    <span><strong>Evite imagens quadradas, muito altas ou com fundo sólido</strong>, pois podem ficar pequenas ou desalinhadas no cabeçalho.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
