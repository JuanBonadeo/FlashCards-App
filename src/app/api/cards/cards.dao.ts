import prisma from "@/db/db"
import type { CreateCardDto, UpdateCardDto } from "./card.interface"
import type { Card } from "@prisma/client"

export class CardsDAO {
  async getAllByDeckId(deckId: string): Promise<Card[]> {
    return await prisma.card.findMany({
      where: { deckId },
      orderBy: { createdAt: "desc" },
      include: {
        deck: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    })
  }

  async getById(id: string): Promise<Card | null> {
    return await prisma.card.findUnique({
      where: { id },
      include: {
        deck: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    })
  }

  async create(cardData: CreateCardDto): Promise<Card> {
    return await prisma.card.create({
      data: cardData
    })
  }

  async update(id: string, cardData: UpdateCardDto): Promise<Card> {
    return await prisma.card.update({
      where: { id },
      data: cardData,
    })
  }

  async delete(id: string): Promise<Card> {
    return await prisma.card.delete({
      where: { id },
    })
  }

  async getCardsByDeckWithStats(deckId: string): Promise<Card[]> {
    return await prisma.card.findMany({
      where: { deckId },
      orderBy: [{ difficulty: "desc" }, { timesReviewed: "asc" }, { createdAt: "desc" }],
    })
  }
}
