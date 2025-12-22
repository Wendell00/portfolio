# ---------- BUILD ----------
FROM node:20-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm

# arquivos da raiz
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# copia TODOS os packages do workspace
COPY apps ./apps

# agora sim: workspace completo
RUN pnpm install --frozen-lockfile

# prisma no contexto correto
RUN pnpm prisma generate --schema=apps/api/prisma/schema.prisma

# build apenas da api
RUN pnpm --filter api build



# ---------- RUN ----------
FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# 🔥 IMPORTANTE: sem --ignore-scripts
RUN pnpm install --prod

# 🔥 gera o prisma no container final
RUN pnpm dlx prisma@6.16.1 generate --schema=apps/api/prisma/schema.prisma

EXPOSE 3000

