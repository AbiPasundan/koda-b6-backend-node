# FROM node:24-alpine AS build

# WORKDIR /app

# COPY package*.json .

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "run", "node"]

FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ENV PORT=3000
# ENV PGHOST=host.docker.internal
# ENV PGPORT=5432
# ENV PGUSER=postgres
# ENV PGDATABASE=yuuke
# ENV PGPASSWORD=1
# ENV PGSSLMODE=disable
# ENV JWT_SECRET=d8e8fca2dc0f896fd7cb4cb0031ba249


# RUN echo "PORT=3000" > .env && \
#     echo "PGHOST=host.docker.internal" >> .env && \
#     echo "PGPORT=5432" >> .env && \
#     echo "PGUSER=postgres" >> .env && \
#     echo "PGDATABASE=yuuke" >> .env && \
#     echo "PGPASSWORD=1" >> .env && \
#     echo "PGSSLMODE=disable" >> .env && \
#     echo "JWT_SECRET=d8e8fca2dc0f896fd7cb4cb0031ba249" >> .env

EXPOSE 3000

CMD ["npm", "run", "start"]
