import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Image as ImageIcon, MapPin, List, Info, DollarSign, Globe, Plus, Trash2, X, FileVideo } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { type Property } from '../../types/property'
import { updateMockProperty, createMockProperty } from '../../mocks/mockProperties'

interface PropertyFormProps {
  initialData?: Property
  isEditMode?: boolean
}

export function PropertyForm({ initialData, isEditMode = false }: PropertyFormProps) {
  const navigate = useNavigate()
  
  const [customFeatures, setCustomFeatures] = useState<{name: string, value: string}[]>(initialData?.features?.customFeatures || [])
  const [customAmenities, setCustomAmenities] = useState<string[]>(initialData?.amenities?.others || [])
  
  const [showNewFeature, setShowNewFeature] = useState(false)
  const [newFeatureName, setNewFeatureName] = useState('')
  const [newFeatureValue, setNewFeatureValue] = useState('')

  const [showNewAmenity, setShowNewAmenity] = useState(false)
  const [newAmenityName, setNewAmenityName] = useState('')

  const [photos, setPhotos] = useState<any[]>(initialData?.photos || [])
  const [videos, setVideos] = useState<any[]>([])
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleOpenMap = () => {
    const form = document.getElementById('property-form') as HTMLFormElement
    if (!form) return
    const street = (form.elements.namedItem('street') as HTMLInputElement)?.value
    const number = (form.elements.namedItem('number') as HTMLInputElement)?.value
    const neighborhood = (form.elements.namedItem('neighborhood') as HTMLInputElement)?.value
    const city = (form.elements.namedItem('city') as HTMLInputElement)?.value
    const state = (form.elements.namedItem('state') as HTMLInputElement)?.value

    const queryParts = [street, number, neighborhood, city, state].filter(Boolean)
    
    if (queryParts.length < 2) {
      alert("Não há dados de endereço suficientes para abrir o mapa. Preencha pelo menos a rua e cidade.")
      return
    }
    
    const query = queryParts.join(', ')
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank')
  }

  const handleAddFeature = () => {
    if (!newFeatureName || !newFeatureValue) return
    setCustomFeatures(prev => [...prev, { name: newFeatureName, value: newFeatureValue }])
    setNewFeatureName('')
    setNewFeatureValue('')
    setShowNewFeature(false)
  }

  const handleRemoveFeature = (index: number) => {
    setCustomFeatures(prev => prev.filter((_, i) => i !== index))
  }

  const handleAddAmenity = () => {
    if (!newAmenityName) return
    if (!customAmenities.includes(newAmenityName)) {
      setCustomAmenities(prev => [...prev, newAmenityName])
    }
    setNewAmenityName('')
    setShowNewAmenity(false)
  }

  const handleRemoveAmenity = (nameToRemove: string) => {
    setCustomAmenities(prev => prev.filter(a => a !== nameToRemove))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    processFiles(files)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  const processFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        if (file.size > 10 * 1024 * 1024) {
           alert(`A imagem ${file.name} tem mais de 10MB e foi bloqueada.`)
           return
        }
        const newPhoto = { 
          id: Math.random().toString(), 
          url: URL.createObjectURL(file), 
          isCover: photos.length === 0, 
          order: photos.length, 
          file, 
          name: file.name, 
          size: file.size 
        }
        setPhotos(prev => [...prev, newPhoto])
      } else if (file.type.startsWith('video/')) {
        if (file.size > 20 * 1024 * 1024) {
           alert(`O vídeo ${file.name} tem mais de 20MB e foi bloqueado.`)
           return
        }
        const newVideo = { 
          id: Math.random().toString(), 
          url: URL.createObjectURL(file), 
          file, 
          name: file.name, 
          size: file.size 
        }
        setVideos(prev => [...prev, newVideo])
      } else {
         alert(`O formato do arquivo ${file.name} não é aceito. Apenas imagens (JPG, PNG, WEBP) e vídeos (MP4, WEBM).`)
      }
    })
  }

  const removePhoto = (idToRemove: string) => {
    setPhotos(prev => prev.filter(p => p.id !== idToRemove))
  }

  const removeVideo = (idToRemove: string) => {
    setVideos(prev => prev.filter(v => v.id !== idToRemove))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    // Extract selected custom amenities
    const activeAmenities = customAmenities.filter(amenity => formData.get(`custom_amenity_${amenity}`) === 'on')

    const updatedData: Partial<Property> = {
      code: formData.get('code') as string,
      purpose: formData.get('purpose') as any,
      title: formData.get('title') as string,
      type: formData.get('type') as any,
      status: formData.get('status') as any,
      salePrice: Number(formData.get('salePrice')) || undefined,
      rentPrice: Number(formData.get('rentPrice')) || undefined,
      condoFee: Number(formData.get('condoFee')) || undefined,
      iptu: Number(formData.get('iptu')) || undefined,
      address: {
        zipCode: formData.get('zipCode') as string,
        street: formData.get('street') as string,
        number: formData.get('number') as string,
        complement: formData.get('complement') as string,
        neighborhood: formData.get('neighborhood') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
      },
      features: {
        builtArea: Number(formData.get('builtArea')) || 0,
        totalArea: Number(formData.get('totalArea')) || 0,
        bedrooms: Number(formData.get('bedrooms')) || 0,
        suites: Number(formData.get('suites')) || 0,
        parkingSpaces: Number(formData.get('parkingSpaces')) || 0,
        bathrooms: Number(formData.get('bathrooms')) || 0,
        customFeatures,
      },
      amenities: {
        hasPool: formData.get('amenity_Piscina') === 'on',
        hasBalcony: formData.get('amenity_Varanda') === 'on',
        hasElevator: formData.get('amenity_Elevador') === 'on',
        hasGym: formData.get('amenity_Academia') === 'on',
        hasGourmetArea: formData.get('amenity_Área gourmet') === 'on',
        hasConcierge: formData.get('amenity_Portaria') === 'on',
        isFurnished: formData.get('amenity_Mobiliado') === 'on',
        allowsPets: formData.get('amenity_Aceita animais') === 'on',
        hasAirConditioning: false,
        hasSeaView: false,
        isGatedCommunity: false,
        others: activeAmenities
      },
      description: formData.get('description') as string,
      ownerName: formData.get('ownerName') as string,
      showOwnerName: formData.get('showOwnerName') === 'on',
      isPublished: formData.get('isPublished') === 'on',
      photos,
    }

    if (isEditMode && initialData?.id) {
      updateMockProperty(initialData.id, updatedData)
      alert('Imóvel atualizado com sucesso! (Persistência temporária no Mock)')
    } else {
      createMockProperty({
        id: `prop-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ownerId: 'owner-temp', // Fallback for mock
        ...updatedData
      } as Property)
      alert('Imóvel salvo com sucesso! (Persistência temporária no Mock)')
    }
    navigate('/imoveis')
  }

  const amenitiesList = ['Piscina', 'Varanda', 'Elevador', 'Academia', 'Área gourmet', 'Portaria', 'Mobiliado', 'Aceita animais']

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
            <Link to="/imoveis"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-base-900 flex items-center gap-2">
            {isEditMode ? `Editar Imóvel ${initialData?.code || ''}` : 'Novo Imóvel'}
            <button 
              type="button"
              onClick={handleOpenMap}
              className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              title="Abrir no Google Maps"
            >
              <Globe className="h-4 w-4" />
            </button>
          </h1>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline" asChild>
            <Link to="/imoveis">Cancelar</Link>
          </Button>
          <Button type="submit" form="property-form">{isEditMode ? 'Salvar Alterações' : 'Salvar Imóvel'}</Button>
        </div>
      </div>

      <form id="property-form" onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. Informações principais */}
        <section className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-base-100 pb-2 text-lg font-bold text-base-900">
            <Info className="h-5 w-5 text-primary-600" />
            Informações Principais
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Código *</label>
              <Input name="code" required placeholder="Ex: AP-102" defaultValue={initialData?.code} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Finalidade *</label>
              <select name="purpose" required defaultValue={initialData?.purpose || ''} className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option value="">Selecione...</option>
                <option value="Venda">Venda</option>
                <option value="Aluguel">Aluguel</option>
              </select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-base-700">Título do Anúncio *</label>
              <Input name="title" required placeholder="Ex: Lindo apartamento com vista para o mar" defaultValue={initialData?.title} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Tipo de Imóvel *</label>
              <select name="type" required defaultValue={initialData?.type || ''} className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option value="">Selecione...</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Terreno">Terreno</option>
                <option value="Sala Comercial">Sala Comercial</option>
                <option value="Cobertura">Cobertura</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Status *</label>
              <select name="status" required defaultValue={initialData?.status || 'Disponível'} className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option value="Disponível">Disponível</option>
                <option value="Reservado">Reservado</option>
                <option value="Em negociação">Em negociação</option>
                <option value="Alugado">Alugado</option>
                <option value="Vendido">Vendido</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>
        </section>

        {/* 2. Valores */}
        <section className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-base-100 pb-2 text-lg font-bold text-base-900">
            <DollarSign className="h-5 w-5 text-primary-600" />
            Valores
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Preço de Venda</label>
              <Input name="salePrice" type="number" placeholder="R$ 0,00" defaultValue={initialData?.salePrice} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Valor do Aluguel</label>
              <Input name="rentPrice" type="number" placeholder="R$ 0,00" defaultValue={initialData?.rentPrice} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Condomínio</label>
              <Input name="condoFee" type="number" placeholder="R$ 0,00" defaultValue={initialData?.condoFee} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">IPTU (Anual)</label>
              <Input name="iptu" type="number" placeholder="R$ 0,00" defaultValue={initialData?.iptu} />
            </div>
          </div>
        </section>

        {/* 3. Endereço */}
        <section className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-base-100 pb-2 text-lg font-bold text-base-900">
            <MapPin className="h-5 w-5 text-primary-600" />
            Endereço
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-base-700">CEP</label>
              <Input name="zipCode" placeholder="00000-000" defaultValue={initialData?.address?.zipCode} />
            </div>
            <div className="space-y-1.5 sm:col-span-4">
              <label className="text-sm font-medium text-base-700">Rua/Avenida</label>
              <Input name="street" placeholder="Nome da rua" defaultValue={initialData?.address?.street} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-base-700">Número</label>
              <Input name="number" placeholder="123" defaultValue={initialData?.address?.number} />
            </div>
            <div className="space-y-1.5 sm:col-span-4">
              <label className="text-sm font-medium text-base-700">Complemento</label>
              <Input name="complement" placeholder="Apt, Bloco, etc." defaultValue={initialData?.address?.complement} />
            </div>
            <div className="space-y-1.5 sm:col-span-3">
              <label className="text-sm font-medium text-base-700">Bairro *</label>
              <Input name="neighborhood" required placeholder="Bairro" defaultValue={initialData?.address?.neighborhood} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-base-700">Cidade *</label>
              <Input name="city" required placeholder="Cidade" defaultValue={initialData?.address?.city} />
            </div>
            <div className="space-y-1.5 sm:col-span-1">
              <label className="text-sm font-medium text-base-700">UF</label>
              <Input name="state" placeholder="UF" defaultValue={initialData?.address?.state} />
            </div>
          </div>
        </section>

        {/* 4. Características e Diferenciais */}
        <section className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-base-100 pb-2">
            <div className="flex items-center gap-2 text-lg font-bold text-base-900">
              <List className="h-5 w-5 text-primary-600" />
              Características e Diferenciais
            </div>
          </div>
          
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-base-900">Características Básicas</p>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowNewFeature(!showNewFeature)} className="text-primary-600 h-8">
              <Plus className="mr-1 h-4 w-4" /> Adicionar característica
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-base-700">Área Útil (m²)</label>
              <Input name="builtArea" type="number" placeholder="0" defaultValue={initialData?.features?.builtArea} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-base-700">Quartos</label>
              <Input name="bedrooms" type="number" placeholder="0" defaultValue={initialData?.features?.bedrooms} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-base-700">Suítes</label>
              <Input name="suites" type="number" placeholder="0" defaultValue={initialData?.features?.suites} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-base-700">Vagas</label>
              <Input name="parkingSpaces" type="number" placeholder="0" defaultValue={initialData?.features?.parkingSpaces} />
            </div>
            {customFeatures.map((feat, idx) => (
              <div key={idx} className="space-y-1.5 relative group">
                <label className="text-xs font-medium text-base-700 flex items-center justify-between">
                  {feat.name}
                  <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" title="Excluir">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </label>
                <Input type="text" readOnly value={feat.value} className="bg-base-50 text-base-600" />
              </div>
            ))}
          </div>

          {showNewFeature && (
            <div className="mb-6 flex flex-col sm:flex-row items-end gap-3 rounded-lg border border-base-200 bg-base-50 p-4">
              <div className="flex-1 w-full space-y-1.5">
                <label className="text-xs font-medium text-base-700">Nome (ex: Banheiros, Andar)</label>
                <Input value={newFeatureName} onChange={e => setNewFeatureName(e.target.value)} placeholder="Nome" />
              </div>
              <div className="flex-1 w-full space-y-1.5">
                <label className="text-xs font-medium text-base-700">Valor (ex: 3, 8º andar)</label>
                <Input value={newFeatureValue} onChange={e => setNewFeatureValue(e.target.value)} placeholder="Valor" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())} />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button type="button" variant="outline" onClick={() => setShowNewFeature(false)} className="flex-1 sm:flex-none">Cancelar</Button>
                <Button type="button" onClick={handleAddFeature} className="flex-1 sm:flex-none">Adicionar</Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-base-900">Diferenciais</p>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowNewAmenity(!showNewAmenity)} className="text-primary-600 h-8">
                <Plus className="mr-1 h-4 w-4" /> Personalizar diferenciais
              </Button>
            </div>
            
            {showNewAmenity && (
              <div className="flex flex-col sm:flex-row items-center gap-3 rounded-lg border border-base-200 bg-base-50 p-4 mb-4">
                <Input className="flex-1" value={newAmenityName} onChange={e => setNewAmenityName(e.target.value)} placeholder="Nome do diferencial (ex: Energia Solar)" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddAmenity())} />
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button type="button" variant="outline" onClick={() => setShowNewAmenity(false)} className="flex-1 sm:flex-none">Cancelar</Button>
                  <Button type="button" onClick={handleAddAmenity} className="flex-1 sm:flex-none">Adicionar</Button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {amenitiesList.map(item => {
                let isChecked = false
                if (initialData?.amenities) {
                  if (item === 'Piscina' && initialData.amenities.hasPool) isChecked = true
                  if (item === 'Varanda' && initialData.amenities.hasBalcony) isChecked = true
                  if (item === 'Elevador' && initialData.amenities.hasElevator) isChecked = true
                  if (item === 'Academia' && initialData.amenities.hasGym) isChecked = true
                  if (item === 'Área gourmet' && initialData.amenities.hasGourmetArea) isChecked = true
                  if (item === 'Portaria' && initialData.amenities.hasConcierge) isChecked = true
                  if (item === 'Mobiliado' && initialData.amenities.isFurnished) isChecked = true
                  if (item === 'Aceita animais' && initialData.amenities.allowsPets) isChecked = true
                }
                return (
                  <label key={item} className="flex cursor-pointer items-center gap-2 rounded-full border border-base-200 bg-base-50 px-3 py-1.5 text-sm hover:bg-base-100">
                    <input name={`amenity_${item}`} type="checkbox" defaultChecked={isChecked} className="rounded border-base-300 text-primary-600 focus:ring-primary-500" />
                    {item}
                  </label>
                )
              })}
              
              {customAmenities.map(item => (
                <div key={item} className="flex items-center rounded-full border border-base-200 bg-base-50 pl-3 pr-1 py-1 text-sm hover:bg-base-100">
                  <label className="flex cursor-pointer items-center gap-2 mr-2">
                    <input name={`custom_amenity_${item}`} type="checkbox" defaultChecked={true} className="rounded border-base-300 text-primary-600 focus:ring-primary-500" />
                    {item}
                  </label>
                  <button type="button" onClick={() => handleRemoveAmenity(item)} className="p-1 text-base-400 hover:text-red-500 rounded-full hover:bg-base-200 transition-colors" title="Excluir diferencial">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Fotos e Vídeos */}
        <section className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-base-100 pb-2 text-lg font-bold text-base-900">
            <ImageIcon className="h-5 w-5 text-primary-600" />
            Mídias do Imóvel
          </div>
          
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5">
            {photos.map(photo => (
              <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-md border border-base-200">
                <img src={photo.url} alt="Foto" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                  <p className="text-white text-xs truncate w-full text-center mb-2">{photo.name || 'Foto'}</p>
                  <button type="button" onClick={() => removePhoto(photo.id)} className="rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {videos.map(video => (
              <div key={video.id} className="group relative aspect-square overflow-hidden rounded-md border border-base-200 bg-base-100 flex items-center justify-center">
                <video src={video.url} className="absolute inset-0 h-full w-full object-cover opacity-50" />
                <FileVideo className="h-8 w-8 text-base-500 z-10" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 z-20">
                  <p className="text-white text-xs truncate w-full text-center mb-2">{video.name}</p>
                  <button type="button" onClick={() => removeVideo(video.id)} className="rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div 
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-base-300 bg-base-50 px-6 py-10 text-center hover:bg-base-100 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="mx-auto h-12 w-12 text-base-400" />
            <p className="mt-4 text-sm font-medium text-base-900">Arraste fotos e vídeos ou clique para enviar</p>
            <p className="mt-1 text-xs text-base-500">Imagens (JPG, PNG, WEBP) até 10MB • Vídeos (MP4, WEBM) até 20MB</p>
            <input 
              type="file" 
              multiple 
              accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            <Button variant="outline" className="mt-4" type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}>
              Selecionar Arquivos
            </Button>
          </div>
        </section>

        {/* 6. Descrição & Publicação */}
        <section className="rounded-xl border border-base-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Descrição do Imóvel</label>
              <textarea 
                name="description"
                rows={5} 
                className="w-full rounded-md border border-base-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="Descreva os detalhes que fazem este imóvel ser único..."
                defaultValue={initialData?.description}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-base-700">Proprietário vinculado</label>
              <div className="flex gap-2 flex-col sm:flex-row">
                <Input 
                  name="ownerName" 
                  list="owners-list" 
                  placeholder="Nome do proprietário" 
                  defaultValue={initialData?.ownerName || (initialData?.ownerId ? 'Carlos Ferreira' : '')} 
                  className="flex-1"
                />
                <datalist id="owners-list">
                  <option value="Carlos Ferreira" />
                  <option value="Mariana Souza" />
                  <option value="João Silva" />
                  <option value="Fernanda Gomes" />
                  <option value="Roberto Almeida" />
                </datalist>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2">
              <input name="showOwnerName" type="checkbox" id="showOwnerName" defaultChecked={initialData?.showOwnerName} className="mt-1 h-4 w-4 rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
              <div>
                <label htmlFor="showOwnerName" className="font-medium text-base-900 cursor-pointer">Exibir nome do proprietário no imóvel</label>
                <p className="text-sm text-base-500">Se marcado, o nome ficará visível aos clientes (não confunda com a publicação do imóvel).</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-primary-100 bg-primary-50 p-4">
              <input name="isPublished" type="checkbox" id="publish" defaultChecked={initialData?.isPublished} className="mt-1 h-4 w-4 rounded border-primary-300 text-primary-600 focus:ring-primary-500" />
              <div>
                <label htmlFor="publish" className="font-medium text-primary-900 cursor-pointer">Publicar no Portal Público</label>
                <p className="text-sm text-primary-700">Ao marcar esta opção, o imóvel ficará visível para os clientes no seu site.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Bottom Actions (Desktop & Tablet) */}
        <div className="hidden lg:flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" asChild>
            <Link to="/imoveis">Cancelar</Link>
          </Button>
          <Button type="submit" size="lg" className="px-8">
            {isEditMode ? 'Salvar Alterações' : 'Salvar Imóvel'}
          </Button>
        </div>

        {/* Mobile Sticky Footer */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-base-200 bg-white p-4 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:hidden z-40">
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="flex-1" asChild>
              <Link to="/imoveis">Cancelar</Link>
            </Button>
            <Button type="submit" className="flex-1">{isEditMode ? 'Salvar Alterações' : 'Salvar Imóvel'}</Button>
          </div>
        </div>

      </form>
    </div>
  )
}
