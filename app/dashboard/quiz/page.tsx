'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppLayout } from '@/components/layouts/app-layout';
import QuizSetup from '@/components/quiz/quiz-setup';
import QuizQuestion, { type Question } from '@/components/quiz/quiz-question';
import QuizResults from '@/components/quiz/quiz-results';
import ReviewMissed from '@/components/quiz/review-missed';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

// Mock materials - replace with real data
const mockMaterials = [
  {
    id: '1',
    title: 'Introduction to Quantum Computing',
    topic: 'Physics',
  },
  {
    id: '2',
    title: 'Advanced JavaScript Patterns',
    topic: 'Programming',
  },
  {
    id: '3',
    title: 'European History Timeline',
    topic: 'History',
  },
];

// Mock questions - replace with AI-generated questions
const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'What is a qubit in quantum computing?',
    type: 'multiple-choice',
    options: [
      'A classical bit that can only be 0 or 1',
      'A quantum bit that can be in superposition of 0 and 1',
      'A type of quantum computer',
      'A measurement unit for quantum speed',
    ],
    correctAnswer: 1,
    explanation: 'A qubit (quantum bit) is the fundamental unit of quantum information. Unlike classical bits that can only be 0 or 1, qubits can exist in a superposition of both states simultaneously, which is key to quantum computing\'s power.',
    source: 'Introduction to Quantum Computing, Chapter 2',
  },
  {
    id: '2',
    text: 'What phenomenon allows quantum computers to process many possibilities simultaneously?',
    type: 'multiple-choice',
    options: [
      'Quantum tunneling',
      'Wave function collapse',
      'Superposition',
      'Quantum decoherence',
    ],
    correctAnswer: 2,
    explanation: 'Superposition is the quantum mechanical phenomenon where a quantum system can exist in multiple states at once until measured. This allows quantum computers to explore many computational paths simultaneously.',
    source: 'Introduction to Quantum Computing, Chapter 3',
  },
  {
    id: '3',
    text: 'What is quantum entanglement?',
    type: 'multiple-choice',
    options: [
      'When two particles rotate in the same direction',
      'A correlation between particles where measuring one instantly affects the other',
      'The process of cooling quantum computers',
      'A type of quantum error',
    ],
    correctAnswer: 1,
    explanation: 'Quantum entanglement is a phenomenon where two or more particles become correlated in such a way that the quantum state of each particle cannot be described independently. Measuring one particle instantly determines the state of its entangled partner, regardless of distance.',
    source: 'Introduction to Quantum Computing, Chapter 4',
  },
  {
    id: '4',
    text: 'Which company developed the first commercially available quantum computer?',
    type: 'multiple-choice',
    options: [
      'IBM',
      'Google',
      'D-Wave',
      'Microsoft',
    ],
    correctAnswer: 2,
    explanation: 'D-Wave Systems was the first company to sell quantum computers commercially, starting with the D-Wave One in 2011. Their systems use quantum annealing, which is different from the gate-based approach used by IBM and Google.',
    source: 'Introduction to Quantum Computing, Chapter 1',
  },
  {
    id: '5',
    text: 'What is the main challenge in building practical quantum computers?',
    type: 'multiple-choice',
    options: [
      'Making them smaller',
      'Maintaining quantum coherence and reducing errors',
      'Finding enough electricity to power them',
      'Writing software for them',
    ],
    correctAnswer: 1,
    explanation: 'The main challenge in quantum computing is maintaining quantum coherence - keeping qubits in their delicate quantum states long enough to perform calculations. Environmental interference causes decoherence, leading to errors that are difficult to correct.',
    source: 'Introduction to Quantum Computing, Chapter 5',
  },
  {
    id: '6',
    text: 'What algorithm demonstrated quantum advantage for factoring large numbers?',
    type: 'multiple-choice',
    options: [
      'Grover\'s Algorithm',
      'Dijkstra\'s Algorithm',
      'Shor\'s Algorithm',
      'Euclid\'s Algorithm',
    ],
    correctAnswer: 2,
    explanation: 'Shor\'s Algorithm, developed by Peter Shor in 1994, demonstrated that quantum computers could factor large numbers exponentially faster than classical computers. This has significant implications for cryptography based on factoring difficulty.',
    source: 'Introduction to Quantum Computing, Chapter 6',
  },
  {
    id: '7',
    text: 'What does quantum supremacy (or quantum advantage) refer to?',
    type: 'multiple-choice',
    options: [
      'When quantum computers become affordable',
      'When a quantum computer solves a problem faster than any classical computer',
      'When quantum computers can connect to the internet',
      'When quantum computers can run classical software',
    ],
    correctAnswer: 1,
    explanation: 'Quantum supremacy (also called quantum advantage) refers to the milestone where a quantum computer performs a calculation that would be practically impossible for classical computers. Google claimed to achieve this in 2019 with their Sycamore processor.',
    source: 'Introduction to Quantum Computing, Chapter 7',
  },
  {
    id: '8',
    text: 'What is a quantum gate?',
    type: 'multiple-choice',
    options: [
      'A physical barrier in quantum computers',
      'An operation that manipulates qubits',
      'The entrance to a quantum lab',
      'A security feature',
    ],
    correctAnswer: 1,
    explanation: 'A quantum gate is a basic quantum circuit operating on a small number of qubits. They are the quantum equivalent of classical logic gates and are used to manipulate qubit states to perform quantum computations.',
    source: 'Introduction to Quantum Computing, Chapter 3',
  },
  {
    id: '9',
    text: 'At what temperature do most superconducting quantum computers operate?',
    type: 'multiple-choice',
    options: [
      'Room temperature',
      'Freezing point of water (0 degrees C)',
      'Near absolute zero (around -273 degrees C)',
      'Boiling point of nitrogen (-196 degrees C)',
    ],
    correctAnswer: 2,
    explanation: 'Superconducting quantum computers operate near absolute zero (about 15 millikelvin, or -273.135 degrees C). This extreme cold is necessary to minimize thermal noise and maintain the quantum coherence of the superconducting qubits.',
    source: 'Introduction to Quantum Computing, Chapter 5',
  },
  {
    id: '10',
    text: 'What is the term for unwanted interaction between a quantum system and its environment?',
    type: 'multiple-choice',
    options: [
      'Quantum leakage',
      'Decoherence',
      'Quantum friction',
      'Wave collapse',
    ],
    correctAnswer: 1,
    explanation: 'Decoherence is the process by which a quantum system loses its quantum properties due to interaction with its environment. This is one of the biggest challenges in quantum computing as it causes errors and limits computation time.',
    source: 'Introduction to Quantum Computing, Chapter 5',
  },
];

