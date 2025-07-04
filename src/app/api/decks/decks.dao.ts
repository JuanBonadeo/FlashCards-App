import prisma from "@/db/db"
import type { DeckDTO, UpdateDeckDTO } from "./decks.interface"
import type { Deck } from "@prisma/client"

export class DecksDAO {
  async getAll(): Promise<Deck[]> {
    return await prisma.deck.findMany({
      orderBy: { createdAt: "desc" },
    })
    
  }

  async getDeckById(id: string): Promise<Deck | null> {
    return await prisma.deck.findUnique({
      where: { id },
    })
  }

  async create(deckData: DeckDTO): Promise<Deck> {
    return await prisma.deck.create({
      data: {
        name: deckData.name.trim(),
        description: deckData.description?.trim() || null,
        color: deckData.color || "#10B981", // Verde por defecto
      },
    })
  }

  async update(id: string, deckData: UpdateDeckDTO): Promise<Deck> {

    return await prisma.deck.update({
      where: { id },
      data: deckData
    })
  }

  async delete(id: string): Promise<Deck> {
    return await prisma.deck.delete({
      where: { id },
    })
  }

  async getDeckWithCards(id: string) {
    return await prisma.deck.findUnique({
      where: { id },
      include: {
        cards: {
          orderBy: { createdAt: "desc" },
        },
      },
    })
  }
}
