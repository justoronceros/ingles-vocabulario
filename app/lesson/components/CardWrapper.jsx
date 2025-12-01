// app/lesson/components/CardWrapper.jsx
"use client";

import { useLesson } from "../context/LessonContext";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";

export default function CardWrapper() {
  const { currentWord } = useLesson();

  return (
    <div className="relative flex flex-col w-[88%] h-[85%]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord.id} // clave única para animación
          initial={{ opacity: 0, x: 100 }} // entra desde la derecha
          animate={{ opacity: 1, x: 0 }} // posición final
          exit={{ opacity: 0, x: -100 }} // sale hacia la izquierda
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <Card
            id={currentWord.id}
            src={currentWord.image}
            text={currentWord.english}
            spanish={currentWord.spanish}
            audio={currentWord.audio}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


