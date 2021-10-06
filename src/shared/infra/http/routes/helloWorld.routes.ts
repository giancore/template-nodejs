import { Router } from "express";

import { CreateHelloWorldController } from "../../../../modules/helloWorld/useCases/createHelloWorld/CreateHelloWorldController";
import { ListHelloWorldController } from "../../../../modules/helloWorld/useCases/listHelloWorld/ListHelloWorldController";

const helloWorldRoutes = Router();

const createHelloWorldController = new CreateHelloWorldController();
const listHelloWorldController = new ListHelloWorldController();

helloWorldRoutes.post("/", createHelloWorldController.handle);
helloWorldRoutes.get("/", listHelloWorldController.handle);

export { helloWorldRoutes };
