import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '../ui/Button'
import { type PropertyPhoto } from '../../types/property'

interface PropertyMediaGalleryProps {
  photos: PropertyPhoto[]
  videos?: { id: string; url: string; name?: string }[]
}

export function PropertyMediaGallery({ photos, videos = [] }: PropertyMediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isVideoViewerOpen, setIsVideoViewerOpen] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Sort photos by order, and fallback if missing
  const sortedPhotos = [...photos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, clientWidth } = scrollContainerRef.current
    const newIndex = Math.round(scrollLeft / clientWidth)
    setCurrentIndex(newIndex)
  }

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    container.scrollTo({
      left: index * container.clientWidth,
      behavior: 'smooth'
    })
    setCurrentIndex(index)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex < sortedPhotos.length - 1) {
      scrollToIndex(currentIndex + 1)
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1)
    }
  }

  if (sortedPhotos.length === 0) {
    return (
      <div className="flex aspect-[16/9] w-full flex-col items-center justify-center rounded-xl bg-base-100 text-base-400">
        <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
        <p className="text-sm font-medium">Nenhuma foto disponível</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      {/* Main Gallery Area */}
      <div className="relative h-full w-full group">
        <div
          ref={scrollContainerRef}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          onScroll={handleScroll}
        >
          {sortedPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="min-w-full h-full flex-none snap-center snap-always"
              onClick={() => {
                setCurrentIndex(idx)
                setIsViewerOpen(true)
              }}
            >
              <img
                src={photo.url}
                alt={`Foto ${idx + 1}`}
                className="h-full w-full object-cover cursor-pointer"
                onError={(e) => {
                  // Fallback for broken images
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Imagem+Indispon%C3%ADvel'
                }}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Floating Controls */}
        {sortedPhotos.length > 1 && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/60 active:scale-95 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {currentIndex < sortedPhotos.length - 1 && (
              <button
                onClick={handleNext}
                aria-label="Próxima foto"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/60 active:scale-95 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {currentIndex + 1} / {sortedPhotos.length}
            </div>
          </>
        )}
      </div>

      {/* Videos Button */}
      {videos && videos.length > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="outline"
            className="bg-black/60 text-white border-white/20 hover:bg-black/80 backdrop-blur-sm shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoViewerOpen(true);
            }}
          >
            <Play className="mr-2 h-4 w-4 text-[#168CFF]" />
            Ver vídeos ({videos.length})
          </Button>
        </div>
      )}

      {/* Fullscreen Image Viewer Modal */}
      {isViewerOpen && (
        <ImageViewer
          photos={sortedPhotos}
          initialIndex={currentIndex}
          onClose={() => setIsViewerOpen(false)}
        />
      )}

      {/* Video Viewer Modal */}
      {isVideoViewerOpen && (
        <VideoViewer
          videos={videos}
          onClose={() => setIsVideoViewerOpen(false)}
        />
      )}
    </div>
  )
}

// --- Subcomponents ---

function ImageViewer({ photos, initialIndex, onClose }: { photos: PropertyPhoto[], initialIndex: number, onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to initial index on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: initialIndex * scrollRef.current.clientWidth })
    }
  }, [initialIndex])

  const handleScroll = () => {
    if (!scrollRef.current) return
    const newIndex = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth)
    setIndex(newIndex)
  }

  const goTo = (i: number) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({
      left: i * scrollRef.current.clientWidth,
      behavior: 'smooth'
    })
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && index < photos.length - 1) goTo(index + 1)
      if (e.key === 'ArrowLeft' && index > 0) goTo(index - 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [index, photos.length, onClose])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="text-sm font-medium text-white/80">
          {index + 1} / {photos.length}
        </div>
        <button
          onClick={onClose}
          aria-label="Fechar visualizador"
          className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div
          ref={scrollRef}
          className="flex h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          onScroll={handleScroll}
        >
          {photos.map((photo, i) => (
            <div key={photo.id} className="min-w-full flex-none snap-center snap-always flex items-center justify-center p-2 md:p-8">
              <img
                src={photo.url}
                className="max-h-full max-w-full object-contain select-none"
                alt={`Ampliada ${i + 1}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Imagem+Indispon%C3%ADvel'
                }}
              />
            </div>
          ))}
        </div>

        {/* Desktop Controls (hidden on small screens, rely on swipe) */}
        {photos.length > 1 && (
          <>
            {index > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goTo(index - 1) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex rounded-full bg-black/50 p-4 text-white hover:bg-black/80 transition-all"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}
            {index < photos.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goTo(index + 1) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex rounded-full bg-black/50 p-4 text-white hover:bg-black/80 transition-all"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function VideoViewer({ videos, onClose }: { videos: { id: string; url: string; name?: string }[], onClose: () => void }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const video = videos[index]

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="text-sm font-medium text-white/80">
          Vídeo {index + 1} de {videos.length}
        </div>
        <button
          onClick={onClose}
          aria-label="Fechar vídeo"
          className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-4">
        {video ? (
          <div className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden bg-black">
            <video
              key={video.id} // forces reload when index changes
              src={video.url}
              controls
              className="h-full w-full object-contain"
              playsInline
              onError={(e) => {
                const target = e.target as HTMLVideoElement;
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<div class="flex h-full w-full items-center justify-center text-white/50">Vídeo indisponível ou formato não suportado.</div>';
                }
              }}
            />
          </div>
        ) : null}

        {videos.length > 1 && (
          <div className="mt-8 flex items-center gap-4">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setIndex(i => Math.max(0, i - 1))}
              disabled={index === 0}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setIndex(i => Math.min(videos.length - 1, i + 1))}
              disabled={index === videos.length - 1}
            >
              Próximo <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
