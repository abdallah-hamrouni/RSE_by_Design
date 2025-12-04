// Quiz.tsx
import { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const QUESTIONS: Question[] = [
  {
    question: "Quelle initiative a le plus d'impact sur l'environnement ?",
    options: ["Recyclage", "Team-building", "Charte IA"],
    correctIndex: 0
  },
  {
    question: "Que signifie RSE ?",
    options: ["Responsabilité Sociale de l'Entreprise", "Réseau Social Étudiant", "Réduction des Stocks Énergétiques"],
    correctIndex: 0
  },
  {
    question: "Quel domaine vise à renforcer le bien-être des équipes ?",
    options: ["Environnement", "Social", "Gouvernance"],
    correctIndex: 1
  },
  {
    question: "Quel domaine concerne le partage de pratiques éthiques et transparentes ?",
    options: ["Social", "Environnement", "Gouvernance"],
    correctIndex: 2
  },
  {
    question: "Le RSE by Design doit être intégré :",
    options: ["Après la conception du projet", "Dès la conception du projet", "Uniquement pour le marketing"],
    correctIndex: 1
  },
  {
    question: "Que permet la démarche collaborative ?",
    options: ["Proposer, voter et suivre les initiatives RSE", "Créer des documents internes uniquement", "Évaluer les fournisseurs uniquement"],
    correctIndex: 0
  },
  {
    question: "Le Privacy by Design et Security by Design sont :",
    options: ["Des concepts similaires au RSE by Design", "Des méthodes de production", "Des logiciels de gestion"],
    correctIndex: 0
  },
  {
    question: "Quelles initiatives contribuent à l'impact collectif de la communauté ?",
    options: ["Suivre les projets et voter pour eux", "Ignorer les propositions", "Se concentrer sur l'administration"],
    correctIndex: 0
  },
  {
    question: "Quel principe garantit que chaque décision technique prend en compte l'impact environnemental, social et de gouvernance ?",
    options: ["RSE by Design", "Team-building", "Marketing digital"],
    correctIndex: 0
  },
  {
    question: "Quel est le but principal de la plateforme Numih France ?",
    options: ["Collaborer pour un futur éthique en santé numérique", "Former uniquement les employés", "Faire du commerce électronique"],
    correctIndex: 0
  },
];

export function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (selected !== null) return; // Empêche de cliquer plusieurs fois
    setSelected(index);

    if (index === QUESTIONS[current].correctIndex) {
      setScore(prev => prev + 1);
    }

    // Passe à la question suivante après un petit délai
    setTimeout(() => {
      if (current + 1 < QUESTIONS.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  if (finished) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md w-full animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-emerald-600">Quiz terminé ! 🎉</h2>
        <p className="text-xl mb-4">Votre score :</p>
        <p className="text-4xl font-extrabold mb-6">{score} / {QUESTIONS.length}</p>
        {score === QUESTIONS.length && <p className="text-green-600 font-semibold">Excellent ! Toutes les réponses sont correctes ✅</p>}
        {score < QUESTIONS.length && score > 0 && <p className="text-yellow-600 font-semibold">Bien joué ! Vous pouvez encore vous améliorer 🌟</p>}
        {score === 0 && <p className="text-red-600 font-semibold">Ne vous découragez pas ! Essayez encore 🔴</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full animate-fadeIn">
        <h3 className="text-xl font-semibold mb-6">{QUESTIONS[current].question}</h3>
        <div className="flex flex-col gap-3">
          {QUESTIONS[current].options.map((opt, idx) => {
            let base = "border rounded-lg p-3 font-medium transition-all duration-300 ";
            if (selected !== null) {
              if (idx === QUESTIONS[current].correctIndex) base += "bg-green-100 border-green-400 text-green-800";
              else if (idx === selected) base += "bg-red-100 border-red-400 text-red-800";
              else base += "opacity-50";
            } else {
              base += "hover:bg-emerald-100 cursor-pointer";
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={base}
                disabled={selected !== null}
              >
                {opt}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-gray-500 text-sm">
          Question {current + 1} / {QUESTIONS.length}
        </p>
      </div>
    </div>
  );
}
