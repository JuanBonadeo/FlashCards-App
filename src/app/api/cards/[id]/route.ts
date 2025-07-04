import { CardsController } from "../cards.controller"

const controller = new CardsController()

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return await controller.update(req, { id })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return await controller.delete(req, { id })
}
