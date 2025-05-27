FROM node:20-alpine

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Build ambos proyectos
RUN pnpm --filter web... build
RUN pnpm --filter server... build

# Script que corre ambos servers
CMD ["sh", "-c", "pnpm --filter server... start:prod & pnpm --filter web... start"]