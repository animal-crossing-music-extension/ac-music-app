FROM node:20-alpine as base
WORKDIR /ac-music-app
EXPOSE 3000

FROM base as build
COPY --link package.json yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn build

FROM base
COPY --from=build /ac-music-app/.output /ac-music-app/.output

CMD ["node", "dist/server/index.mjs"]
