# Template Node.Js

Este projeto contém um exemplo de arquitetura e organização de código para desenvolvimento em Node.Js

## Passo a Passo

- Criar uma pasta com o nome do projeto
- Executar o comando `yarn init -y`
- Instalar o node express `yarn add express` e seus tipos `yarn add @types/express -D`
- Instalar o typescript `yarn add typescript -D`
- Executar o comando `yarn tsc --init` para criar o arquivo `tsconfig.json`
- No arquivo `tsconfig.json` colar a seguinte configuração:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "./",
    "baseUrl": "./src",
    "outDir": "./dist",
    "paths": {
      "@modules/*": ["modules/*"],
      "@config/*": ["config/*"],
      "@shared/*": ["shared/*"],
      "@errors/*": ["errors/*"],
      "@utils/*": ["utils/*"]
    },
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  }
}
```

- Criar a seguinte estrutura de pastas:

>     .
>     ├── ...
>     ├── src
>     │	├── @types
>     │	├── config
>     │	├── modules
>     │	└── shared
>     │	│	└── container
>     │	│	│	└── providers
>     │	│	├── errors
>     │	│	└── infra							#Camadas externa como framework de banco, envio de e-mail, etc
>     │	│	│	└── http
>     │	│	│	│	├── middlewares
>     │	│	│	│	└── routes
>     └── ...

#### Modules

A pasta `modules` corresponde aos contextos do projeto, por exemplo o contexto `users` utilizado para criação de usuários e autenticação:

>     .
>     │	├── modules
>     │	│	└── users
>     │	│	|	├── dtos
>     │	│	|	├── entities
>     │	│	|	├── repositories
>     │	│	│	└── useCases
>      |	│	│	│	├── authenticateUser
>      |	│	│	│	└── createUser
>     └── ...

#### Shared

- Dentro da pasta `infra/http/routes` criar o arquivo `index.ts` que será responsável por

```typescript
import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use(authenticateRoutes);

export { router };
```

- Dentro de `infra/http` criar o arquivo `app.ts` e `server.ts`

app.ts

```typescript
import express from "express";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

export { app };
```

server.ts

```typescript
import { app } from "./app";

app.listen(3333, () => console.log("Server is running!"));
```

### Tratamento de exceções

- Instalar a biblioteca `yarn add express-async-errors`
- Na pasta `errors` criar o arquivo `AppError.ts`

```typescript
export class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
```

- No arquivo `server.ts` adicionar o middleware de erro:

```typescript
import "express-async-errors";

...

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
```

### Injeção de Dependências com TSyringe

- Instalar a biblioteca `tsyringe`conforme [documentação](https://github.com/microsoft/tsyringe#installation)
- Dentro da pasta `shared\container` criar um arquivo `index.ts` para registrar os repositórios conforme exemplo:

```typescript
import { container } from "tsyringe";

import { IProfilesRepository } from "@modules/profiles/repositories/IProfilesRepository";
import { ProfilesRepository } from "@modules/profiles/repositories/ProfilesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { UsersRepository } from "@modules/users/repositories/UsersRepository";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
container.registerSingleton<IProfilesRepository>("ProfilesRepository", ProfilesRepository);
```

- Cada `useCase` deverá receber a anotação `@injectable()` acima da declaração da classe assim como cada repositório utilizado no construtor deve receber `@inject("name_repository")`, conforme exemplo:

```typescript
...
@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}
...
}
```

- Na `controller` se obtém a instância da `useCase` utilizando o método `resolve` da seguinte maneira:

```typescript
import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute({
      password,
      email,
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };
```

### Configuração do servidor

- Instalar a biblioteca `yarn add ts-node-dev tsconfig-paths -D`
- No arquivo `package.json` adicionar o elemento script abaixo:

```json
"scripts": {
	"dev": "ts-node-dev -r tsconfig-paths/register --inspect=0.0.0.0:9229 --transpile-only --ignore-watch node_modules --respawn --poll src/shared/infra/http/server.ts"
},
```
