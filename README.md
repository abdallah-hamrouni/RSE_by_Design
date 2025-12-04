# RSE by Design - Challenge Numih France 2024

Une plateforme collaborative innovante où la Responsabilité Sociétale des Entreprises s'intègre dès la conception des projets numériques de santé.

## Concept

Le **RSE by Design** s'inspire du "Privacy by Design" et du "Security by Design" pour garantir que les principes de responsabilité sociétale sont intégrés dès la conception de tout projet numérique.

Cette plateforme permet aux utilisateurs de :
- Proposer des initiatives RSE innovantes
- Voter pour les projets qui les inspirent
- Suivre l'impact collectif de la communauté
- Co-construire l'avenir éthique de la santé numérique

## Fonctionnalités

### Pour tous les utilisateurs
- Navigation intuitive et design moderne
- Découverte des initiatives RSE par catégorie (Environnement, Social, Gouvernance)
- Visualisation des statistiques d'impact en temps réel
- Interface responsive adaptée à tous les écrans

### Pour les utilisateurs authentifiés
- Création de nouvelles initiatives RSE
- Vote sur les initiatives de la communauté
- Suivi personnalisé des contributions
- Profil avec organisation

## Architecture technique

### Stack technologique
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS avec design system personnalisé
- **Base de données**: Supabase (PostgreSQL)
- **Authentification**: Supabase Auth (email/password)
- **Icons**: Lucide React

### Structure de la base de données

#### Tables principales
- **profiles**: Profils utilisateurs étendus
- **categories**: Catégories RSE (Environnement, Social, Gouvernance)
- **initiatives**: Propositions d'initiatives RSE
- **votes**: Système de vote communautaire

#### Sécurité
- Row Level Security (RLS) activé sur toutes les tables
- Politiques restrictives par défaut
- Authentification requise pour les actions sensibles

## Installation et configuration

### Prérequis
- Node.js 18+
- npm ou yarn
- Un projet Supabase configuré

### Installation

```bash
# Cloner le dépôt
git clone <votre-repo>
cd rse-by-design

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env avec :
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase

# Lancer en développement
npm run dev

# Build de production
npm run build
```

### Configuration Supabase

Les migrations sont déjà appliquées. La base de données contient :
- 3 catégories RSE par défaut
- Tables avec RLS configuré
- Triggers pour la mise à jour automatique des compteurs

## Design et accessibilité

### Principes de design
- Design system cohérent avec 3 catégories couleur principales
- Espacement basé sur un système 8px
- Typographie hiérarchisée avec des tailles appropriées
- Contraste suffisant pour l'accessibilité (WCAG AA)

### Responsive Design
- Breakpoints adaptés mobile/tablette/desktop
- Navigation optimisée pour tous les écrans
- Grilles flexibles et composants adaptatifs

### Animations
- Transitions fluides et performantes
- Micro-interactions pour améliorer l'engagement
- États hover et focus clairement visibles

## RSE by Design en pratique

Cette plateforme elle-même incarne les principes RSE by Design :

1. **Environnement**
   - Architecture optimisée pour des performances énergétiques
   - Minimisation des requêtes réseau
   - Code léger et efficace

2. **Social**
   - Interface accessible et inclusive
   - Participation démocratique via le vote
   - Transparence des contributions

3. **Gouvernance**
   - Données hébergées en France (Supabase)
   - Sécurité et privacy by design
   - Code open source et auditable

## Contribution au Challenge Numih France

Ce projet répond au défi "RSE by Design" en proposant :
- Une plateforme concrète et opérationnelle
- Une approche collaborative et participative
- Un exemple d'intégration des principes RSE dès la conception
- Un outil réutilisable pour d'autres contextes

## Perspectives d'évolution

- Système de gamification pour encourager la participation
- Tableaux de bord d'impact détaillés par catégorie
- Export des données pour rapports RSE
- Intégration avec des outils de mesure d'impact
- Module de suivi de réalisation des initiatives
- API publique pour intégration externe

## Auteur

Développé pour le Challenge Numih France 2024

## Licence

Ce projet est développé dans le cadre du challenge Numih France.
