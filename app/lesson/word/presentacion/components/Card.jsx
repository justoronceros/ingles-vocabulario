
import { useState, useRef, useEffect } from "react";

export default function Card({ src, text }) {
  const AUDIO = "/1/hello.mp3";
  const [clickedCard, setClickedCard] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const audioRef = useRef(null);
  
    // Cargar el audio una sola vez al montar el componente
  useEffect(() => {
    audioRef.current = new Audio(AUDIO);
    audioRef.current.preload = "auto"; // Precarga el audio
    // Cleanup al desmontar el componente
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [AUDIO]);


  function playAudio() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia si ya estaba reproduciendo
      audioRef.current.play().catch((error) => {
        console.log("Error reproduciendo audio:", error);
      });
    }
  }

  function handleCardClic() {
    setClickedCard(true);
    setAnimationEnd(false); // reinicia animación cada clic
    playAudio();
  }

  function handleAnimationEnd() {
    setAnimationEnd(true); // marca que la animación terminó
  }

  return (
    <div className="flex flex-col w-[85%] h-[80%]">
      <div
        onClick={handleCardClic}
        onAnimationEnd={handleAnimationEnd}
        className={`
          flex flex-col grow rounded-2xl border-2 border-b-4 overflow-hidden cursor-pointer
          ${clickedCard ? "border-cyan-400" : "bg-white border-gray-300"}
          ${clickedCard && !animationEnd ? "jello-vertical" : ""}
        `}
      >
        <div className="h-[75%] bg-cyan-100 p-4">
          <img src={src} alt={text} className="w-full h-full object-contain" />
        </div>

        <div
          id="info"
          className="flex flex-col justify-center items-center text-3xl grow transition-transform duration-100 bg-white"
        >
          {/* TEXTO EN INGLÉS */}
          <div className="w-full h-[60%] flex justify-center items-end font-semibold">
            <p
              className={`
              transition duration-500
              ${
                clickedCard
                  ? "opacity-100 text-cyan-600 tracking-in-expand"
                  : "text-gray-500"
              }
            `}
            >
              hello
            </p>
          </div>

          {/* ESPAÑOL */}
          <div className="text-xl italic w-full grow flex justify-center items-end ">
            <p
              className={`
              transition-opacity duration-200 text-gray-600
              ${clickedCard ? "" : ""}
            `}
            >
              hola
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
