
import React from "react";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

interface GameCardProps {
  children: React.ReactNode;
  title: string;
  onReset: () => void;
  className?: string;
}

const GameCard = ({ children, title, onReset, className }: GameCardProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto rounded-2xl overflow-hidden",
        "bg-white/80 dark:bg-black/30 backdrop-blur-xl",
        "border border-white/20 dark:border-white/10 shadow-xl",
        "transition-all duration-300 ease-out",
        className
      )}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-balance text-shadow-sm">{title}</h2>
          <button
            onClick={onReset}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
            aria-label="Démarrer une nouvelle partie"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GameCard;
