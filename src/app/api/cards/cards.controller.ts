import { CardsDAO } from "./cards.dao"
import { DecksDAO } from "../decks/decks.dao"
import type { CreateCardDto, UpdateCardDto } from "./card.interface"


export class CardsController {
  private dao: CardsDAO
  private daoDecks: DecksDAO

  constructor() {
    this.dao = new CardsDAO()
    this.daoDecks = new DecksDAO()
  }

  async getAllByDeckId(req: Request, deckId: string): Promise<Response> {
    if (!deckId) {
      return new Response(
        JSON.stringify({
          error: "Deck ID is required",
          message: "Deck ID parameter is missing",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    try {
      const result = await this.dao.getAllByDeckId(deckId)

      return new Response(
        JSON.stringify({
          success: true,
          data: result,
          count: result.length,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (error) {
      console.error("Error fetching cards:", error)
      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: "Error fetching cards from database",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }

  async create(req: Request): Promise<Response> {
    try {
      const cardData: CreateCardDto = await req.json()

      if (!cardData.deckId) {
        return new Response(
          JSON.stringify({
            error: "Validation error",
            message: "Deck ID is required",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        )
      }
      const deckExists = await this.daoDecks.getDeckById(cardData.deckId)
      if (!deckExists) {
        return new Response(
          JSON.stringify({
            error: "Not found",
            message: "Deck not found",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      const result = await this.dao.create(cardData)

      return new Response(
        JSON.stringify({
          success: true,
          message: "Card created successfully",
          data: result,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (error) {
      console.error("Error creating card:", error)
      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: "Error creating card in database",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }

  async update(req: Request, params: { id: string }): Promise<Response> {
    const { id } = params

    if (!id) {
      return new Response(
        JSON.stringify({
          error: "Validation error",
          message: "Card ID is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    try {
      const cardData: UpdateCardDto = await req.json()
      const result = await this.dao.update(id, cardData)

      return new Response(
        JSON.stringify({
          success: true,
          message: "Card updated successfully",
          data: result,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (error) {
      console.error("Error updating card:", error)

      if (error instanceof Error && error.message.includes("Record to update not found")) {
        return new Response(
          JSON.stringify({
            error: "Not found",
            message: "Card not found",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: "Error updating card in database",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }

  async delete(req: Request, params: { id: string }): Promise<Response> {
    const { id } = params

    if (!id) {
      return new Response(
        JSON.stringify({
          error: "Validation error",
          message: "Card ID is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    try {
      await this.dao.delete(id)

      return new Response(
        JSON.stringify({
          success: true,
          message: "Card deleted successfully",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (error) {
      console.error("Error deleting card:", error)

      if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
        return new Response(
          JSON.stringify({
            error: "Not found",
            message: "Card not found",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: "Error deleting card from database",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }
}
