import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Trash2, MapPin, Bed, Bath, Car, Maximize, Check, FileText, Star, Building2, User, ChevronRight, UserRoundCog, Save, Settings } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { mockProperties } from '../../../mocks/mockProperties'
import { PropertyMediaGallery } from '../../../components/properties/PropertyMediaGallery'
import { InlineFeedback } from '../../../components/ui/InlineFeedback'
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog'

type DisplayPreference = 'Proprietário' | 'Corretor' | 'Ambos'

export function PropertyDetail() {
  const { id } = useParams()
  const property = mockProperties.find(p => p.id === id) || mockProperties[0]
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)

  // Exibição Preference State
  const [displayPreference, setDisplayPreference] = useState<DisplayPreference>('Ambos')
  const [tempPreference, setTempPreference] = useState<DisplayPreference>('Ambos')

  useEffect(() => {
    // Load preference from localStorage based on property ID
    if (property.id) {
      const saved = localStorage.getItem(`propertyDisplayPreference_${property.id}`) as DisplayPreference
      if (saved && ['Proprietário', 'Corretor', 'Ambos'].includes(saved)) {
        setDisplayPreference(saved)
        setTempPreference(saved)
      }
    }
  }, [property.id])

  const price = property.purpose === 'Venda'
    ? property.salePrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : property.rentPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const handleDelete = () => {
    // Mock delete action
    setShowDeleteConfirm(false)
    setShowDeleteSuccess(true)
  }

  const handleSavePreference = () => {
    setDisplayPreference(tempPreference)
    if (property.id) {
      localStorage.setItem(`propertyDisplayPreference_${property.id}`, tempPreference)
    }

    setShowSuccessMessage(true)

    setTimeout(() => {
      setShowSuccessMessage(false)
      setIsConfigOpen(false)
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-[1440px] space-y-6 pb-32 lg:pb-16 font-sans">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="h-10 px-4 text-base-500 hover:text-base-900 dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] dark:hover:bg-white/5 transition-colors" asChild>
          <Link to="/imoveis"><ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Imóveis</Link>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column (70%) */}
        <div className="flex-1 w-full lg:w-[70%] space-y-6 min-w-0">

          {/* Main Gallery Card with Overlay */}
          <div className="relative rounded-[20px] overflow-hidden bg-[#0A1F3D] shadow-[0_8px_24px_rgba(0,0,0,0.25)] border border-[#168CFF]/20 group">
            {/* Gallery (uses object-cover, sets height) */}
            <div className="h-[250px] sm:h-[320px] lg:h-[400px] w-full relative">
              <PropertyMediaGallery photos={property.photos} videos={property.videos} />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#051124] via-[#051124]/50 to-transparent pointer-events-none" />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 pointer-events-none flex flex-col justify-end">
                <div className="flex flex-wrap items-center gap-2 mb-4 pointer-events-auto">
                  <span className="inline-flex rounded-full bg-base-900/40 dark:bg-black/40 border border-white/20 backdrop-blur-md px-3 py-1 text-sm font-medium text-white shadow-sm">
                    {property.type}
                  </span>
                  <span className="inline-flex rounded-full bg-[#10B981] px-3 py-1 text-sm font-bold text-white shadow-sm">
                    {property.purpose}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-white leading-tight mb-3 drop-shadow-md break-words">
                  {property.title}
                </h1>

                <div className="flex items-center text-white/90 text-sm sm:text-base font-medium drop-shadow">
                  <MapPin className="mr-2 h-5 w-5 text-[#168CFF] shrink-0" />
                  <span className="truncate">{property.address.street}, {property.address.number} - {property.address.neighborhood}, {property.address.city} - {property.address.state}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Cards (Area, Quartos, Banheiros, Vagas) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col p-5 rounded-[18px] border border-[#168CFF]/20 bg-[#081B33] shadow-[0_8px_24px_rgba(0,0,0,0.25)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#168CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="h-12 w-12 rounded-[14px] bg-[#168CFF]/10 flex items-center justify-center shrink-0">
                  <Maximize className="h-6 w-6 text-[#168CFF]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-medium text-[#94A3B8] mb-1 truncate">Área Útil</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#F8FAFC] truncate">{property.features.builtArea}m²</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-5 rounded-[18px] border border-[#168CFF]/20 bg-[#081B33] shadow-[0_8px_24px_rgba(0,0,0,0.25)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#168CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="h-12 w-12 rounded-[14px] bg-[#168CFF]/10 flex items-center justify-center shrink-0">
                  <Bed className="h-6 w-6 text-[#168CFF]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-medium text-[#94A3B8] mb-1 truncate">Quartos</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#F8FAFC] truncate">
                    {property.features.bedrooms} <span className="text-sm text-[#94A3B8] font-normal">({property.features.suites} suítes)</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-5 rounded-[18px] border border-[#168CFF]/20 bg-[#081B33] shadow-[0_8px_24px_rgba(0,0,0,0.25)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#168CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="h-12 w-12 rounded-[14px] bg-[#168CFF]/10 flex items-center justify-center shrink-0">
                  <Bath className="h-6 w-6 text-[#168CFF]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-medium text-[#94A3B8] mb-1 truncate">Banheiros</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#F8FAFC] truncate">{property.features.bathrooms}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-5 rounded-[18px] border border-[#168CFF]/20 bg-[#081B33] shadow-[0_8px_24px_rgba(0,0,0,0.25)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#168CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="h-12 w-12 rounded-[14px] bg-[#168CFF]/10 flex items-center justify-center shrink-0">
                  <Car className="h-6 w-6 text-[#168CFF]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-medium text-[#94A3B8] mb-1 truncate">Vagas</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#F8FAFC] truncate">{property.features.parkingSpaces}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="rounded-[22px] border border-[#168CFF]/20 bg-[#0A1F3D] p-6 sm:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-[#168CFF]/10 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-[#168CFF]" />
              </div>
              <h2 className="text-[22px] font-bold text-[#F8FAFC]">Descrição</h2>
            </div>
            <p className="text-[16px] text-[#CBD5E1] leading-[1.7] whitespace-pre-wrap">
              {property.description}
            </p>
          </div>

          {/* Diferenciais */}
          <div className="rounded-[22px] border border-[#168CFF]/20 bg-[#0A1F3D] p-6 sm:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-[#168CFF]/10 flex items-center justify-center shrink-0">
                <Star className="h-5 w-5 text-[#168CFF]" />
              </div>
              <h2 className="text-[22px] font-bold text-[#F8FAFC]">Diferenciais</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {property.amenities.hasPool && (
                <div className="flex items-center gap-3 bg-[#081B33] border border-[#168CFF]/10 p-3 rounded-[12px]">
                  <div className="h-6 w-6 rounded-full bg-[#168CFF] flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[#E2E8F0] font-medium text-sm">Piscina</span>
                </div>
              )}
              {property.amenities.hasGym && (
                <div className="flex items-center gap-3 bg-[#081B33] border border-[#168CFF]/10 p-3 rounded-[12px]">
                  <div className="h-6 w-6 rounded-full bg-[#168CFF] flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[#E2E8F0] font-medium text-sm">Academia</span>
                </div>
              )}
              {property.amenities.hasGourmetArea && (
                <div className="flex items-center gap-3 bg-[#081B33] border border-[#168CFF]/10 p-3 rounded-[12px]">
                  <div className="h-6 w-6 rounded-full bg-[#168CFF] flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[#E2E8F0] font-medium text-sm">Área Gourmet</span>
                </div>
              )}
              {property.amenities.hasBalcony && (
                <div className="flex items-center gap-3 bg-[#081B33] border border-[#168CFF]/10 p-3 rounded-[12px]">
                  <div className="h-6 w-6 rounded-full bg-[#168CFF] flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[#E2E8F0] font-medium text-sm">Varanda</span>
                </div>
              )}
              {property.amenities.hasElevator && (
                <div className="flex items-center gap-3 bg-[#081B33] border border-[#168CFF]/10 p-3 rounded-[12px]">
                  <div className="h-6 w-6 rounded-full bg-[#168CFF] flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[#E2E8F0] font-medium text-sm">Elevador</span>
                </div>
              )}
              {property.amenities.allowsPets && (
                <div className="flex items-center gap-3 bg-[#081B33] border border-[#168CFF]/10 p-3 rounded-[12px]">
                  <div className="h-6 w-6 rounded-full bg-[#168CFF] flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[#E2E8F0] font-medium text-sm">Aceita Pets</span>
                </div>
              )}
              {property.amenities.others?.map(amenity => (
                <div key={amenity} className="flex items-center gap-3 bg-[#081B33] border border-[#168CFF]/10 p-3 rounded-[12px]">
                  <div className="h-6 w-6 rounded-full bg-[#168CFF] flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-[#E2E8F0] font-medium text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Localização (Card) */}
          <div className="rounded-[22px] border border-[#168CFF]/20 bg-[#0A1F3D] p-6 sm:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#168CFF]/10 flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6 text-[#168CFF]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-1">Localização</h3>
                <p className="text-sm text-[#CBD5E1]">
                  {property.address.street}, {property.address.number}
                  {property.address.complement && ` - ${property.address.complement}`}
                  <br />
                  {property.address.neighborhood}, {property.address.city} - {property.address.state}
                </p>
              </div>
            </div>

            {property.mapsUrl ? (
              <Button asChild className="w-full sm:w-auto bg-[#168CFF] hover:bg-[#1992FF] text-white font-medium border-none shadow-[0_4px_12px_rgba(22,140,255,0.4)] px-6 py-2.5 rounded-xl">
                <a href={property.mapsUrl} target="_blank" rel="noopener noreferrer">Ver no Maps</a>
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full sm:w-auto border-[#168CFF]/30 text-[#168CFF] hover:bg-[#168CFF]/10 rounded-xl">
                <Link to={`/imoveis/${property.id}/editar`}>Adicionar Localização</Link>
              </Button>
            )}
          </div>

        </div>

        {/* Right Column (30%) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-5 min-w-0">

          {/* Card Valores */}
          <div className="rounded-[22px] border border-[#168CFF]/30 bg-gradient-to-br from-[#081B33] to-[#051124] p-6 sm:p-8 shadow-[0_8px_32px_rgba(22,140,255,0.15)] relative overflow-hidden w-full">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#168CFF]/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex items-center gap-2 text-[#94A3B8] font-bold text-[11px] uppercase tracking-[0.1em] mb-4">
              <span className="h-6 w-6 rounded-full bg-[#168CFF]/20 flex items-center justify-center text-[#168CFF] shrink-0">
                $
              </span>
              VALOR DE {property.purpose.toUpperCase()}
            </div>

            <div className="w-full overflow-hidden mb-8">
              <div className="font-extrabold text-[#168CFF] tracking-tight leading-none drop-shadow-[0_2px_10px_rgba(22,140,255,0.3)] truncate text-[clamp(24px,3vw+0.5rem,44px)]">
                {price}
              </div>
            </div>

            <div className="space-y-4">
              {property.condoFee ? (
                <div className="flex items-center justify-between border-b border-[#168CFF]/10 pb-4">
                  <div className="flex items-center gap-2 text-[#94A3B8] min-w-0 mr-2">
                    <Building2 className="h-4 w-4 shrink-0" />
                    <span className="text-[15px] truncate">Condomínio</span>
                  </div>
                  <span className="text-[16px] font-bold text-[#F8FAFC] whitespace-nowrap">
                    {property.condoFee.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              ) : null}
              {property.iptu ? (
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 text-[#94A3B8] min-w-0 mr-2">
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="text-[15px] truncate">IPTU (Anual)</span>
                  </div>
                  <span className="text-[16px] font-bold text-[#F8FAFC] whitespace-nowrap">
                    {property.iptu.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Card Proprietário e Corretor */}
          <div className="rounded-[22px] border border-[#168CFF]/20 bg-[#0A1F3D] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex flex-col gap-6">

            {/* Proprietário */}
            {(displayPreference === 'Proprietário' || displayPreference === 'Ambos') && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[#94A3B8] font-bold text-[11px] uppercase tracking-[0.1em] mb-5">
                  <User className="h-4 w-4" />
                  PROPRIETÁRIO
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#168CFF] to-[#3B82F6] flex items-center justify-center text-white font-bold text-xl shadow-[0_4px_12px_rgba(22,140,255,0.4)] shrink-0">
                    {(property.ownerName?.[0] || 'C')}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-[18px] font-bold text-[#F8FAFC] truncate">{property.ownerName || 'Carlos Ferreira'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Divider if both are shown */}
            {displayPreference === 'Ambos' && (
              <hr className="border-t border-[#168CFF]/10 w-full" />
            )}

            {/* Corretor responsável */}
            {(displayPreference === 'Corretor' || displayPreference === 'Ambos') && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[#94A3B8] font-bold text-[11px] uppercase tracking-[0.1em] mb-4">
                  <UserRoundCog className="h-4 w-4" />
                  CORRETOR
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] text-[#94A3B8] mb-0.5 truncate">Corretor responsável</span>
                  <span className="text-[20px] font-bold text-[#F8FAFC] truncate">Andre Coragem</span>
                </div>
              </div>
            )}

          </div>

          {/* Configurar Exibição */}
          <div className="rounded-[22px] border border-[#168CFF]/20 bg-[#0A1F3D] shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden transition-all duration-200">
            {/* Header (Always Visible) */}
            <button
              onClick={() => {
                if (!isConfigOpen) setTempPreference(displayPreference);
                setIsConfigOpen(!isConfigOpen);
              }}
              className="w-full flex items-center justify-between p-4 sm:p-5 sm:h-[60px] h-[56px] bg-transparent hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168CFF]"
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-[#168CFF]" />
                <span className="text-[#F8FAFC] font-bold text-[15px] sm:text-[16px]">Configurar Exibição</span>
              </div>
              <div className="flex items-center gap-2">
                {!isConfigOpen && (
                  <span className="text-[12px] sm:text-[13px] text-[#94A3B8] font-medium hidden sm:inline-block">
                    Atual: <span className="text-[#F8FAFC]">{displayPreference}</span>
                  </span>
                )}
                <ChevronRight className={`h-5 w-5 text-[#168CFF] transition-transform duration-200 ${isConfigOpen ? 'rotate-90' : ''}`} />
              </div>
            </button>

            {/* Expandable Content */}
            {isConfigOpen && (
              <div className="p-5 sm:p-6 pt-0 border-t border-[#168CFF]/10 flex flex-col gap-5">
                <div className="flex flex-col gap-1 mt-4">
                  <p className="text-[13px] text-[#94A3B8] leading-tight">Escolha quais informações serão exibidas no imóvel.</p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full">
                  {['Proprietário', 'Corretor', 'Ambos'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setTempPreference(option as DisplayPreference)}
                      className={`flex-1 flex items-center justify-center gap-2 h-11 px-3 rounded-[12px] border transition-all ${
                        tempPreference === option
                        ? 'border-[#168CFF] bg-[#168CFF]/10 shadow-[0_0_12px_rgba(22,140,255,0.2)]'
                        : 'border-[#168CFF]/20 bg-[#081B33] hover:border-[#168CFF]/40'
                      }`}
                    >
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                        tempPreference === option ? 'border-[#168CFF]' : 'border-[#94A3B8]'
                      }`}>
                        {tempPreference === option && <div className="h-2 w-2 rounded-full bg-[#168CFF]" />}
                      </div>
                      <span className={`text-[13px] font-medium truncate ${
                        tempPreference === option ? 'text-[#F8FAFC]' : 'text-[#94A3B8]'
                      }`}>
                        {option}
                      </span>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleSavePreference}
                  className="w-full bg-[#168CFF] hover:bg-[#1992FF] text-white border-none rounded-[14px] h-12 font-bold shadow-[0_4px_16px_rgba(22,140,255,0.3)] transition-all"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
              </div>
            )}
          </div>

          {/* Success Message Card (Rendered locally below Configurar Exibição) */}
          <InlineFeedback
            type="success"
            message="Preferência de exibição salva com sucesso."
            visible={showSuccessMessage}
            duration={1000}
            onClose={() => {
              setShowSuccessMessage(false)
              setIsConfigOpen(false)
            }}
          />

          {/* Ações Extra (Excluir) */}
          <div className="pt-2 flex flex-col gap-3">
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full bg-[#E11D48] hover:bg-[#BE123C] text-white border-none rounded-[14px] h-[52px] font-bold shadow-[0_4px_16px_rgba(225,29,72,0.3)] transition-all"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Excluir Imóvel
            </Button>

            <InlineFeedback
              type="success"
              message="Imóvel excluído com sucesso."
              visible={showDeleteSuccess}
              duration={1000}
              onClose={() => setShowDeleteSuccess(false)}
            />

            <ConfirmDialog
              isOpen={showDeleteConfirm}
              title="Confirmar exclusão"
              message="Tem certeza que deseja excluir este imóvel?"
              onConfirm={handleDelete}
              onCancel={() => setShowDeleteConfirm(false)}
              confirmText="Excluir"
              cancelText="Cancelar"
              variant="danger"
            />
          </div>

        </div>
      </div>
    </div>
  )
}
