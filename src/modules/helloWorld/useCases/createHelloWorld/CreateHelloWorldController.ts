import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateHelloWorldUseCase } from "./CreateHelloWorldUseCase";

class CreateHelloWorldController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createHelloWorldUseCase = container.resolve(CreateHelloWorldUseCase);

    await createHelloWorldUseCase.execute({
      name,
    });

    return response.status(201).send();
  }
}

export { CreateHelloWorldController };
