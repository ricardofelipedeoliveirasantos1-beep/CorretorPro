import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Home, MapPin, BedDouble, Bath, Car, ArrowRight, ImageOff } from 'lucide-react'
import { type Property } from '../../types/property'
import { cn } from '../../utils/cn'

interface Props {
  properties: Property[]
}

const formatCurrency = (val: number) => {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const getRelativeTime = (isoString?: string) => {
  if (!isoString) return '';
  const diffMs = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Agora mesmo';
  if (minutes < 60) return `Há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Há ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Adicionado ontem';
  return `Adicionado há ${days} dias`;
}

export function RecentPropertiesCarousel({ properties }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[1]?.clientWidth || 300 // 0 is style tag
      scrollRef.current.scrollBy({ left: -cardWidth - 16, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[1]?.clientWidth || 300
      scrollRef.current.scrollBy({ left: cardWidth + 16, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col rounded-[20px] bg-white p-[16px] lg:p-[20px] border-[1.5px] border-[#00D1B2] dark:border-[rgba(0,209,178,0.6)] shadow-[0_6px_18px_rgba(15,23,42,0.05)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.25),0_0_16px_rgba(0,209,178,0.15)] dark:bg-[#0A1E39] transition-colors duration-300 w-full overflow-hidden mt-2 lg:mt-0 mb-4 lg:mb-[18px]">
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-[40px] w-[40px] md:h-[44px] md:w-[44px] items-center justify-center rounded-[12px] bg-[#F0FDFA] dark:bg-[rgba(0,209,178,0.15)] text-[#00D1B2]">
            <Home className="w-[20px] h-[20px]" />
          </div>
          <div>
            <h2 className="text-[16.5px] md:text-[18px] font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-none">
              Novos Imóveis
            </h2>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">Últimos imóveis cadastrados</p>
          </div>
        </div>
        <Link
          to="/imoveis"
          className="text-sm font-medium text-[#1685FF] hover:text-blue-700 dark:hover:text-blue-400 flex items-center shrink-0"
        >
          Ver todos <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          Nenhum imóvel disponível no momento.
        </div>
      ) : (
        <div className="relative group">
          {/* Left Arrow */}
          <button 
            onClick={scrollLeft}
            aria-label="Imóveis anteriores"
            className="absolute left-[-10px] md:left-[-16px] top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[#071C30] border border-[#168BFF] dark:border-[rgba(0,180,255,0.9)] shadow-[0_4px_12px_rgba(0,120,255,0.15)] dark:shadow-[0_0_8px_rgba(0,174,255,0.4)] text-[#168BFF] dark:text-[#00B4FF] rounded-full p-2 opacity-0 md:group-hover:opacity-100 transition-all disabled:opacity-30 flex items-center justify-center hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel Container */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .flex.gap-4.overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {properties.map(property => {
              const coverPhoto = property.photos?.find(p => p.isCover) || property.photos?.[0]
              const price = property.purpose === 'Venda' ? property.salePrice : property.rentPrice
              
              return (
                <Link 
                  to={`/imoveis/${property.id}`}
                  key={property.id}
                  className="snap-start flex-none w-[88%] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(25%-12px)] flex flex-col bg-white dark:bg-[#071C30] border border-[#168BFF] dark:border-[rgba(0,180,255,0.9)] rounded-[16px] overflow-hidden shadow-[0_4px_16px_rgba(0,120,255,0.12)] dark:shadow-[0_0_8px_rgba(0,174,255,0.35),0_0_16px_rgba(0,174,255,0.18)] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,120,255,0.16)] dark:hover:shadow-[0_0_12px_rgba(0,174,255,0.5),0_0_20px_rgba(0,174,255,0.3)] transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-[140px] md:h-[160px] xl:h-[180px] w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                    {coverPhoto ? (
                      <img src={coverPhoto.url} alt={property.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <ImageOff className="w-8 h-8 mb-1 opacity-50" />
                        <span className="text-xs font-medium">Sem foto</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3.5 md:p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-[#0F172A] dark:text-white text-[15px] md:text-[16px] line-clamp-2 leading-snug min-h-[42px] md:min-h-[45px]">
                      {property.title}
                    </h3>

                    {/* Badges Overlay */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={cn(
                        "px-2.5 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider text-white",
                        property.purpose === 'Venda' ? "bg-[#10B981] dark:shadow-[0_0_6px_rgba(16,185,129,0.5)]" : "bg-[#F97316] dark:shadow-[0_0_6px_rgba(249,115,22,0.5)]"
                      )}>
                        {property.purpose}
                      </span>
                      {property.status && (
                        <span className={cn(
                          "px-2.5 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider text-white",
                          property.status === 'Disponível' ? "bg-[#06B6D4] dark:shadow-[0_0_6px_rgba(6,182,212,0.5)]" :
                          property.status === 'Indisponível' ? "bg-[#EF4444] dark:shadow-[0_0_6px_rgba(239,68,68,0.5)]" :
                          property.status === 'Vendido' ? "bg-[#475569] dark:shadow-[0_0_6px_rgba(71,85,105,0.5)]" :
                          property.status === 'Negociando' ? "bg-[#F59E0B] text-white dark:shadow-[0_0_6px_rgba(245,158,11,0.5)]" :
                          "bg-[#8B5CF6] dark:shadow-[0_0_6px_rgba(139,92,246,0.5)]"
                        )}>
                          {property.status}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3.5 flex items-end justify-between">
                      <div>
                        {price ? (
                          <div className="font-bold text-[18px] md:text-[20px] text-[#0F172A] dark:text-white leading-none">
                            {formatCurrency(price)}
                            {property.purpose === 'Aluguel' && <span className="text-[13px] text-gray-500 dark:text-[#8898B0] font-medium ml-1">/ mês</span>}
                          </div>
                        ) : (
                          <div className="font-bold text-[14px] text-gray-500 dark:text-gray-400">
                            Consulte o valor
                          </div>
                        )}
                      </div>
                    </div>

                    {property.address?.neighborhood && (
                      <p className="flex items-center text-gray-500 dark:text-[#8898B0] text-[13px] mt-2.5 line-clamp-2">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                        {property.address.neighborhood} {property.address.city ? `• ${property.address.city}` : ''}
                      </p>
                    )}

                    {/* Features Row */}
                    <div className="flex items-center gap-3.5 mt-2.5 text-gray-600 dark:text-[#B8C4D9] text-[13px] font-medium">
                      {property.features?.bedrooms > 0 && (
                        <div className="flex items-center gap-1.5" title={`${property.features.bedrooms} quartos`}>
                          <BedDouble className="w-4 h-4 text-gray-400" />
                          <span>{property.features.bedrooms}</span>
                        </div>
                      )}
                      {property.features?.bathrooms > 0 && (
                        <div className="flex items-center gap-1.5" title={`${property.features.bathrooms} banheiros`}>
                          <Bath className="w-4 h-4 text-gray-400" />
                          <span>{property.features.bathrooms}</span>
                        </div>
                      )}
                      {property.features?.parkingSpaces > 0 && (
                        <div className="flex items-center gap-1.5" title={`${property.features.parkingSpaces} vagas`}>
                          <Car className="w-4 h-4 text-gray-400" />
                          <span>{property.features.parkingSpaces}</span>
                        </div>
                      )}
                      {property.features?.totalArea > 0 && (
                        <div className="flex items-center gap-1.5 ml-auto text-gray-500 dark:text-[#8898B0] text-[12px]">
                          <span>{property.features.totalArea} m²</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto pt-3.5">
                      <span className="text-[12px] text-gray-400 dark:text-[#64748B] font-medium flex items-center">
                        📅 {getRelativeTime(property.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={scrollRight}
            aria-label="Próximos imóveis"
            className="absolute right-[-10px] md:right-[-16px] top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[#071C30] border border-[#168BFF] dark:border-[rgba(0,180,255,0.9)] shadow-[0_4px_12px_rgba(0,120,255,0.15)] dark:shadow-[0_0_8px_rgba(0,174,255,0.4)] text-[#168BFF] dark:text-[#00B4FF] rounded-full p-2 opacity-0 md:group-hover:opacity-100 transition-all disabled:opacity-30 flex items-center justify-center hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}
