import { useState, useCallback, useEffect } from 'react';

interface Confetti {
  id: string;
  left: number;
  delay: number;
  duration: number;
}

export function useConfetti() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  const trigger = useCallback(() => {
    const newConfetti: Confetti[] = Array.from({ length: 30 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.2,
      duration: 2 + Math.random() * 1,
    }));

    setConfetti(newConfetti);

    // Clear confetti after animation completes
    const timeout = setTimeout(() => {
      setConfetti([]);
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);

  return { confetti, trigger };
}
