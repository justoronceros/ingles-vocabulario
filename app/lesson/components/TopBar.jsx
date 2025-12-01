// app/lesson/components/TopBar.jsx
"use client";
import { useLesson } from "../context/LessonContext";

export const TopBar = () => {
  const { progress, localProgress, setCanContinue } = useLesson();

  // solo se añade progreso de la tarjeta actual si localProgress está al 100%
  const totalProgress = progress + (localProgress === 100 ? 100 / 4 : 0); // ajusta '4' según totalCards

  const handleTransitionEnd = () => {
    // activar botón solo después de que la barra terminó de moverse
    if (localProgress === 100) {
      setCanContinue(true);
    }
  };

  return (
    <div className="h-full flex gap-2 justify-between mx-2">
      <div className="flex justify-end h-full">
        <button className="text-gray-400 text-3xl font-bold">✕</button>
      </div>

      <div className="flex items-center w-full px-2">
        <div className="w-full h-[30%] bg-black/5 rounded-2xl overflow-hidden">
          <div
            className="bg-yellow-400 h-full rounded-r-2xl transition-all duration-500"
            style={{ width: `${totalProgress}%` }}
            onTransitionEnd={handleTransitionEnd}
          ></div>
        </div>
      </div>
    </div>
  );
};

