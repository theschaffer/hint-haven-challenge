
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  max?: number;
  min?: number;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
}

const NumberInput = ({
  value,
  onChange,
  max = 100,
  min = 1,
  className,
  inputClassName,
  autoFocus,
  ...props
}: NumberInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Allow empty input or numeric values
    if (newValue === "" || /^[0-9]+$/.test(newValue)) {
      // Check min/max constraints
      if (newValue === "" || 
         (parseInt(newValue) >= min && parseInt(newValue) <= max)) {
        onChange(newValue);
      }
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        className={cn(
          "w-full text-center text-4xl font-light py-6 px-4 rounded-xl",
          "bg-white/80 dark:bg-black/20 backdrop-blur-md",
          "border border-black/5 dark:border-white/10",
          "outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/20",
          "transition-all duration-200 ease-out",
          "placeholder:text-gray-400 dark:placeholder:text-gray-600",
          inputClassName
        )}
        placeholder="Devinez un nombre"
        {...props}
      />
    </div>
  );
};

export default NumberInput;
