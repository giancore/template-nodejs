import { v4 as uuidV4 } from "uuid";

import { ICreateHelloWorldDTO } from "../dtos/ICreateHelloWorldDTO";
import { HelloWorld } from "../entities/HelloWorld";
import { IHelloWorldRepository } from "./IHelloWorldRepository";

class HelloWorldRepository implements IHelloWorldRepository {
  async create({ name }: ICreateHelloWorldDTO): Promise<void> {
    console.log(name);
  }

  async list(): Promise<HelloWorld[]> {
    const list = new Array<HelloWorld>();
    list.push({ id: uuidV4(), name: "hello-world" });

    return list;
  }
}

export { HelloWorldRepository };
