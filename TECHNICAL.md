# Documentation Technique - RSE by Design

## Architecture de l'application

### Structure des fichiers

```
src/
├── components/           # Composants React réutilisables
│   ├── AuthModal.tsx    # Modal d'authentification (login/signup)
│   ├── CreateInitiativeModal.tsx  # Formulaire de création d'initiative
│   ├── Dashboard.tsx    # Tableau de bord principal
│   ├── Header.tsx       # En-tête avec navigation
│   ├── InitiativeCard.tsx  # Carte d'affichage d'une initiative
│   └── LandingPage.tsx  # Page d'accueil publique
├── contexts/
│   └── AuthContext.tsx  # Contexte d'authentification global
├── lib/
│   ├── database.types.ts  # Types TypeScript pour la base de données
│   └── supabase.ts      # Client Supabase configuré
├── App.tsx              # Composant racine
├── main.tsx             # Point d'entrée
└── index.css            # Styles globaux et animations
```

## Base de données Supabase

### Schéma relationnel

```
profiles (1) ─── (n) initiatives
                      │
                      │ (1)
                      │
                  categories
                      │
                      │ (n)
initiatives (1) ─── (n) votes ─── (1) profiles
```

### Tables détaillées

#### profiles
Extension du système auth.users de Supabase
- Stocke les informations supplémentaires des utilisateurs
- Lien 1:1 avec auth.users via l'id
- Utilisé pour afficher les noms et organisations

#### categories
Catégories prédéfinies pour classifier les initiatives
- 3 catégories : Environnement, Social, Gouvernance
- Chaque catégorie a une couleur et une icône associée
- Lecture seule pour les utilisateurs

#### initiatives
Propositions d'initiatives RSE
- Chaque initiative appartient à une catégorie
- Lien vers l'auteur (profiles)
- Statuts : proposed, active, completed
- Compteurs de votes et d'impact mis à jour automatiquement

#### votes
Table de jointure pour le système de vote
- Contrainte UNIQUE sur (initiative_id, user_id)
- Un utilisateur ne peut voter qu'une fois par initiative
- Les suppressions en cascade maintiennent l'intégrité

### Triggers et fonctions

#### update_votes_count()
Fonction PostgreSQL qui maintient à jour le compteur votes_count sur initiatives
- Déclenchée après INSERT ou DELETE sur votes
- Incrémente/décrémente automatiquement
- Garantit la cohérence des données

#### update_updated_at_column()
Met à jour automatiquement le champ updated_at
- Déclenchée avant UPDATE sur initiatives
- Simplifie la gestion des timestamps

## Sécurité (Row Level Security)

### Philosophie
- **Restrictif par défaut** : RLS activé sur toutes les tables
- **Authentification requise** : La plupart des actions nécessitent un compte
- **Principe du moindre privilège** : Les utilisateurs n'accèdent qu'à leurs données

### Politiques RLS détaillées

#### profiles
```sql
- SELECT: Tous les utilisateurs authentifiés peuvent voir tous les profils
- INSERT: Un utilisateur ne peut créer que son propre profil
- UPDATE: Un utilisateur ne peut modifier que son propre profil
```

#### categories
```sql
- SELECT: Lecture publique pour tous les utilisateurs authentifiés
- INSERT/UPDATE/DELETE: Aucune politique (gestion administrative uniquement)
```

#### initiatives
```sql
- SELECT: Tous les utilisateurs authentifiés peuvent voir toutes les initiatives
- INSERT: Les utilisateurs peuvent créer des initiatives (author_id = auth.uid())
- UPDATE: Les auteurs peuvent modifier leurs propres initiatives
- DELETE: Les auteurs peuvent supprimer leurs propres initiatives
```

#### votes
```sql
- SELECT: Tous les utilisateurs authentifiés peuvent voir tous les votes
- INSERT: Les utilisateurs peuvent voter (user_id = auth.uid())
- DELETE: Les utilisateurs peuvent retirer leur vote
- Contrainte UNIQUE empêche les votes multiples
```

## Authentification

### Flow d'authentification

1. **Signup**
   - Création compte via Supabase Auth
   - Insertion automatique dans la table profiles
   - Session créée automatiquement

2. **Login**
   - Authentification via email/password
   - Récupération du profil associé
   - Mise à jour du contexte React

3. **Session persistence**
   - Gérée automatiquement par Supabase
   - Token JWT dans localStorage
   - Refresh automatique

### AuthContext
Contexte React qui gère :
- État de l'utilisateur courant
- Profil complet avec organisation
- Fonctions signUp, signIn, signOut
- État de chargement

## Frontend

