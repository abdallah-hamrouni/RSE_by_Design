import { useState } from 'react';
import { ThumbsUp, Leaf, Users, Shield, Clock, TrendingUp } from 'lucide-react';
// Imports de base de données et d'authentification supprimés

// --- Types et Mocks statiques ---
interface Category { id: string; name: string; color: string; }
interface Profile { id: string; full_name: string; organization: string; }
type Status = 'proposed' | 'active' | 'completed';
interface Initiative {
  id: string;
  title: string;
  description: string;
  created_at: string;
  votes_count: number;
  status: Status;
  impact_score: number;
  category_id: string;
  user_id: string;
}

interface InitiativeWithDetails extends Initiative {
  categories: Category | null;
  profiles: Profile | null;
  user_voted?: boolean;
}

interface InitiativeCardProps {
  initiative: InitiativeWithDetails;
  onVoteChange: () => void;
}
// --------------------------------------------------------------------------

// L'exportation est confirmée ici pour corriger l'erreur Module 'InitiativeCard' has no exported member
export function InitiativeCard({ initiative, onVoteChange }: InitiativeCardProps) {
  // Simuler un utilisateur connecté pour le vote
  const user = { id: 'mock-user-123' }; 

  const [isVoting, setIsVoting] = useState(false);
  // Initialiser les états locaux basés sur les props pour permettre l'interaction statique
  const [isVoted, setIsVoted] = useState(initiative.user_voted);
  const [votesCount, setVotesCount] = useState(initiative.votes_count);


  const categoryIcons = {
    'Environnement': Leaf,
    'Social': Users,
    'Gouvernance': Shield,
  };

  const Icon = initiative.categories
    ? categoryIcons[initiative.categories.name as keyof typeof categoryIcons]
    : Leaf;

  const statusLabels = {
    proposed: 'Proposée',
    active: 'En cours',
    completed: 'Réalisée',
  };

  const statusColors = {
    proposed: 'bg-yellow-100 text-yellow-800',
    active: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  const handleVote = async () => {
    if (!user || isVoting) return;

    setIsVoting(true);

    // --- LOGIQUE DE VOTE SIMULÉE ---
    console.log(`Vote simulé pour l'initiative ${initiative.id}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simuler une attente réseau
    
    // Inverser l'état du vote et mettre à jour le compteur
    if (isVoted) {
      setIsVoted(false);
      setVotesCount(prev => prev - 1);
    } else {
      setIsVoted(true);
      setVotesCount(prev => prev + 1);
    }
    
    onVoteChange(); // Déclencher la mise à jour du dashboard (simulée)
    // --------------------------------

    setIsVoting(false);
  };
  
  const timeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (seconds < 60) return 'il y a quelques instants';
    if (seconds < 3600) return `il y a ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `il y a ${Math.floor(seconds / 3600)} h`;
    return `il y a ${Math.floor(seconds / 86400)} j`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {initiative.categories && (
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${initiative.categories.color}20` }}
            >
              <Icon
                className="w-5 h-5"
                style={{ color: initiative.categories.color }}
              />
            </div>
          )}
          <div>
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{
                backgroundColor: initiative.categories
                  ? `${initiative.categories.color}20`
                  : '#f3f4f6',
                color: initiative.categories?.color || '#6b7280',
              }}
            >
              {initiative.categories?.name || 'Non catégorisé'}
            </span>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[initiative.status]}`}>
          {statusLabels[initiative.status]}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {initiative.title}
      </h3>

      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {initiative.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{timeAgo(initiative.created_at)}</span>
          </div>
          {initiative.profiles && (
            <div className="flex items-center space-x-1">
              <span className="font-medium">{initiative.profiles.full_name}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleVote}
          disabled={!user || isVoting}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            isVoted 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <ThumbsUp className={`w-4 h-4 ${isVoted ? 'fill-current' : ''}`} />
          <span>{votesCount}</span>
        </button>
      </div>

      {initiative.impact_score > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-gray-700">
              Impact estimé: <span className="font-semibold text-emerald-600">{initiative.impact_score} points</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}