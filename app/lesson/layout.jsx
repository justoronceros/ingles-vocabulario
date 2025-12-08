//* app/lesson/layout.jsx

"use client";
import { useState, useEffect } from "react";
import { LessonProvider } from "./context/LessonContext";
import { Loader } from "./components/Loader";
import { TopBar } from "./components/topbar/TopBar";

export default function LessonLayout({ children }) {
  return (
    <LessonProvider>
      <LessonContent>{children}</LessonContent>
    </LessonProvider>
  );
}

function LessonContent({ children }) {
  const [isLessonLoaded, setIsLessonLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLessonLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLessonLoaded) {
    return (
      <div className="flex h-dvh justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="fade-in flex flex-col h-dvh gap-0 select-none overflow-hidden bg-gray-100">
      <div className="h-[8%]">
        <TopBar />
      </div>

      <main className="grow h-full w-full">{children}</main>
    </div>
  );
}
