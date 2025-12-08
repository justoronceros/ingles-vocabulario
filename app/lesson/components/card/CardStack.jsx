"use client";
import { useState } from "react";
import { useLesson } from "../../context/LessonContext";
import {Card} from "./Card";

export const CardStack = () => {
  const { wordsList, currentIndex, nextWord, goNext } = useLesson();
  const currentWord = wordsList[currentIndex];

  const [isAnimating, setIsAnimating] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setShowNext(true);
    setIsAnimating(true);

    // Duración de animación: coincide con CSS
    setTimeout(() => {
      goNext(); // Cambia los datos reales
      setShowNext(false);
      setIsAnimating(false);
    }, 400); // debes igualarlo con tu CSS
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Tarjeta actual */}
      <div className={`${isAnimating ? "animate-slide-left" : ""}`}>
        <Card word={currentWord} />
      </div>

      {/* Tarjeta nueva (solo visible durante animación) */}
      {showNext && (
        <div className="absolute inset-0 animate-slide-in-right">
          <Card word={nextWord} />
        </div>
      )}

      {/* Botón de prueba temporal */}
      <button
        onClick={handleNext}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 bg-blue-500 text-white"
      >
        Next
      </button>
    </div>
  );
};
