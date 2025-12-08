//* context/LessonContext.jsx

"use client";
import { createContext, useContext, useState } from "react";

const LessonContext = createContext();

export function LessonProvider({ children }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Se activa cuando una tarjeta fue revelada por completo
  const [cardCompleted, setCardCompleted] = useState(false);

  // Se activa cuando ya terminó de moverse la barra
  const [canContinue, setCanContinue] = useState(false);

  const [localProgress, setLocalProgress] = useState(0);

  const words = [
    {
      id: 1,
      english: "hello",
      spanish: "hola",
      image: "/1/hello.png",
      audio: "/1/hello.mp3",
    },
    {
      id: 2,
      english: "bye",
      spanish: "adiós",
      image: "/1/bye.png",
      audio: "/1/bye.mp3",
    },
    {
      id: 3,
      english: "thanks",
      spanish: "gracias",
      image: "/1/thanks.png",
      audio: "/1/thanks.mp3",
    },
    {
      id: 4,
      english: "please",
      spanish: "por favor",
      image: "/1/please.png",
      audio: "/1/please.mp3",
    },
  ];

  const totalCards = words.length;

  const nextCard = () => {
    setCurrentCardIndex((prev) => {
      if (prev < totalCards - 1) {
        return prev + 1;
      }
      return prev;
    });

    // cuando cambia de tarjeta → bloquear continuar nuevamente
    setCardCompleted(false);
    setCanContinue(false);
  };

  const restartLesson = () => {
    setCurrentCardIndex(0);
    // setCardCompleted(false);
    setCanContinue(false);
  };

  const value = {
    words,
    currentWord: words[currentCardIndex],

    currentCardIndex,
    totalCards,

    // progreso total de TODAS las tarjetas
    progress: (currentCardIndex / totalCards) * 100,

    localProgress, // progreso real de la tarjeta
    setLocalProgress,

    canContinue,
    setCanContinue,

    nextCard,
    restartLesson,

    isLastCard: currentCardIndex === totalCards - 1,
  };

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  );
}

export const useLesson = () => useContext(LessonContext);