### Architecture des composants

#### Composants de présentation
- **LandingPage** : Page marketing expliquant le concept
- **Header** : Navigation persistante avec info utilisateur
- **InitiativeCard** : Affichage d'une initiative avec vote

#### Composants conteneurs
- **Dashboard** : Gère le state et les données des initiatives
- **AuthModal** : Gère le state du formulaire d'auth
- **CreateInitiativeModal** : Gère la création d'initiative

#### Composants d'ordre supérieur
- **App** : Routage conditionnel (authenticated vs public)
- **AuthProvider** : Fournit le contexte auth à toute l'app

### Gestion de l'état

#### État local (useState)
- Formulaires (inputs, validation)
- Modals (open/closed)
- Filtres et tri

#### Contexte (Context API)
- Authentification (AuthContext)
- Partagé dans toute l'application

#### État serveur (Supabase)
- Données persistantes
- Pas de cache côté client (toujours à jour)
- Rechargement après mutations

### Optimisations de performance

1. **Chargements conditionnels**
   - Dashboard chargé uniquement si authentifié
   - Données chargées à la demande

2. **Queries optimisées**
   - Sélection des colonnes nécessaires uniquement
   - Jointures efficaces avec profiles et categories

3. **Updates minimaux**
   - Rechargement ciblé après mutations
   - État local pour interactions rapides

## Design System

### Palette de couleurs

#### Couleurs principales
- Emerald (500-700) : Actions primaires, succès
- Teal (500-700) : Accent, complémentaire
- Gray (100-900) : UI, textes, bordures

#### Couleurs catégories
- Environnement : Green (#10b981)
- Social : Blue (#3b82f6)
- Gouvernance : Violet (#8b5cf6)

### Typographie

#### Hiérarchie
- Titres principaux : 3xl-5xl (30-48px)
- Sous-titres : xl-2xl (20-24px)
- Corps de texte : base (16px)
- Texte secondaire : sm-xs (12-14px)

#### Poids
- Bold (700) : Titres, CTA
- Semibold (600) : Sous-titres
- Medium (500) : Labels
- Regular (400) : Corps

### Espacements

Système basé sur 8px :
- Spacing interne : 4, 8, 12, 16, 24px
- Marges entre éléments : 16, 24, 32px
- Sections : 48, 64px

### Composants UI

#### Boutons
- Primary : Gradient emerald-teal
- Secondary : Background gray
- States : hover (scale 105%), disabled (opacity 50%)

#### Cartes
- Background : white
- Border-radius : 12-16px
- Shadow : md, hover xl
- Padding : 24px

#### Inputs
- Border : gray-300
- Focus : ring emerald-500
- Padding : 12px
- Icons : gray-400, left-aligned

## Responsive Design

### Breakpoints
- Mobile : < 640px
- Tablet : 640px - 1024px
- Desktop : > 1024px

### Adaptations
- Grilles : 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
- Header : Infos condensées sur mobile
- Modals : Fullscreen sur mobile, centrés sur desktop
- Espacement réduit sur mobile

## Accessibilité

### Standards WCAG 2.1 AA

#### Contraste
- Texte principal : ratio > 4.5:1
- Texte large : ratio > 3:1
- Éléments interactifs : bordures visibles

#### Navigation clavier
- Tous les éléments interactifs accessibles au tab
- Focus visible sur tous les éléments
- Ordre logique de tabulation

#### Sémantique HTML
- Headings hiérarchisés (h1, h2, h3)
- Labels associés aux inputs
- Boutons avec texte descriptif

## Tests et validation

### Type checking
```bash
npm run typecheck
```
Vérifie la cohérence des types TypeScript

### Linting
```bash
npm run lint
```
Vérifie la qualité du code avec ESLint

### Build de production
```bash
npm run build
```
Compile et optimise pour la production

## Déploiement

### Variables d'environnement requises
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```

### Build de production
Le dossier `dist/` contient :
- HTML minifié
- CSS optimisé (19.2 KB gzipped)
- JS bundlé et tree-shaked (302.8 KB → 87.8 KB gzipped)

### Hébergement recommandé
- Vercel (déploiement automatique depuis Git)
- Netlify (build automatique)
- Supabase Hosting (intégration native)

## Évolutions possibles

### Court terme
- Notifications en temps réel (Supabase Realtime)
- Recherche full-text sur initiatives
- Export CSV/PDF des données

### Moyen terme
- Système de commentaires
- Gamification (badges, points)
- Module de messagerie interne

### Long terme
- Analytics avancés d'impact
- API REST publique
- Application mobile (React Native)
- Intégration IA pour suggestions
