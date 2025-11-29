// app/lesson/page.jsx
"use client";
import { useLesson } from "./context/LessonContext";
import Card from "./components/Card";

export default function LessonPage() {
  const { currentWord } = useLesson();

  return (
    // Al pasar las props al Card
    <Card
      id={currentWord.id} // ← Ahora sí pasamos el id
      src={currentWord.image}
      text={currentWord.english}
      spanish={currentWord.spanish}
      audio={currentWord.audio}
    />
  );
}
