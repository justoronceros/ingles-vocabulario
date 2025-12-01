// app/lesson/layout.jsx
"use client";

import { LessonProvider } from "./context/LessonContext";
import { TopBar } from "./components/TopBar";
import { ContinueButton } from "./components/ContinueButton";

export default function LessonLayout({ children }) {
  return (
    <LessonProvider>
      <LessonContent>{children}</LessonContent>
    </LessonProvider>
  );
}

function LessonContent({ children }) {
  return (
    <div className="flex flex-col h-dvh gap-0 select-none overflow-hidden bg-cyan-50">
      <div className="h-[8%]">
        <TopBar />
      </div>

      <main className="grow flex justify-center items-center">{children}</main>

      <div className="h-[10%]">
        <ContinueButton />
      </div>
    </div>
  );
}


