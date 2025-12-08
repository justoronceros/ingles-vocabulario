//* app/lesson/context/LessonContext.jsx

"use client";
import { createContext, useContext, useState } from "react";

const LessonContext = createContext();

export function LessonProvider({ children }) {
  const wordsList = [
    {
      english: "1",
      spanish: "hola",
      audioSpanish: "/audio/hello-es.mp3",
      audioEnglish: "/audio/hello-en.mp3",
      image: "/images/hello.jpg",
    },
    {
      english: "2",
      spanish: "Mundo",
      audioSpanish: "/audio/world-es.mp3",
      audioEnglish: "/audio/world-en.mp3",
      image: "/images/world.jpg",
    },
    {
      english: "3",
      spanish: "Bye",
      audioSpanish: "/audio/world-es.mp3",
      audioEnglish: "/audio/world-en.mp3",
      image: "/images/world.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = wordsList[currentIndex];

  // Función para avanzar al siguiente índice
  const nextWord = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wordsList.length);
  };

  // Función para retroceder al índice anterior
  const prevWord = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? wordsList.length - 1 : prevIndex - 1
    );
  };

return (
  <LessonContext.Provider
    value={{ currentWord, nextWord, prevWord, wordsList }}
  >
    {children}
  </LessonContext.Provider>
);
}

export const useLesson = () => useContext(LessonContext);
