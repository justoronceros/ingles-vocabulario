
"use client";
import { useLesson } from "../../context/LessonContext";

export const Spanish = () => {
  const {currentWord} = useLesson();

  return (
    <div className="text-xl italic text-gray-700">
      {currentWord.spanish}
    </div>
  );
}
