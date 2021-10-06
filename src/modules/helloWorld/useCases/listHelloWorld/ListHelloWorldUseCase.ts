import { inject, injectable } from "tsyringe";

import { IHelloWorldRepository } from "@modules/helloWorld/repositories/IHelloWorldRepository";
import { HelloWorld } from "@modules/helloWorld/entities/HelloWorld";

@injectable()
class ListHelloWorldUseCase {
  constructor(
    @inject("HelloWorldRepository")
    private helloWorldRepository: IHelloWorldRepository
  ) {}
  async execute(): Promise<HelloWorld[]> {
    return await this.helloWorldRepository.list();
  }
}

export { ListHelloWorldUseCase };
