import { Leaf, LogOut, User } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext'; // Supprimer l'importation de useAuth

interface HeaderProps {
  onAuthClick: () => void;
}

// Simuler l'état de l'utilisateur

const IS_LOGGED_IN = true; // Changer à false pour voir l'état "Connexion"

export function Header({ onAuthClick }: HeaderProps) {
  // const { user, profile, signOut } = useAuth(); // Remplacer par des mocks

  const user = IS_LOGGED_IN ? {} : null; // Simuler la présence de l'utilisateur
  const signOut = () => alert('Déconnexion simulée');

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RSE by Design</h1>
              <p className="text-xs text-gray-600">Numih France Challenge</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
           
          </div>
        </div>
      </div>
    </header>
  );
}