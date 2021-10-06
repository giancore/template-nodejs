import { ICreateHelloWorldDTO } from "../dtos/ICreateHelloWorldDTO";
import { HelloWorld } from "../entities/HelloWorld";

interface IHelloWorldRepository {
  create(data: ICreateHelloWorldDTO): Promise<void>;
  list(): Promise<HelloWorld[]>;
}

export { IHelloWorldRepository };
