import { CardsController } from "../../cards.controller"

const controller = new CardsController()

export async function GET(req: Request, { params }: { params: Promise<{ deckId: string }> }) {
  const { deckId } = await params
  return await controller.getAllByDeckId(req, deckId)
}
