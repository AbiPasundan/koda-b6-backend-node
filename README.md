# Coffe Sho Project Using Express JS

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) ![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square) ![Version](https://img.shields.io/badge/Version-1.0.0-green?style=flat-square) ![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)

> A personal project built with Express.js, utilizing PostgreSQL as the database, and managed with npm. This project serves as a foundation for exploring the capabilities of Express.js in a real-world application.

## 📋 Table of Contents

1. [Description](#-description)

2. [Demo/Screenshots](#-demoscreenshots)

3. [Features](#-major-features)

4. [Tech Stack](#-tech-stack)

5. [Project Structure](#-project-structure)

6. [Prerequisites](#-prerequisites)

7. [Installation](#-how-to-use)

8. [Contributing](#-contributing)

9. [License](#-license)

## 📄 Description

This project is api for web coffee shop building with popular and scalable thecnology like express js and postgresql

## 📸 Demo/Screenshots

Unfortunately, there are no demo GIFs or screenshots available for this project. However, you can explore the project's features and capabilities by installing and running it locally.

## ✨ Major Features

- Authentication
- CRUD Products, Users and Orders
- End Point for every page landing page etc
- Middleware user / admin
- RBAC
- Standard Response Hateoas
- Validation
- Rate Limit in endpoint
- API docs using swagger

## 🛠️ Tech Stack

The project relies on the following technologies:

- **JavaScript**: As the primary programming language.
- **Node JS**: As the runtime for Javascript.
- **Express.js**: As the web framework.
- **PostgreSQL**: As the database management system.
- **Redis**: Chace management system.
- **Go Migrate**: Database migration tool.
- **npm**: As the package manager.

## 🏗️ Project Structure

```markdown

├── .github/
│   └── workflows/
│       └── build-and-push-image.yaml
├── migrations/
│   ├── 000001_i.down.sql
│   ├── 000001_i.up.sql
│   ├── 000002_i.down.sql
│   └── 000002_i.up.sql
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── browseProduct.controller.js
│   │   ├── landingPage.controller.js
│   │   ├── order.controller.js
│   │   ├── products.controllers.js
│   │   ├── profile.controller.js
│   │   └── user.controller.js
│   ├── helper/
│   │   ├── invalidateRedis.helper.js
│   │   └── response.helper.js
│   ├── lib/
│   │   ├── db.js
│   │   ├── hash.js
│   │   ├── jwt.js
│   │   └── redis.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── cors.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── upload.middleware.js
│   ├── models/
│   │   ├── browseProduct.models.js
│   │   ├── forgot_password.models.js
│   │   ├── landingPage.models.js
│   │   ├── order.models.js
│   │   ├── products.models.js
│   │   ├── profile.models.js
│   │   └── users.models.js
│   ├── routes/
│   │   ├── admin/
│   │   │   ├── products.routes.js
│   │   │   └── users.routes.js
│   │   ├── public/
│   │   │   ├── auth.routes.js
│   │   │   ├── browseProduct.routes.js
│   │   │   └── landingPage.routes.js
│   │   ├── users/
│   │   │   ├── profile.routes.js
│   │   │   └── users.routes.js
│   │   ├── admin.routes.js
│   │   ├── docs.routes.js
│   │   ├── main.routes.js
│   │   ├── public.routes.js
│   │   └── user.routes.js
│   ├── hit.http
│   └── main.js
├── uploads/
│   ├── d7sbz6xeoa.jpg
│   ├── icd7zwyrs3.png
│   └── ljqp6tg9yb.jpeg
├── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── README.md
├── Request.cartero
├── docker-compose.yml
├── masukan.md
├── package-lock.json
└── package.json


```

## 📝 Prerequisites

Before installing and running the project, ensure you have the following:

- Node.js
- npm.
- PostgreSQL.
- Go migrate.
- Terminal.
- Text editor.
- Redis.

## 📦 How to use

### Setup project

- env:

rename file .env.exanple to .env

and here is the setup

```env

PORT=3000 # change port into port you want to use feel free to use any port that not in use

PGHOST=localhost # if you install postgresql in local keep this but if you install postgres in another way change this
PGPORT=5432 # # if you install postgresql in local keep this but if you install postgres in another way change this
PGUSER=postgres # postgresql user you can change this if you want
PGDATABASE=yuuke # postgresql database name make sure you create database yuuke or you can change database name BUT make sure that
PGPASSWORD=1 # if you fisrt time using postgresql, by default postgres have no password so i suggest you to create password for your postgres
PGSSLMODE=disable # better you keep this

JWT_SECRET=d8e8fca2dc0f896fd7cb4cb0031ba249 # for JWT_SECRET feel free to fill JWT_SECRET

REDIS_URL=redis://localhost:6379 # the connection string for redis, if you install it locally keep the default port 6379, otherwise change it to your provider's URL

```

- database migration

In this project I use go migrate for migration so if you not installed go migrate make sure you install it
You can see more detail about go migrate in [docs](https://github.com/golang-migrate/migrate)
Here is the breakdown to install go migrate

-- home brew (MacOS)
`brew install golang-migrate`
-- Scoop (Windows)
`scoop install migrate`
-- Linux (MacOS)

```bash
curl -L https://github.com | tar xvz
sudo mv migrate /usr/local/bin/migrate
```

-- Docker If you prefer not to install it locally, you can use the official Docker image:

`docker pull migrate/migrate`

After installation, verify it by checking the version: run `migrate -version`

If go migrate has installed run this command

`migrate -source file://./migrations -database postgres://postgres:1@migrate:5432/yuuke?sslmode=disable up 2`

> note that you have to configur this command for example:

```migrate -source file://./migrations -database postgres://your_postgres_user_name:1@migrate_service_from_docker_compose:postgres_port/postgres_db_?sslmode=disable up 2```

### Clone Localy

To install the project, follow these steps:

```bash
# Clone the repository
git clone https://github.com/AbiPasundan/koda-b6-backend-node.git

# Navigate to the project directory
cd koda-b6-backend-node

# Install dependencies
npm i

# Start the application
npm run start
```

### Use docker compose

if you have docker compose you can run this project with docker compose

here is the steps

- setup env
just like before

- setup docker-compose.yml
There some config if you change env

-- in service db

```yaml
  db:
    image: postgres:15-alpine
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_USER: postgres # change postgres user adjust with your postgres user
      POSTGRES_PASSWORD: 1 # change postgres password adjust with your postgres password
      POSTGRES_DB: yuuke # change database name into database name you like in .env
    ports:
      - "5431:5432" # if port 5431 used change port 5431 into another port
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d yuuke"]
      interval: 5s
      timeout: 5s
      retries: 5
```

-- in service migrate

```yaml
  migrate:
    image: migrate/migrate
    volumes:
      - ./migrations:/migrations
    entrypoint: ["migrate", "-source", "file://./migrations", "-database", "postgres://postgres:1@db:5432/yuuke?sslmode=disable", "up"]
    # in entrypoint adjust db url postgres://postgres:1@db:5432/yuuke?sslmode=disable with your db url
    # for example if you do not know about db url postgres://postgres_users:1@refere_to_db_Service:5432/postgres_db?sslmode=disable
    # so now you know how to change this config db url
    depends_on:
      db:
        condition: service_healthy
```

-- in app service

```yaml
app:
    image: ghcr.io/abipasundan/koda-b6-backend:latest
    container_name: express_app
    ports:
      - "3001:3000" # adjust with your port setting
    environment: # match with your .env there is no different with .env file
      - PORT=3000
      - PGHOST=db
      - PGPORT=5432
      - PGUSER=postgres
      - PGPASSWORD=1
      - PGSSLMODE=disable
      - PGDATABASE=yuuke
      - APP_SECRET=d8e8fca2dc0f896fd7cb4cb0031ba249
    depends_on:
      - db
```

and run this command in terminal project

```bash
docker-compose up
```

you can see this project in localhost with port app for example I port fowarding app service from port 3000 to 3001

```yml
ports:
      - "3001:3000"
```

So I can open [http://localhost:3001]

## EndPoint

Easy way to see endpoint is test with swagger you can access swagger docs in [http://localhost:3001/docs]

but here is list of endpoint in this project

## 🤝 Contributing

Contributions are welcome and appreciated. To contribute, please fork the repository, make your changes, and submit a pull request. Ensure your changes align with the project's goals and guidelines.

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

<!--

end point 
http status code yang dipakai
cara isi env = ok

-->
