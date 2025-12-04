// Dashboard.tsx
import { useState, useEffect } from 'react';
import { Plus, TrendingUp, Users, Target, Leaf } from 'lucide-react';
import { InitiativeCard } from './InitiativeCard';
import { CreateInitiativeModal } from './CreateInitiativeModal';

// --- Interfaces ---
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

interface Stats {
  totalInitiatives: number;
  totalVotes: number;
  totalUsers: number;
  totalImpact: number;
}

// --- Mocks ---
const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Environnement', color: '#10B981' },
  { id: '2', name: 'Social', color: '#6366F1' },
  { id: '3', name: 'Gouvernance', color: '#14B8A6' },
];

const MOCK_INITIATIVES: InitiativeWithDetails[] = [
  {
    id: '101',
    title: 'Programme de recyclage avancé',
    description: 'Système de tri et recyclage des déchets médicaux.',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    votes_count: 45,
    status: 'active',
    impact_score: 120,
    category_id: '1',
    user_id: 'user-a',
    categories: MOCK_CATEGORIES[0],
    profiles: { id: 'user-a', full_name: 'Dr. Dubois', organization: 'CHU Ouest' },
    user_voted: false,
  },
  {
    id: '102',
    title: 'Atelier bien-être & solidarité',
    description: 'Ateliers de soutien psychologique pour le personnel soignant.',
    created_at: new Date(Date.now() - 7 * 3600000).toISOString(),
    votes_count: 120,
    status: 'proposed',
    impact_score: 90,
    category_id: '2',
    user_id: 'user-b',
    categories: MOCK_CATEGORIES[1],
    profiles: { id: 'user-b', full_name: 'Mme. Leclerc', organization: 'Clinique Alpha' },
    user_voted: true,
  },
];

const MOCK_STATS: Stats = {
  totalInitiatives: MOCK_INITIATIVES.length,
  totalVotes: MOCK_INITIATIVES.reduce((acc, init) => acc + init.votes_count, 0),
  totalUsers: MOCK_INITIATIVES.length,
  totalImpact: MOCK_INITIATIVES.reduce((acc, init) => acc + init.impact_score, 0),
};

// --- Dashboard Component ---
export function Dashboard() {
  const [initiatives, setInitiatives] = useState<InitiativeWithDetails[]>([]);
  const [stats, setStats] = useState<Stats>(MOCK_STATS);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    setInitiatives(MOCK_INITIATIVES);
  }, []);

  // --- Vote ---
  const handleVote = (initiativeId: string) => {
    setInitiatives(prev =>
      prev.map(init =>
        init.id === initiativeId && !init.user_voted
          ? { ...init, votes_count: init.votes_count + 1, impact_score: init.impact_score + 1, user_voted: true }
          : init
      )
    );

    const initiative = initiatives.find(init => init.id === initiativeId);
    if (initiative && !initiative.user_voted) {
      setStats(prev => ({
        ...prev,
        totalVotes: prev.totalVotes + 1,
        totalImpact: prev.totalImpact + 1,
      }));
    }
  };

  // --- Création d'initiative ---
  const handleInitiativeCreated = (newInit: InitiativeWithDetails) => {
    setInitiatives(prev => [newInit, ...prev]);
    setStats(prev => ({
      ...prev,
      totalInitiatives: prev.totalInitiatives + 1,
      totalVotes: prev.totalVotes + newInit.votes_count,
      totalImpact: prev.totalImpact + newInit.impact_score,
      totalUsers: prev.totalUsers + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Initiatives', value: stats.totalInitiatives, icon: <Target className="w-6 h-6 text-emerald-600" />, bg: 'bg-emerald-100' },
            { label: 'Votes totaux', value: stats.totalVotes, icon: <TrendingUp className="w-6 h-6 text-blue-600" />, bg: 'bg-blue-100' },
            { label: 'Contributeurs', value: stats.totalUsers, icon: <Users className="w-6 h-6 text-violet-600" />, bg: 'bg-violet-100' },
            { label: 'Impact total', value: stats.totalImpact, icon: <Leaf className="w-6 h-6 text-teal-600" />, bg: 'bg-teal-100' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Initiatives RSE</h2>
            <p className="text-gray-600 mt-1">Découvrez et soutenez les projets de la communauté</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Nouvelle initiative</span>
          </button>
        </div>

        {/* Liste */}
        {initiatives.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune initiative pour le moment</h3>
            <p className="text-gray-600 mb-6">Soyez le premier à proposer une initiative RSE !</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Créer une initiative</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map(init => (
              <InitiativeCard key={init.id} initiative={init} onVoteChange={() => handleVote(init.id)} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <CreateInitiativeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleInitiativeCreated}
      />
    </div>
  );
}
