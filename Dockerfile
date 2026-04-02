# FROM node:24-alpine

# WORKDIR /app

# COPY package*.json .

# RUN npm install

# # or npm ci

# COPY . .

# EXPOSE 8888

# CMD ["npm", "run", "start"]


FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist/ .