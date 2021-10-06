import "reflect-metadata";
import "express-async-errors";
import "../../container";

import express, { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${error.message}`,
    });
  }
);

export { app };
