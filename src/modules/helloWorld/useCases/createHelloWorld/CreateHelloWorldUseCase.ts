import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICreateHelloWorldDTO } from "@modules/helloWorld/dtos/ICreateHelloWorldDTO";
import { IHelloWorldRepository } from "@modules/helloWorld/repositories/IHelloWorldRepository";

@injectable()
class CreateHelloWorldUseCase {
  constructor(
    @inject("HelloWorldRepository")
    private usersRepository: IHelloWorldRepository
  ) {}

  async execute({ name }: ICreateHelloWorldDTO): Promise<void> {
    if (!name) {
      throw new AppError("Name is required");
    }

    await this.usersRepository.create({
      name,
    });
  }
}

export { CreateHelloWorldUseCase };
