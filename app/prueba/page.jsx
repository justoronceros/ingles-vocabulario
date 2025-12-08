// app/lesson/page.jsx
"use client";
import { useLesson } from "./context/LessonContext";
import Card from "./components/Card";
import CardWrapper from "./components/CardWrapper";

export default function LessonPage() {
  const { currentWord } = useLesson();

  return (
    <div className="flex justify-center items-center w-full h-full">
      {/* CardWrapper maneja animaciones de entrada/salida */}
      <CardWrapper />
    </div>
    // Al pasar las props al Card
    // <Card
    //   id={currentWord.id} // ← Ahora sí pasamos el id
    //   src={currentWord.image}
    //   text={currentWord.english}
    //   spanish={currentWord.spanish}
    //   audio={currentWord.audio}
    // />
  );
}
