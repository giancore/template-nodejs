import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListHelloWorldUseCase } from "./ListHelloWorldUseCase";

class ListHelloWorldController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const listHelloWorldUseCase = container.resolve(ListHelloWorldUseCase);

    const helloWorlds = await listHelloWorldUseCase.execute();
    return response.json(helloWorlds);
  }
}

export { ListHelloWorldController };
