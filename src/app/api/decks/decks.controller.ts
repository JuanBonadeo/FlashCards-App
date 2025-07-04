import { DecksDAO } from "./decks.dao"
import type { DeckDTO, UpdateDeckDTO } from "./decks.interface"

export class DecksController {
  private dao: DecksDAO

  constructor() {
    this.dao = new DecksDAO()
  }

  async getAll(): Promise<Response> {
    try {
      const result = await this.dao.getAll()

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
      console.error("Error fetching decks:", error)
      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: "Error fetching decks from database",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }

  async getById( params: { id: string }): Promise<Response> {
    const { id } = params

    if (!id) {
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

    try {
      const result = await this.dao.getDeckById(id)

      if (!result) {
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

      return new Response(
        JSON.stringify({
          success: true,
          data: result,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (error) {
      console.error("Error fetching deck:", error)
      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: "Error fetching deck from database",
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
      const deckData: DeckDTO = await req.json()

      // Validación
      if (!deckData.name || deckData.name.trim().length === 0) {
        return new Response(
          JSON.stringify({
            error: "Validation error",
            message: "Deck name is required and cannot be empty",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      const result = await this.dao.create(deckData)

      return new Response(
        JSON.stringify({
          success: true,
          message: "Deck created successfully",
          data: result,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (error) {
      console.error("Error creating deck:", error)

      // Manejar error de nombre duplicado
      if (error instanceof Error && error.message.includes("Unique constraint")) {
        return new Response(
          JSON.stringify({
            error: "Validation error",
            message: "A deck with this name already exists",
          }),
          {
            status: 409,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: "Error creating deck in database",
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
          message: "Deck ID is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    try {
      // Verificar que el deck existe
      const existingDeck = await this.dao.getDeckById(id)
      if (!existingDeck) {
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

      const deckData: UpdateDeckDTO = await req.json()
      const result = await this.dao.update(id, deckData)

      return new Response(
        JSON.stringify({
          success: true,
          message: "Deck updated successfully",
          data: result,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (error) {
      console.error("Error updating deck:", error)

      if (error instanceof Error && error.message.includes("Unique constraint")) {
        return new Response(
          JSON.stringify({
            error: "Validation error",
            message: "A deck with this name already exists",
          }),
          {
            status: 409,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: "Error updating deck in database",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }

  async delete( params: { id: string }): Promise<Response> {
    const { id } = params

    if (!id) {
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

    try {
      // Verificar que el deck existe
      const existingDeck = await this.dao.getDeckById(id)
      if (!existingDeck) {
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

      await this.dao.delete(id)

      return new Response(
        JSON.stringify({
          success: true,
          message: "Deck deleted successfully",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (error) {
      console.error("Error deleting deck:", error)
      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: "Error deleting deck from database",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  }
}
