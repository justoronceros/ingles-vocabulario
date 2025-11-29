// app/vocabulary/layout.jsx - Versión completa
"use client";
import { useState } from "react";
import { TopBar } from "./components/TopBar";
import Card from "./components/Card";

export default function VocabularyLayout({ children }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const words = [
    {
      id: 1,
      english: "hello",
      spanish: "hola",
      image: "/1/hello.jpg",
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

  const progress = ((currentCardIndex + 1) / words.length) * 100;

  const nextCard = () => {
    if (currentCardIndex < words.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      // Aquí irá la lógica cuando termine todas las cards
      console.log("¡Completaste todas las palabras!");
    }
  };

  const handleClose = () => {
    // Lógica para cerrar/volver atrás
    console.log("Cerrar lección");
  };

  const currentWord = words[currentCardIndex];

  return (
    <div className="flex flex-col h-dvh gap-0 select-none overflow-hidden bg-gray-50">
      {/* TopBar con progreso dinámico */}
      <div className="h-[8%]">
        <TopBar progress={progress} onClose={handleClose} />
      </div>

      {/* Card actual */}
      <main className="grow flex justify-center items-center">
        <Card
          src={currentWord.image}
          text={currentWord.english}
          spanish={currentWord.spanish}
          audio={currentWord.audio}
        />
      </main>

      {/* Footer con botón continuar - LO HAREMOS EN EL SIGUIENTE PASO */}
      <div className="h-[10%]"></div>
    </div>
  );
}
