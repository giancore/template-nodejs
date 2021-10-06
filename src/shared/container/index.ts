import { container } from "tsyringe";

import { IHelloWorldRepository } from "@modules/helloWorld/repositories/IHelloWorldRepository";
import { HelloWorldRepository } from "@modules/helloWorld/repositories/HelloWorldRepository";

container.registerSingleton<IHelloWorldRepository>("HelloWorldRepository", HelloWorldRepository);
