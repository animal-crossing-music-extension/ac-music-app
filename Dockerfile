FROM node:20-alpine as base
WORKDIR /ac-music-app
EXPOSE 3000

FROM base as build
COPY --link package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY --link . .
RUN yarn build

FROM base
COPY --from=build /ac-music-app/.output /ac-music-app/.output

CMD ["node", ".output/server/index.mjs"]
