FROM node:22-alpine3.20 AS build

RUN mkdir /refresh-web
WORKDIR /refresh-web

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx ng build

FROM node:22-alpine3.20 AS run
EXPOSE 4000/tcp

COPY --from=build /refresh-web/dist .

ENTRYPOINT [ "node", "./refresh-web/server/server.mjs" ]
