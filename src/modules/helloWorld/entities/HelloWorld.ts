import { v4 as uuidV4 } from "uuid";

class HelloWorld {
  id: string;
  name: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { HelloWorld };
