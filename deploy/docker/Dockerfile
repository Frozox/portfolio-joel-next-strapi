FROM node:20.19.4-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV NODE_ENV=production
ENV PATH="$NODE_ENV:$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.4.0 --activate

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN apk add build-base g++ cairo-dev pango-dev giflib-dev py-setuptools
RUN pnpm config set inject-workspace-packages=true
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base AS build-strapi
COPY --from=build /usr/src/app /usr/src/app
WORKDIR /usr/src/app
RUN apk add build-base g++ cairo-dev pango-dev giflib-dev py-setuptools
RUN pnpm config set inject-workspace-packages=true
RUN pnpm --filter=strapi run build
RUN pnpm deploy --filter=strapi --prod /prod/strapi
RUN mkdir -p /prod/strapi \
    && cp -r apps/strapi/dist /prod/strapi

FROM base AS build-nextjs
COPY --from=build /usr/src/app /usr/src/app
WORKDIR /usr/src/app
RUN pnpm config set inject-workspace-packages=true
RUN pnpm --filter=next run deploy
RUN mkdir -p /prod/nextjs \
    && cp -r apps/nextjs/.next/standalone/* /prod/nextjs

FROM base AS strapi
COPY --from=build-strapi /prod/strapi /prod/strapi
WORKDIR /prod/strapi
RUN apk add cairo pango giflib
ENV HOST=0.0.0.0
EXPOSE 8000
CMD [ "node", "server.js" ]

FROM base AS nextjs
COPY --from=build-nextjs /prod/nextjs /prod/nextjs
WORKDIR /prod/nextjs/apps/nextjs
ENV HOSTNAME=0.0.0.0
EXPOSE 8001
CMD [ "node", "server.js" ]