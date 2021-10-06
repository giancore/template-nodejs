import { classToClass } from "class-transformer";

import { ICreateHelloWorldDTO } from "../dtos/ICreateHelloWorldDTO";
import { HelloWorld } from "../entities/HelloWorld";

class HelloWorldMap {
  static toDTO({ name }: HelloWorld): ICreateHelloWorldDTO {
    const helloWorld = classToClass({
      name: name,
    });

    return helloWorld;
  }
}

export { HelloWorldMap };
