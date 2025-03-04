
import React, { useState, useEffect } from "react";
import NumberInput from "@/components/NumberInput";
import FeedbackMessage from "@/components/FeedbackMessage";
import GameCard from "@/components/GameCard";
import Confetti from "@/components/Confetti";
import { useNumberGame } from "@/hooks/useNumberGame";
import { cn } from "@/lib/utils";

const Index = () => {
  const {
    guess,
    setGuess,
    feedback,
    attempts,
    isGameOver,
    resetGame,
    submitGuess,
  } = useNumberGame({ min: 1, max: 100 });

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (feedback === "correct") {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitGuess();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitGuess();
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      <Confetti active={showConfetti} />
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-medium mb-2 text-shadow-sm">Jeu de Devinette</h1>
          <p className="text-muted-foreground">
            Devinez le nombre mystère entre 1 et 100
          </p>
        </div>

        <GameCard title="Devinez le nombre" onReset={resetGame}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <NumberInput
              value={guess}
              onChange={setGuess}
              onKeyDown={handleKeyDown}
              min={1}
              max={100}
              disabled={isGameOver}
              autoFocus={true}
            />

            <FeedbackMessage type={feedback} attempts={attempts} />

            <button
              type="submit"
              disabled={isGameOver || !guess}
              className={cn(
                "w-full py-3 px-4 rounded-xl text-white font-medium",
                "bg-black dark:bg-white dark:text-black",
                "transform transition-all duration-300 ease-out",
                "hover:scale-[1.02] active:scale-[0.98]",
                "disabled:opacity-50 disabled:pointer-events-none",
                feedback === "correct" ? "hidden" : ""
              )}
            >
              Valider
            </button>

            {feedback === "correct" && (
              <button
                type="button"
                onClick={resetGame}
                className={cn(
                  "w-full py-3 px-4 rounded-xl text-white font-medium animate-pop",
                  "bg-green-500 dark:bg-green-600",
                  "transform transition-all duration-300 ease-out",
                  "hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                Nouvelle Partie
              </button>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              {attempts > 0 && !isGameOver
                ? `Tentatives: ${attempts}`
                : ""}
            </p>
          </div>
        </GameCard>
      </div>
    </div>
  );
};

export default Index;
