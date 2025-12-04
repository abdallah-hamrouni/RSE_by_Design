import { ArrowRight, Leaf, Users, Shield, Target, TrendingUp, Heart } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
   onQuizClick: () => void;
}

export function LandingPage({ onGetStarted,onQuizClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Challenge Numih France 2025
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            RSE by Design
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Une plateforme collaborative où la Responsabilité Sociétale des Entreprises
            s'intègre dès la conception. Co-construisez l'avenir éthique de la santé numérique.
          </p>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Commencer maintenant</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="bg-emerald-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Environnement</h3>
            <p className="text-gray-600 leading-relaxed">
              Proposez des initiatives pour réduire l'empreinte carbone et promouvoir
              la durabilité dans les établissements de santé.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Social</h3>
            <p className="text-gray-600 leading-relaxed">
              Créez des actions pour améliorer le bien-être des équipes et renforcer
              la cohésion sociale au sein de votre organisation.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="bg-violet-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-violet-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Gouvernance</h3>
            <p className="text-gray-600 leading-relaxed">
              Partagez vos pratiques éthiques et transparentes pour une meilleure
              gouvernance des systèmes d'information de santé.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-12 shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Le concept RSE by Design
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                 Une approche par la conception

              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Le <span className="font-bold text-emerald-600">RSE by Design</span> dès la phase de conception de vos projets
Créez des solutions durables et responsables par nature.

              </p>
              <p className="text-gray-700 leading-relaxed">
                Transformez les contraintes environnementales et sociales en opportunités d'innovation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Une démarche collaborative
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Proposez</strong> vos initiatives RSE innovantes
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Votez</strong> pour les projets qui vous inspirent
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Heart className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Suivez</strong> l'impact collectif de la communauté
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à transformer la santé numérique ?
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez la communauté Numih France et contribuez à un avenir plus responsable
          </p>
           <button
            onClick={onQuizClick} // <-- Fonction du composant parent AppContent
            className="inline-flex items-center space-x-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg"
          >
            <span>Quiz</span>
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>
      </div>
   <footer className="mt-20 bg-white/90 backdrop-blur-xl border-t border-emerald-200 shadow-inner">
  <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

    {/* Logo + Description */}
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">Numih France</h3>
      <p className="text-gray-600 leading-relaxed">
        Numih France accompagne la transformation responsable de la santé numérique 
        à travers des solutions innovantes intégrant l’éthique, l’environnement 
        et la gouvernance. Ensemble, construisons un numérique plus durable.
      </p>
    </div>

    {/* Navigation */}
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h4>
      <ul className="space-y-3 text-gray-700">
        <li><a className="hover:text-emerald-600 transition-colors">Accueil</a></li>
        <li><a  className="hover:text-emerald-600 transition-colors">Concept RSE</a></li>
        <li><a  className="hover:text-emerald-600 transition-colors">Initiatives</a></li>
        <li><a  className="hover:text-emerald-600 transition-colors">Quiz</a></li>
      </ul>
    </div>

    {/* Domaines */}
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Domaines</h4>
      <ul className="space-y-3 text-gray-700">
        <li><a  className="hover:text-emerald-600 transition-colors">Environnement</a></li>
        <li><a className="hover:text-emerald-600 transition-colors">Social</a></li>
        <li><a  className="hover:text-emerald-600 transition-colors">Gouvernance</a></li>
        <li><a  className="hover:text-emerald-600 transition-colors">Impact & Innovation</a></li>
      </ul>
    </div>

  </div>

  {/* Baseline */}
  <div className="border-t border-emerald-200 py-6 text-center text-gray-600 text-sm">
    Une initiative pour un numérique plus responsable et durable.
  </div>

  {/* Copyright */}
  <div className="text-center text-gray-500 text-sm pb-6">
    © {new Date().getFullYear()} Numih France — RSE by Design. Tous droits réservés.
  </div>
</footer>

    </div>
  );
}
