# Dividy

## Getting Started

### 1. Variables d'environnement

Copie le fichier `.env.local.example` en `.env.local` (et éventuellement en `.env`), puis remplis les valeurs. Le fichier `.env.local.example` est committé, tandis que `.env` et `.env.local` restent locaux :

```bash
cp .env.local.example .env.local
# Optionnel : si tu utilises aussi un fichier .env
cp .env.local.example .env
```

### 2. Générer le client Prisma

```bash
npm run prisma:generate
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
