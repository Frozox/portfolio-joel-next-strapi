# Portfolio de Joel Chapeau

Un projet full-stack moderne pour présenter le portfolio de **Joel Chapeau**, construit avec :

- **Strapi** (CMS headless)
- **Next.js** (frontend React)
- **PostgreSQL** (base de données)
- **Docker Compose** & **Portainer Stacks** pour l’orchestration
- **Harbor** (registry privé)

## 🚀 Stack technique
- **Backend** : Strapi, configuré pour exposer une API headless flexible.  
- **Frontend** : Next.js, avec un sdk pour communiquer facilement a vec strapi 
- **Base de données** : PostgreSQL.  
- **Infrastructure** : Docker Compose pour le développement et Portainer pour l’orchestration en production.  

## 📂 Architecture
```
package.json
pnpm-workspace.yaml
docker-compose.yaml
Makefile
...
deploy
 └─ docker
     └─ Dockerfile
apps
 ├─ strapi
 │   ├─ package.json
 │   └─ ...
 └─ nextjs
     ├─ package.json
     └─ ...
```

## 🖥️ Développement local
Le projet utilise **pnpm** et est organisé en workspace monorepo (apps/strapi, apps/nextjs, etc.).

### 📦 Installation des dépendances
```bash
pnpm install
```

### 🚧 Lancer en mode développement

Démarrer tous les apps en mode dev (hot-reload) :
```bash
pnpm dev
# ou pour chaque app individuellement
pnpm --filter=strapi dev
pnpm --filter=nextjs dev
```

### 🏗️ Builder le projet
```bash
pnpm build
```

### 📤 Déployer localement
```bash
pnpm deploy
```

### ▶️ Lancer en mode production
```bash
pnpm start
```


ℹ️ Ces commandes sont communes aux workspaces Strapi et Next.js.
Elles sont utilisées dans le Dockerfile pour automatiser le build et le déploiement.

## 🛠️ Workflow de développement
1. Start / Stop / Restart des services
```bash
make up
make down
make restart
```

2. Connexion au registre
```bash
make login
```

3. Build & push des images multi-arch (amd64 + arm64)
```bash
make deploy-all
# ou individuellement
make deploy-strapi
make deploy-nextjs
```

## ⚙️ Environnement
```ini
# Backend
PUBLIC_URL=http://127.0.0.1:80
IS_PROXIED=false
APP_KEYS=ChangeMe
API_TOKEN_SALT=ChangeMe
ADMIN_JWT_SECRET=ChangeMe
TRANSFER_TOKEN_SALT=ChangeMe
JWT_SECRET=ChangeMe
HCAPTCHA_SECRET_KEY=ChangeMe
# - MAIL
EMAIL_SMTP_HOST=smtp.example.fr
EMAIL_SMTP_PORT=465
EMAIL_SMTP_USER=john-doe@example.fr
EMAIL_SMTP_PASS=ChangeMe
EMAIL_ADDRESS_FROM=john-doe@example.fr
# - Database
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=portfolio-joel
DATABASE_USERNAME=user
DATABASE_PASSWORD=password

# Frontend
NEXT_PUBLIC_FRONTEND_HOST=127.0.0.1:8001
NEXT_PUBLIC_BACKEND_HOST=127.0.0.1:8000
NEXT_PUBLIC_HCAPTCHA_SITEKEY=ChangeMe

# POSTGRES
POSTGRES_USER=user
POSTGRES_PASSWORD=password
```