type QuizState = 'setup' | 'quiz' | 'results' | 'review';

interface QuizConfig {
  materialId: string;
  difficulty: 'gentle' | 'understanding' | 'expert';
  questionCount: number;
}

interface Answer {
  question: Question;
  userAnswer: string | number;
  isCorrect: boolean;
}

export default function QuizPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quizState, setQuizState] = useState<QuizState>('setup');
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);

  // Check for focus=weak in URL params
  useEffect(() => {
    const focus = searchParams.get('focus');
    if (focus === 'weak') {
      toast.info('Starting quiz focused on weak topics');
    }
  }, [searchParams]);

  const triggerConfetti = useCallback(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleStartQuiz = useCallback((config: QuizConfig) => {
    setQuizConfig(config);
    // In a real app, fetch questions from your AI backend based on config
    const selectedQuestions = mockQuestions.slice(0, config.questionCount);
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setQuizState('quiz');
  }, []);

  const handleAnswer = useCallback((answer: string | number, isCorrect: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers((prev) => [
      ...prev,
      { question: currentQuestion, userAnswer: answer, isCorrect },
    ]);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz complete
      const finalScore = score + (answers[answers.length - 1]?.isCorrect ? 0 : 0);
      const percentage = Math.round(((finalScore + (answers.length > 0 && answers[answers.length - 1]?.isCorrect ? 0 : 0)) / questions.length) * 100);
      
      // Trigger confetti for scores >= 80%
      if (percentage >= 80) {
        triggerConfetti();
      }
      
      setQuizState('results');
      toast.success('Quiz completed!');
    }
  }, [currentQuestionIndex, questions.length, score, answers, triggerConfetti]);

  const handleReviewMissed = useCallback(() => {
    setQuizState('review');
  }, []);

  const handleRetakeQuiz = useCallback(() => {
    setQuizState('setup');
    setQuizConfig(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  const handleBackToResults = useCallback(() => {
    setQuizState('results');
  }, []);

  const missedAnswers = answers.filter((a) => !a.isCorrect);

  // Calculate progress
  const progressPercentage = questions.length > 0 
    ? ((currentQuestionIndex + 1) / questions.length) * 100 
    : 0;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 lg:pb-8">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-4 mb-2">
            {quizState !== 'setup' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (quizState === 'quiz') {
                    // Confirm before leaving quiz
                    if (window.confirm('Are you sure you want to leave? Your progress will be lost.')) {
                      setQuizState('setup');
                    }
                  } else if (quizState === 'review') {
                    setQuizState('results');
                  } else {
                    setQuizState('setup');
                  }
                }}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft size={20} />
              </Button>
            )}
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">
              {quizState === 'setup' && 'Quiz Mode'}
              {quizState === 'quiz' && 'Quiz in Progress'}
              {quizState === 'results' && 'Quiz Results'}
              {quizState === 'review' && 'Review Questions'}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {quizState === 'setup' && 'Test your knowledge with personalized quizzes'}
              {quizState === 'quiz' && 'Take your time and think carefully'}
              {quizState === 'results' && 'See how you performed'}
              {quizState === 'review' && 'Learn from your mistakes'}
            </p>
          </div>
        </div>

        {/* Progress Bar for Quiz State */}
        {quizState === 'quiz' && questions.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-purple-400">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2 bg-[#1F2937]"
            />
          </div>
        )}

        {/* Quiz Content */}
        {quizState === 'setup' && (
          <QuizSetup materials={mockMaterials} onStartQuiz={handleStartQuiz} />
        )}

        {quizState === 'quiz' && questions.length > 0 && (
          <QuizQuestion
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        )}

        {quizState === 'results' && (
          <QuizResults
            score={score}
            totalQuestions={questions.length}
            answers={answers}
            onReviewMissed={handleReviewMissed}
            onRetakeQuiz={handleRetakeQuiz}
            onBackToDashboard={handleBackToDashboard}
          />
        )}

        {quizState === 'review' && (
          <ReviewMissed
            missedAnswers={missedAnswers}
            onBack={handleBackToResults}
          />
        )}
      </div>
    </AppLayout>
  );
}
