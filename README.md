# Application Nx Angular + NestJS avec gRPC

Cette application démontre une architecture moderne avec :
- **Frontend Angular** avec SSR, standalone components, et signaux
- **Backend NestJS** avec support gRPC et HTTP
- **Communication gRPC** entre microservices
- **Gestion moderne de l'état** avec les signaux Angular

## 🏗️ Architecture

```
Nx-CI-CD/
├── apps/
│   ├── angular-frontend/          # Application Angular SSR
│   │   ├── src/app/components/   # Composants standalone
│   │   └── src/app/services/     # Services avec signaux
│   └── nestjs-backend/           # Application NestJS
│       ├── src/app/controllers/  # Contrôleurs HTTP et gRPC
│       ├── src/app/services/     # Services métier
│       └── src/app/interfaces/   # Types TypeScript
└── proto/                        # Définitions Protocol Buffers
```

## 🚀 Fonctionnalités

### Frontend Angular
- ✅ **SSR (Server-Side Rendering)** pour de meilleures performances
- ✅ **Standalone Components** sans modules
- ✅ **Signaux Angular** pour la gestion d'état réactive
- ✅ **Pas de Zone.js** pour une approche moderne
- ✅ **Séparation des fichiers** HTML, SCSS, TS
- ✅ **Lazy Loading** des composants
- ✅ **Forms réactifs** avec validation

### Backend NestJS
- ✅ **Application Hybride** HTTP + gRPC
- ✅ **Microservice gRPC** sur le port 5000
- ✅ **API HTTP REST** sur le port 3000
- ✅ **Protocol Buffers** pour la définition des services
- ✅ **Controllers séparés** pour HTTP et gRPC
- ✅ **Services métier** réutilisables

### Communication gRPC
- ✅ **Service UserService** avec 3 opérations :
  - `GetUser` : Récupérer un utilisateur par ID
  - `CreateUser` : Créer un nouvel utilisateur
  - `GetUsers` : Lister les utilisateurs avec pagination

## 📦 Installation et démarrage

### Prérequis
- Node.js 18+
- pnpm

### Installation
```bash
cd Nx-CI-CD
pnpm install
```

### Démarrage
```bash
# Terminal 1 - Backend NestJS (HTTP + gRPC)
pnpm nx serve nestjs-backend

# Terminal 2 - Frontend Angular avec SSR
pnpm nx serve angular-frontend
```

### URLs
- **Frontend Angular** : http://localhost:4200
- **Backend HTTP API** : http://localhost:3000/api
- **Backend gRPC** : localhost:5000

## 🔧 Structure des composants

### Composants Angular
1. **App Component** : Composant racine avec navigation
2. **Home Component** : Page d'accueil avec présentation
3. **UserList Component** : Liste des utilisateurs avec pagination
4. **UserForm Component** : Formulaire de création d'utilisateur

### Services Angular
1. **UserService** : Communication HTTP avec le backend
2. **GrpcUserService** : Préparé pour communication gRPC directe

## 📊 Gestion d'état avec Signaux

```typescript
// Dans UserService
users = signal<User[]>([]);
loading = signal<boolean>(false);
error = signal<string | null>(null);

// Dans les composants
users = signal<User[]>([]);
showForm = signal<boolean>(false);

// Utilisation dans les templates
@if (loading()) {
  <p>Chargement...</p>
}
```

## 🔌 Configuration gRPC

### Protocol Buffer (proto/user.proto)
```protobuf
service UserService {
  rpc GetUser (GetUserRequest) returns (GetUserResponse) {}
  rpc CreateUser (CreateUserRequest) returns (CreateUserResponse) {}
  rpc GetUsers (GetUsersRequest) returns (GetUsersResponse) {}
}
```

### NestJS gRPC Controller
```typescript
@Controller()
export class UserController {
  @GrpcMethod('UserService', 'GetUser')
  async getUser(request: GetUserRequest): Promise<GetUserResponse> {
    return this.userService.getUser(request);
  }
}
```

## 🛠️ Commandes utiles

```bash
# Générer un nouveau composant Angular
pnpm nx generate @nx/angular:component apps/angular-frontend/src/app/components/mon-composant --standalone --style=scss

# Générer un nouveau service Angular
pnpm nx generate @nx/angular:service --project=angular-frontend --path=apps/angular-frontend/src/app/services --name=mon-service

# Générer un contrôleur NestJS
pnpm nx generate @nx/nest:controller apps/nestjs-backend/src/app/controllers/mon-controller

# Build de production
pnpm nx build angular-frontend
pnpm nx build nestjs-backend
```

## 🏆 Bonnes pratiques implémentées

1. **Separation of Concerns** : Composants, services, et interfaces séparés
2. **Standalone Components** : Approche moderne Angular sans modules
3. **Signaux** : Gestion d'état réactive moderne
4. **gRPC** : Communication haute performance entre services
5. **TypeScript strict** : Types stricts pour la robustesse
6. **Lazy Loading** : Chargement différé des composants
7. **SSR** : Rendu côté serveur pour les performances
8. **Hybrid App** : Support HTTP et gRPC simultané

## 🎯 Prochaines étapes

- [ ] Implémenter le client gRPC-Web côté Angular
- [ ] Ajouter l'authentification JWT
- [ ] Implémenter la gestion d'erreurs globale
- [ ] Ajouter des tests e2e
- [ ] Configurer le déploiement CI/CD
- [ ] Ajouter un système de logs centralisé

## 📝 Notes techniques

- L'application utilise la dernière version d'Angular (20.x) avec les signaux
- NestJS est configuré en mode hybride (HTTP + gRPC)
- Pas de Zone.js pour une approche moderne de la détection de changement
- Communication actuelle via HTTP (gRPC-Web en préparation)
- Architecture prête pour la montée en charge avec les microservices

---

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **Nx workspace** avec Angular 20 + NestJS + gRPC ✨
