# apps/web/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Habilita y configura pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia archivos base del monorepo
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./

# Copia el frontend y los paquetes compartidos
COPY apps/web ./apps/web
COPY packages ./packages

# Instala dependencias del monorepo
RUN pnpm install --frozen-lockfile

# Precompilación si aplica
RUN pnpm run prebuild

# Build solo del frontend
RUN pnpm --filter web... run build

# Expone el puerto por defecto de Next.js
EXPOSE 3000

# Comando de inicio
CMD ["pnpm", "--filter", "web...", "run", "start"]