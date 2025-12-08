// app/lesson/components/ContinueButton.jsx
"use client";

import { useLesson } from "../context/LessonContext";

export const ContinueButton = () => {
  const { canContinue, nextCard, setCanContinue, setLocalProgress } =
    useLesson();

  const handleClick = () => {
    if (!canContinue) return;

    nextCard();

    // reiniciar estados para la siguiente tarjeta
    setCanContinue(false);
    setLocalProgress(0);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full h-full flex items-center justify-center
        text-gray-100 text-lg uppercase font-bold tracking-wider transition-all duration-100
        ${
          canContinue
            ? "bg-green-600 active:translate-y-1"
            : "bg-gray-400 opacity-50 pointer-events-none"
        }
      `}
    >
      Continuar
    </button>
  );
};
