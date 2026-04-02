# cara containerize project

## Project Express JS

Buat Dockerfile diroot project

```Dockerfile

FROM node:24-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

# or npm ci

COPY . .

EXPOSE 8888

CMD ["npm", "run", "start"]

```

Jika sudah jalankan perintah ini

```docker build . -t backend-node:latest```

```docker run --rm -p 5050:8888 --name backend-node -d backend-node:latest```

aplikasinya bisa diakses di lokal dengan port 5050

jika ingin seting env tanpa menggunakan docker compose gunakan perintah `-e PORT=3000`

```docker run --rm -p 5050:8888 -e PORT=3000 --name backend-node -d backend-node:latest```

## Project React

```Dockerfile

FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/ .

```

Jika sudah jalankan perintah ini

```docker build . -t frontend-node:latest --build-arg VITE-BACKEND-URL=https://bakcend.camps.my.id```

Fungsinya

aplikasinya bisa diakses di lokal dengan port 7070

```docker run -p 7070:80 --rm --name frontend-node -d frontend-node:latest```

## Setup CI/CD Github Actions

```yaml

name: Build and Push to GitHub Actions 🚀🚀🚀🚀🚀🚀🚀🚀🚀
run-name: ${{ github.event.head_commit.message }}
on:
    push:
        tags:
            - v*
jobs:
    Explore-GitHub-Actions:
        runs-on: ubuntu-latest
        steps:
            - name: Check out repository code
              uses: actions/checkout@v5
            - name: Login to docker ghcr.io
              run: docker build . -t ghcr.io/${{ github.repository }} # pkonamah link ghcr we
            - name: Login to docker ghcr.io
              run: |
                  echo ${{github.token}} docker login ghcr.io --username ${{github.repository_owner}}
            - name: login to ghcr
              run: |
                docker push ghcr.io/${{ github.repository }}:latest

```
