export interface Deck {
  id: string
  name: string
  description?: string
  color?: string
  createdAt: string
  updatedAt: string
  cards?: Card[]
  _count?: {
    cards: number
  }
}

export interface Card {
  id: string
  type: CardType
  front: string
  back: string
  imageUrlFront?: string
  imageUrlBack?: string
  options?: string[]
  correct?: number[] | boolean
  blanks?: string[]
  pairs?: { term: string; definition: string }[]
  createdAt: string
  updatedAt: string
  deckId: string
  timesReviewed: number
  timesCorrect: number
  lastReviewed?: string
  difficulty: number
}

export type CardType =
  | "DEFINITION"
  | "MULTIPLE_CHOICE"
  | "TRUE_FALSE"
  | "FILL_BLANK"
  | "MATCHING"
  | "IMAGE_TEXT"
  | "CODE_SNIPPET"

export interface CreateDeckData {
  name: string
  description?: string
  color?: string
}

export interface CreateCardData {
  type?: CardType
  front: string
  back: string
  imageUrlFront?: string
  imageUrlBack?: string
  options?: string[]
  correct?: number[] | boolean
  blanks?: string[]
  pairs?: { term: string; definition: string }[]
  deckId: string
}
