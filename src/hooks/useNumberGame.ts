
import { useState, useEffect, useCallback } from "react";

interface UseNumberGameProps {
  min?: number;
  max?: number;
}

interface UseNumberGameReturn {
  guess: string;
  setGuess: (value: string) => void;
  feedback: "higher" | "lower" | "correct" | "invalid" | "initial";
  attempts: number;
  isGameOver: boolean;
  resetGame: () => void;
  submitGuess: () => void;
}

export const useNumberGame = ({
  min = 1,
  max = 100,
}: UseNumberGameProps = {}): UseNumberGameReturn => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [feedback, setFeedback] = useState<"higher" | "lower" | "correct" | "invalid" | "initial">("initial");
  const [attempts, setAttempts] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Generate a random number between min and max
  const generateRandomNumber = useCallback(() => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, [min, max]);

  // Initialize the game
  useEffect(() => {
    setTargetNumber(generateRandomNumber());
  }, [generateRandomNumber]);

  // Reset the game
  const resetGame = useCallback(() => {
    setTargetNumber(generateRandomNumber());
    setGuess("");
    setFeedback("initial");
    setAttempts(0);
    setIsGameOver(false);
  }, [generateRandomNumber]);

  // Submit a guess
  const submitGuess = useCallback(() => {
    if (!guess) {
      setFeedback("invalid");
      return;
    }

    const numericGuess = parseInt(guess);
    
    if (isNaN(numericGuess) || numericGuess < min || numericGuess > max) {
      setFeedback("invalid");
      return;
    }

    setAttempts((prev) => prev + 1);

    if (numericGuess === targetNumber) {
      setFeedback("correct");
      setIsGameOver(true);
    } else if (numericGuess < targetNumber) {
      setFeedback("higher");
    } else {
      setFeedback("lower");
    }
  }, [guess, targetNumber, min, max]);

  return {
    guess,
    setGuess,
    feedback,
    attempts,
    isGameOver,
    resetGame,
    submitGuess,
  };
};
