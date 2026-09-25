export type PropertyPurpose = 'Venda' | 'Aluguel'
export type PropertyType = 'Apartamento' | 'Casa' | 'Terreno' | 'Sala Comercial' | 'Cobertura' | 'Sítio/Chácara' | 'Galpão'
export type PropertyStatus = 'Disponível' | 'Reservado' | 'Em negociação' | 'Vendido' | 'Alugado' | 'Inativo'

export interface PropertyPhoto {
  id: string
  url: string
  isCover: boolean
  order: number
}

export interface PropertyFeatures {
  totalArea: number
  builtArea: number
  bedrooms: number
  suites: number
  bathrooms: number
  parkingSpaces: number
  floor?: number
  customFeatures?: { name: string; value: string }[]
}

export interface PropertyAddress {
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  complement?: string
}

export interface PropertyAmenities {
  hasPool: boolean
  hasBalcony: boolean
  hasElevator: boolean
  hasGym: boolean
  hasGourmetArea: boolean
  hasConcierge: boolean
  isGatedCommunity: boolean
  isFurnished: boolean
  allowsPets: boolean
  hasAirConditioning: boolean
  hasSeaView: boolean
  others: string[]
}

export interface Property {
  id: string
  code: string
  title: string
  purpose: PropertyPurpose
  type: PropertyType
  status: PropertyStatus

  // Valores
  salePrice?: number
  rentPrice?: number
  condoFee?: number
  iptu?: number

  address: PropertyAddress
  features: PropertyFeatures
  amenities: PropertyAmenities

  description: string
  ownerId: string
  ownerName?: string // To hold the typed name if it's not a known ID
  showOwnerName?: boolean // Added option to show/hide owner

  photos: PropertyPhoto[]
  videos?: { id: string; url: string; name?: string }[]

  isPublished: boolean
  createdAt: string
  updatedAt: string
}
