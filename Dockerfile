FROM node:22-alpine3.20 AS build

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx ng build

FROM node:22-alpine3.20 AS run
EXPOSE 4000/tcp
COPY --from=build dist/refresh-web/ .

ENTRYPOINT [ "node", "./server/server.mjs" ]
