import { useState, useEffect } from 'react';

import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Quiz } from './components/Quiz'; // <-- Nouveau composant Quiz

// URLs de simulation pour l'API History du navigateur
const PATH_DASHBOARD = '/dashboard';
const PATH_LANDING = '/';
const PATH_QUIZ = '/quiz';

/**
 * Détermine la vue initiale en lisant l'URL actuelle du navigateur.
 */
function getInitialView() {
  if (window.location.pathname === PATH_DASHBOARD) return PATH_DASHBOARD;
  if (window.location.pathname === PATH_QUIZ) return PATH_QUIZ;
  return PATH_LANDING;
}

function AppContent() {
  const [currentPath, setCurrentPath] = useState(getInitialView);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const loading = false;

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, path, path);
      setCurrentPath(path);
    }
  };

  const handleGetStarted = () => navigate(PATH_DASHBOARD);
  const handleQuizClick = () => navigate(PATH_QUIZ);
  const handleAuthClick = () => setShowAuthModal(true);

  const isDashboardView = currentPath === PATH_DASHBOARD;
  const isLandingView = currentPath === PATH_LANDING;
  const isQuizView = currentPath === PATH_QUIZ;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header onAuthClick={handleAuthClick} />

      {/* Rendu conditionnel selon la route simulée */}
      {isDashboardView ? (
        <Dashboard />
      ) : isLandingView ? (
        <LandingPage onGetStarted={handleGetStarted} onQuizClick={handleQuizClick} />
      ) : isQuizView ? (
        <Quiz />
      ) : (
        <LandingPage onGetStarted={handleGetStarted} onQuizClick={handleQuizClick} />
      )}

      {/* Modale d'authentification */}
     

      {/* Bouton de retour dans le Dashboard */}
      {isDashboardView && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => navigate(PATH_LANDING)}
            className="inline-flex items-center space-x-2 bg-gray-700 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition-colors text-sm transform hover:scale-105"
          >
            ← Retour à l'accueil
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
