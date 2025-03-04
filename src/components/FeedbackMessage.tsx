
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Check, AlertCircle } from "lucide-react";

type FeedbackType = "higher" | "lower" | "correct" | "invalid" | "initial";

interface FeedbackMessageProps {
  type: FeedbackType;
  attempts?: number;
  className?: string;
}

const FeedbackMessage = ({ type, attempts, className }: FeedbackMessageProps) => {
  const getIcon = () => {
    switch (type) {
      case "higher":
        return <ChevronUp className="h-6 w-6 text-blue-500" />;
      case "lower":
        return <ChevronDown className="h-6 w-6 text-blue-500" />;
      case "correct":
        return <Check className="h-6 w-6 text-green-500" />;
      case "invalid":
        return <AlertCircle className="h-6 w-6 text-amber-500" />;
      default:
        return null;
    }
  };

  const getMessage = () => {
    switch (type) {
      case "higher":
        return "Plus haut !";
      case "lower":
        return "Plus bas !";
      case "correct":
        return `Bravo ! Vous avez trouvé en ${attempts} tentative${attempts !== 1 ? 's' : ''}.`;
      case "invalid":
        return "Veuillez entrer un nombre valide.";
      case "initial":
        return "Devinez un nombre entre 1 et 100";
      default:
        return "";
    }
  };

  const getBackgroundClass = () => {
    switch (type) {
      case "higher":
        return "bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/30";
      case "lower":
        return "bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/30";
      case "correct":
        return "bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900/30";
      case "invalid":
        return "bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/30";
      case "initial":
        return "bg-gray-50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-800/30";
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl py-3 px-4 flex items-center justify-center gap-2",
        "backdrop-blur-sm border animate-slide-up",
        getBackgroundClass(),
        className
      )}
    >
      {getIcon()}
      <span className="font-medium">{getMessage()}</span>
    </div>
  );
};

export default FeedbackMessage;
