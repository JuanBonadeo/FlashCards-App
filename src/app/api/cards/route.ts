import { CardsController } from "./cards.controller";

const controller = new CardsController();

export async function POST(req: Request) {
  return await controller.create(req);
}
