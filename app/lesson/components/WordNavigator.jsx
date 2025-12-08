"use client";
import { useLesson } from "../context/LessonContext";
import { useState } from "react";

function WordNavigator() {
  const { wordsList } = useLesson();
  const [currentIndex, setCurrentIndex] = useState(0); // Controla la tarjeta visible

  const handleNext = () => {
    // Avanzar al siguiente índice
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wordsList.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {wordsList.map((word, index) => (
        <div
          key={index}
          className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ${
            index === currentIndex
              ? "left-1/2 -translate-x-1/2" // Tarjeta actual en el centro
              : "left-full" // Tarjeta siguiente a la derecha
          } w-80 border rounded-2xl p-6 text-center bg-white shadow-lg`}
        >
          <h2>{word.english}</h2>
          <p>{word.spanish}</p>
        </div>
      ))}
      <button
        onClick={handleNext}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
      >
        Siguiente
      </button>
    </div>
  );
}

export default WordNavigator;
