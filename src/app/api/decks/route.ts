import { DecksController } from "./decks.controller";

const controller = new DecksController();

export async function GET() {
  return await controller.getAll();
}

export async function POST(req: Request) {
  return await controller.create(req);
}
