# 🧱 Proyecto Fullstack con Next.js + NestJS + Prisma

Este proyecto incluye:

- 🧩 Frontend en Next.js (`apps/web`)
- 🧠 Backend en NestJS (`apps/server`)
- 🐳 Docker para despliegue
- 🔐 Autenticación con NextAuth
- 🧬 ORM con Prisma
- 💅 UI con ShadCN y React Hook Form
- 📦 Manejo de workspace con PNPM

---

## ✅ Checklist de implementación

### 🔧 Setup inicial
- [x] Configurar estructura monorepo con `pnpm` workspaces
- [x] Crear `apps/web` (Next.js) y `apps/server` (NestJS)
- [x] Conectar `web` con `server` (API)

### 🐳 Docker y despliegue
- [x] Crear `Dockerfile` multi-proyecto
- [x] Dockerizar frontend y backend
- [x] Agregar `.dockerignore`
- [ ] Crear archivo `docker-compose.yml`? 
- [ ] Desplegar en DigitalOcean (App Platform)

### 🔐 Autenticación
- [ ] Instalar y configurar `next-auth` [doc](https://nextjs.org/learn/dashboard-app/adding-authentication)
- [ ] Configurar JWT y compartir `secret` con NestJS
- [ ] Crear guardia JWT en backend
- [ ] Proteger rutas privadas

### 🧬 Base de datos
- [ ] Instalar `prisma` y `@prisma/client`
- [ ] Definir `schema.prisma`
- [ ] Configurar migraciones y seeds
- [ ] Integrar Prisma en NestJS
- [ ] Agrega pipelines de deploy dev y productivo

### 💅 UI y UX
- [ ] Instalar y configurar ShadCN UI
- [ ] Agregar TailwindCSS
- [ ] Integrar React Hook Form + Zod
- [ ] Crear formularios reutilizables
- [ ] Añadir feedback visual (loaders, errores, toasts)

### 📈 Observabilidad
- [ ] Agregar `winston` o `pino` como logger en Nest
- [ ] Configurar manejo global de errores
- [ ] Agregar health check endpoint (`/health`)

### 🧪 Testing & CI/CD
- [x] Configurar ESLint, Prettier
- [ ] Husky
- [ ] Agregar pruebas unitarias (NestJS + Jest)
- [ ] Agregar pruebas unitarias (NextJS)
- [x] Configurar GitHub Actions para CI/CD
- [ ] Documentación

---

## 🚀 Scripts útiles

```bash
pnpm install             # Instala dependencias del monorepo
pnpm --filter web... dev # Levanta el frontend
pnpm --filter server... start:dev # Levanta el backend
pnpm build               # Build general
pnpm docker              # Script custom para correr Docker