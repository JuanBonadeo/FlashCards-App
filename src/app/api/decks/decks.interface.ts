export interface DeckDTO {
  name: string
  description?: string
  color?: string
}

export interface UpdateDeckDTO {
  name?: string
  description?: string
  color?: string
}

export interface DeckWithStats extends DeckDTO {
  id: string
  createdAt: Date
  updatedAt: Date
  cardCount?: number
}
