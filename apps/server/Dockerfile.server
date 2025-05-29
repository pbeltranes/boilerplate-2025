# apps/server/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Habilita y prepara pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia archivos base del monorepo
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./

# Copia los paquetes y el servidor
COPY packages ./packages
COPY apps/server ./apps/server

# Instala dependencias del monorepo
RUN pnpm install --frozen-lockfile

# Precompilación si aplica
RUN pnpm run prebuild

# Build solo del servidor
RUN pnpm --filter server... run build

# Expone el puerto del backend
EXPOSE 3001

# Comando de inicio
CMD ["pnpm", "--filter", "server...", "run", "start"]