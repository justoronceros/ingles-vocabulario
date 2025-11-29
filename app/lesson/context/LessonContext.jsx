// context/LessonContext.jsx
"use client";
import { createContext, useContext, useState } from "react";

const LessonContext = createContext();

export function LessonProvider({ children }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

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
      english: "goodbye",
      spanish: "adiós",
      image: "/2/goodbye.jpg",
      audio: "/2/goodbye.mp3",
    },
    {
      id: 3,
      english: "thank you",
      spanish: "gracias",
      image: "/3/thanks.jpg",
      audio: "/3/thanks.mp3",
    },
  ];

  const value = {
    currentCardIndex,
    setCurrentCardIndex,
    words,
    currentWord: words[currentCardIndex],
    progress: ((currentCardIndex + 1) / words.length) * 100,
    isLastCard: currentCardIndex === words.length - 1,
  };

  return (
    <LessonContext.Provider value={value}>{children}</LessonContext.Provider>
  );
}

export const useLesson = () => useContext(LessonContext);
