FROM node:20-alpine

WORKDIR /app

# Instalar pnpm globalmente con corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar solo los archivos necesarios
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./
COPY apps ./apps

# Instalar dependencias del workspace
RUN pnpm install --frozen-lockfile

# Build de los proyectos
RUN pnpm --filter web... build && pnpm --filter server... build

# Exponer puertos si aplica (ajusta según necesidad)
EXPOSE 3000 3001

# Ejecutar ambos servidores en paralelo de forma segura
CMD pnpm concurrently "pnpm --filter server... start:prod" "pnpm --filter web... start"