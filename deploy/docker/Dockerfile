FROM node:20.19.4-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=strapi --prod /prod/strapi
RUN pnpm deploy --filter=next --prod /prod/nextjs

FROM base AS strapi
COPY --from=build /prod/strapi /prod/strapi
WORKDIR /prod/strapi
EXPOSE 8001
CMD [ "pnpm", "start" ]

FROM base AS nextjs
COPY --from=build /prod/nextjs /prod/nextjs
WORKDIR /prod/nextjs
EXPOSE 8001
CMD [ "pnpm", "start" ]