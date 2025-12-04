import { useState } from 'react';
import { X } from 'lucide-react';

interface Category { id: string; name: string; color: string; }
interface InitiativeWithDetails {
  id: string;
  title: string;
  description: string;
  created_at: string;
  votes_count: number;
  status: 'proposed' | 'active' | 'completed';
  impact_score: number;
  category_id: string;
  user_id: string;
  categories: Category | null;
  profiles: { id: string; full_name: string; organization: string };
  user_voted?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newInit: InitiativeWithDetails) => void;
}

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Environnement', color: '#10B981' },
  { id: '2', name: 'Social', color: '#6366F1' },
  { id: '3', name: 'Gouvernance', color: '#14B8A6' },
];

export function CreateInitiativeModal({ isOpen, onClose, onSuccess }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [impactScore, setImpactScore] = useState<number>(0);
  const [categoryId, setCategoryId] = useState('1');

  const handleSubmit = () => {
    const currentUserId = 'user-new';
    const currentUserName = 'Utilisateur Test';
    const currentUserOrg = 'Organisation Test';

    onSuccess({
      id: Date.now().toString(),
      title,
      description,
      created_at: new Date().toISOString(),
      votes_count: 0,
      status: 'proposed',
      impact_score: impactScore,
      category_id: categoryId,
      user_id: currentUserId,
      categories: MOCK_CATEGORIES.find(c => c.id === categoryId) || null,
      profiles: { id: currentUserId, full_name: currentUserName, organization: currentUserOrg },
      user_voted: false,
    });

    setTitle('');
    setDescription('');
    setImpactScore(10);
    setCategoryId('1');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-scaleIn">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📝 Créer une initiative
        </h2>

        <div className="flex flex-col space-y-4">

          {/* Title input */}
          <input
            type="text"
            placeholder="Titre de l'initiative"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            rows={4}
          />

          {/* Impact */}
          <div>
            <label className="text-sm font-medium text-gray-700">Impact estimé</label>
            <input
              type="number"
              value={impactScore}
              onChange={e => setImpactScore(Number(e.target.value))}
              className="mt-1 border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-700">Catégorie</label>
            <select
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="mt-1 border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {MOCK_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
          >
            🚀 Créer l'initiative
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn .25s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn .25s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes scaleIn {
          from { transform: scale(.9); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }
      `}</style>
    </div>
  );
}
