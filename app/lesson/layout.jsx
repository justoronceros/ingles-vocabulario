// app/lesson/layout.jsx
"use client";
import { LessonProvider, useLesson } from "./context/LessonContext";
import { TopBar } from "./components/TopBar";
// import { ContinueButton } from "./components/ContinueButton";

export default function LessonLayout({ children }) {
  return (
    <LessonProvider>
      <LessonContent>{children}</LessonContent>
    </LessonProvider>
  );
}

function LessonContent({ children }) {
  // const { progress, isLastCard, nextCard, handleClose } = useLesson();

  return (
    <div className="flex flex-col h-dvh gap-0 select-none overflow-hidden bg-cyan-50 bg-[url(/1/descarga.web)] bg-center bg-cover">
      <div className="h-[8%]">
        {/* <TopBar progress={progress} onClose={handleClose} /> */}
        <TopBar />
      </div>

      <main className="grow flex justify-center items-center">{children}</main>

      <div className="h-[10%]">
        {/* <ContinueButton onClick={nextCard} isLastCard={isLastCard} /> */}
        {/* <ContinueButton /> */}
      </div>
    </div>
  );
}
