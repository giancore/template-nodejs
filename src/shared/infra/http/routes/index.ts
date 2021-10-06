import { Router } from "express";

import { helloWorldRoutes } from "./helloWorld.routes";

const router = Router();

router.use("/hello-world", helloWorldRoutes);

export { router };
