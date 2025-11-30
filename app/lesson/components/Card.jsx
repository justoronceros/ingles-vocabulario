// app/lesson/components/Card.jsx
import { useState, useRef, useEffect } from "react";

export default function Card({ id, src, text, spanish, audio }) {
  const [clickedCard, setClickedCard] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const audioRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // Efecto para activar la animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log("✅ Animación de entrada activada");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Efecto para activar jello después de 2 segundos
  useEffect(() => {
    if (isLoaded && !clickedCard) {
      console.log("⏱️ Programando jello en 2 segundos...");
      const timer = setTimeout(() => {
        setShowAnimation(true);
        console.log("🎯 Jello repetitivo ACTIVADO");
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowAnimation(false);
      console.log("🛑 Jello repetitivo DETENIDO");
    }
  }, [isLoaded, clickedCard]);

  // Cargar el audio
  useEffect(() => {
    if (audio) {
      audioRef.current = new Audio(audio);
      audioRef.current.preload = "auto";
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [audio, id]);

  function playAudio() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }
  }

  function handleCardClic() {
    console.log("👆 Card clickeada");
    setClickedCard(true);
    setAnimationEnd(false);
    playAudio();
  }

  return (
    <div
      className={`
      flex flex-col w-[88%] h-[90%]
      transition-all duration-400 
      ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"}
    `}
    >
      {/* ::::::::::::::: Card Container :::::::::::: */}
      <div
        onClick={handleCardClic}
        onAnimationEnd={() => setAnimationEnd(true)}
        className={`
          flex flex-col grow rounded-2xl border-2 border-b-3 overflow-hidden cursor-pointer transition duration-200 bg-cyan-200 border-cyan-400 w-full
          ${clickedCard && !animationEnd ? "jello-vertical" : ""}
        `}
      >
        {/* ------------ Spanish Text Container ------------ */}
        {/* Spanish Text */}
        <div className="text-xl w-full italic h-[14%] flex justify-center items-end font-medium">
          <p className="text-gray-600 min-w-[85%] text-center rounded-full bg-black/5 px-4 py-1">
            {spanish}
          </p>
        </div>

        {/* -------------- Image Container ------------ */}
        {/* Image con animación jello */}
        <div className="grow p-4">
          <img
            src={src}
            alt={text}
            className={`
              w-full h-full object-contain
              ${
                clickedCard
                  ? ""
                  : "brightness-0 grayscale contrast-75 opacity-50"
              }
              ${showAnimation && !clickedCard ? "animate-jello-pausado" : ""}
            `}
          />
        </div>

        {/* -------------- English Text ------------ */}
        <div className="flex flex-col h-[19%] justify-center items-center text-3xl bg-white/90 rounded-lg p-2">
          <div className="w-full h-[70%] flex justify-center items-center font-semibold relative">
            <div
              className={`
              rounded-full min-w-[37%] h-[45%] absolute
              ${clickedCard ? "hidden" : "bg-black/50"}
            `}
            ></div>
            <p className={clickedCard ? "text-cyan-600 text-center" : "hidden"}>
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
