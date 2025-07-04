import type { CardType } from "@prisma/client"

export interface CreateCardDto {
  type: CardType
  front: string
  back: string
  imageUrlFront?: string
  imageUrlBack?: string
  options?: string[] // opcional: puede estar ausente si no es multiple choice
  correct?: number   // índice de la respuesta correcta
  deckId: string
}

export interface UpdateCardDto extends Partial<CreateCardDto> {
  timesReviewed?: number
  timesCorrect?: number
  lastReviewed?: Date
  difficulty?: number
}
